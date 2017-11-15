import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { 
  Card, 
  Button, 
  Divider, 
  FormLabel, 
  FormInput, 
  Header 
} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { add_money } from '../redux/user'
import Money from '../components/Money'


class PaymentScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cardNumber:'',
      day:'',
      month:'',
      cvc:'',
      postal:'',
    }
  }

  componentWillMount(){
    const { setParams } = this.props.navigation
    setParams({ user: this.props.user })
  }
  
  static navigationOptions = ({ navigation }) => {

    const { state } = navigation

    console.log(state)

    return ({
      drawerLabel: 'Informacion de pago',
      header: <Header 
        leftComponent={
          <TouchableHighlight onPress={()=>navigation.goBack(null)} underlayColor='rgba(0,0,0,0)'>
            <View>
              <Ionicons name="ios-arrow-back" size={30} color="white" />
            </View>
          </TouchableHighlight>
        }
        centerComponent={{text:'Informacion de pago', style: styles.header}}
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
        }/>
    }) 
  }
  
  render(){
    return(
        <View style={styles.container} >
          <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.contentContainer}>
            <Card
              title="Pago"
              titleStyle={styles.title}>
              
              <FormLabel labelStyle={ styles.subtitle } >Numero de tarjeta:</FormLabel>
              <FormInput 
                onChangeText={(cardNumber)=>this.setState({ cardNumber })}
                keyboardType='numeric'/>
              
              <FormLabel labelStyle={ styles.subtitle } >Dia de expiracion:</FormLabel>
              <FormInput 
                onChangeText={(day)=>this.setState({day })}
                keyboardType='numeric'/>

              <FormLabel  labelStyle={ styles.subtitle } >Mes de expiracion:</FormLabel>
              <FormInput
                onChangeText={(month)=>this.setState({ month })}
                keyboardType='numeric'/>

              <FormLabel labelStyle={ styles.subtitle } >CVC:</FormLabel>
              <FormInput 
                onChangeText={(cvc)=>this.setState({cvc })}
                keyboardType='numeric'/>

              <FormLabel labelStyle={ styles.subtitle } >Codigo Postal:</FormLabel>
              <FormInput 
                onChangeText={(postal)=>this.setState({postal })}
                keyboardType='numeric'/>
              
              <Divider />
              <Button
              backgroundColor="limegreen"
              title="Realizar Pago"
              icon={{ name: 'payment' }}
              onPress={()=>{
                this.props.onPlusClick(this.props.navigation.state.params.amount)
                this.props.navigation.goBack(null)
              }}
              />
            </Card>
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

const mapDispatchToProps = dispatch => {
  return {
    onPlusClick: (amount) => {
      dispatch(add_money(amount))
    }
  }
}

const _PaymentScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  contentContainer: {
    paddingTop: 70,
  }
  
})

export default _PaymentScreen;
