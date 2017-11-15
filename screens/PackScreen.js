import React from 'react';
import { connect } from 'react-redux'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableHighlight 
} from 'react-native'
import { Header } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import Pack from '../components/Pack'
import Money from '../components/Money'


class PackScreen extends React.Component {
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

    return ({
      drawerLabel: 'Packs', 
      header: <Header
        leftComponent={
          <TouchableHighlight onPress={() => navigation.navigate('DrawerToggle')} underlayColor='rgba(0,0,0,0)'>
            <View>
              <Ionicons name="md-list" size={30} color="white" />
            </View>
          </TouchableHighlight>
        }
        centerComponent={{ text: 'Packs', style: styles.header }} 
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
          <Pack
            title={'Basic Pack'}
            description={'50 coins just for $5'}
            f={ this.props.navigation }
            direction={ 'PaymentScreenNavigator' }
            amount={ 50 } />
          <Pack
            title={'Pro Pack'}
            description={'100 coins just for $50'}
            f={ this.props.navigation }
            direction={ 'PaymentScreenNavigator' }
            amount={ 100 } />
          <Pack
            title={'Epic Pack'}
            description={'1000 coins just for $500'}
            f={ this.props.navigation }
            direction={ 'PaymentScreenNavigator' }
            amount={ 1000 } /> 
        </ScrollView>
			</View>
		);
	}
}

const mapStateToProps = state => {
  return {
    user: state.getIn(['userReducer', 'user'])
  }
}

const _PackScreen = connect(
  mapStateToProps,
  null
)(PackScreen)

export default _PackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    marginTop: 70,
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
})

