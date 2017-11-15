import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import SimpleAd from '../components/SimpleAd'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native'
import { 
  Header,
  Card,
  Button
} from 'react-native-elements'
import Money from '../components/Money'


class TodoScreen extends React.Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    const { setParams } = this.props.navigation
    setParams({ user: this.props.user })
  }

  static navigationOptions = ({ navigation }) => {

    const { state } = navigation

    console.log(state)

    return({
      drawerLabel: 'Tareas', 
      header: <Header
        leftComponent={
          <TouchableHighlight onPress={() => navigation.navigate('DrawerToggle')} underlayColor='rgba(0,0,0,0)'>
            <View>
              <Ionicons name="md-list" size={30} color="white" />
            </View>
          </TouchableHighlight>
        }
        centerComponent={{ text: 'Tareas', style: styles.header }} 
        backgroundColor={'#2e4964'}
        rightComponent={ 
          <View> 
            {
              (typeof state.params !== 'undefined'  &&  state.params.hasOwnProperty('user')) ? 
              <Money quantity={ state.params.user.get('money') }/>
              :
              <Money quantity={ 0 }/> 
            }
            </View>
        } />
      })
  } 

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
            {
              this.props.todos.size > 0 ?
              this.props.todos.map((element, index) => (
                  <SimpleAd
                    title={ element.getIn(['todo', 'title']) }
                    description={ element.getIn(['todo', 'description']) }
                    place={ element.getIn(['todo', 'place']) }
                    amount={ element.getIn(['todo', 'amount']) }
                    timer={ element.getIn(['todo', 'timer']) }
                    key={ element.get('id') }
                  />
              ))
              : <Card title={ 'No se cuenta con tareas disponibles.' } titleStyle={ styles.title } >
                  <Text> Publica una tarea :) </Text>
                </Card>
            }
        </ScrollView>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('PublishAdNavigator')} underlayColor='rgba(0,0,0,0)'>
          <View style={styles.iconView}>
            <Ionicons name="ios-add-circle" size={65} color="#2e4964" />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.getIn(['todosReducer', 'todos']),
    user: state.getIn(['userReducer', 'user'])
  }
}

const _TodoScreen = connect(
  mapStateToProps,
  null
)(TodoScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 70,
  },
  iconView: {
    alignSelf: 'flex-end',
    margin: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 15,
  },
  centertext: {
    fontSize: 15,
    textAlign: 'center',
  },
  divider: { 
    height: 10,
    backgroundColor: 'white',
  },
  btnPlus: { 
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2e4964',
  },
  btnPosition: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  }
});

export default _TodoScreen