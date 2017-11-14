import React from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableHighlight 
} from 'react-native'
import { 
  Card,
  Header,
  FormLabel,
  FormInput,
  Button
} from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { add_todo } from '../redux/todos'

class PublishAdScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: '',
      amount: '',
      place: '',
      timer: '',
    }
  }

  static navigationOptions = ({ navigation }) => ({
    drawerLabel: 'Publicar Tarea', 
    header: <Header
      leftComponent={
        <TouchableHighlight onPress={() => navigation.goBack(null)} underlayColor='rgba(0,0,0,0)'>
          <View>
            <Ionicons name="ios-arrow-back" size={30} color="white" />
          </View>
        </TouchableHighlight>
      }
      centerComponent={{ text: 'Publicar Tarea', style: styles.header }} 
      backgroundColor={'#2e4964'}
    />
  })

  render() {
    return (
      <View style={styles.container}>
        <ScrollView 
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <Card
            title='Nueva Tarea'
            titleStyle={styles.title}>
          
              <FormLabel labelStyle={ styles.subtitle }>Título:</FormLabel>
              <FormInput 
                onChangeText={(title) => this.setState({ title })}
                value={ this.state.title }/>
              
              <FormLabel labelStyle={ styles.subtitle }>Descripción de la tarea:</FormLabel>
              <FormInput
                onChangeText={(description) => this.setState({ description })}
                multiline={true}
                maxHeight={10}
                value={ this.state.description }/>
              
              <FormLabel labelStyle={ styles.subtitle }> Cantidad a pagar en quetzales: </FormLabel>
              <FormInput
                onChangeText={(amount) => this.setState({ amount })}
                keyboardType='numeric'
                value={ this.state.amount }/>
              
              <FormLabel labelStyle={ styles.subtitle }> Lugar donde se realiza la tarea: </FormLabel>
              <FormInput
                onChangeText={(place) => this.setState({place})}
                value={ this.state.place }/>
              
              <FormLabel labelStyle={ styles.subtitle }> Tiempo en que vence la tarea en minutos: </FormLabel>
              <FormInput
                onChangeText={(timer) => this.setState({timer})}
                keyboardType='numeric'
                value={ this.state.timer }/>
              
              <Button
                onPress={() => {
                  this.props.onPlusClick(this.props.nID, this.state)
                  this.props.navigation.goBack(null)
                }}
                title='Publicar'/>

          </Card>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    nID: state.getIn(['todosReducer', 'todos']).size
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPlusClick: (id, todo) => {
      dispatch(add_todo(id, todo))
    }
  }
}

const _PublishAdScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(PublishAdScreen)

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

export default _PublishAdScreen