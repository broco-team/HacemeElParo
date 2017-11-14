import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Alert, Image, Text } from 'react-native'
import { Button, Divider } from 'react-native-elements'
import { AppLoading, Asset, Font, Constants } from 'expo'
import { Ionicons } from '@expo/vector-icons'

import LoginNavigator from './navigation/LoginNavigator'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import dataSaga from './sagas/sagas'
import reducer from './redux/index'
import devToolsEnhancer from 'remote-redux-devtools'

const sagaMiddleware = createSagaMiddleware()

const configureStore = () => {
  const store = createStore(reducer, compose(applyMiddleware(sagaMiddleware), devToolsEnhancer()))
  sagaMiddleware.run(dataSaga)
  return store
}


export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoadingComplete: false,
    }
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading} />
      )
    } else {
      return (
        <Provider store={ configureStore() } >
          <LoginNavigator />
        </Provider>
      )
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/icons/app-icon.png'),
      ]),
      Font.loadAsync([
        Ionicons.font,
        { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },
      ]),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#2e4964',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  divider: { 
    height: 10,
    backgroundColor: 'white',
  }
});
