import React from 'react';
import { StackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen'
import MainTabNavigator from './MainTabNavigator'

export default StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
      navigationOptions: { header: null } 
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: { header: null } 
    },
  },
)