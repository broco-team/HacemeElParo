import React from 'react';
import { connect } from 'react-redux'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Alert
} from 'react-native'
import { 
  Divider,
  Button
} from 'react-native-elements'
import { get_user } from '../redux/user'
import { Facebook } from 'expo'


class LoginScreen extends React.Component {
  constructor(props){
    super(props)
  }

  _handleFacebookLogin = async (onLogin, navigation) => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '164023457482938',
        { permissions: ['public_profile'], behavior: 'web' }
      )

      switch(type) {
        case 'success': {
          onLogin(token, navigation)
          break
        }
        case 'cancel': {
          Alert.alert(
            'Cancelado!',
            'Inicio Sesión Cancelado!',
          )
          break
        }
      }
    } catch (e) {
      console.log(e)
      throw e
      Alert.alert(
        'Oops!',
        'Inicio de sesión Fallo!',
      ) 
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}>
          <Image source={ require('../assets/icons/app-icon.png') } />
          <Divider/>
          <Divider/>
          <Button 
            title='Iniciar Sesión'
            onPress={ () => this._handleFacebookLogin(this.props.onLogin, this.props.navigation) } />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.getIn(['userReducer', 'isLoggedIn'])
})

const mapDispatchToProps = dispatch => ({
  onLogin: (token, navigation) => {
    dispatch(get_user(token, navigation))
  }
})

const _LoginScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: '#2e4964',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent : 'center',
    alignItems: 'center',
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

export default _LoginScreen
