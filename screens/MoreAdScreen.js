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
  SearchBar,
  Header
} from 'react-native-elements'


class MoreAdScreen extends React.Component {
  constructor(props){
    super(props)
  }

  static navigationOptions = ({ navigation, name }) => ({
    drawerLabel: name, 
    header: <Header
      leftComponent={
        <TouchableHighlight onPress={() => navigation.navigate('DrawerToggle')} underlayColor='rgba(0,0,0,0)'>
          <View>
            <Ionicons name="md-list" size={30} color="white" />
          </View>
        </TouchableHighlight>
      }
      centerComponent={{ text: name, style: styles.header }} 
      backgroundColor={'#2e4964'} />
  })

  render() {
    return (
      <View style={styles.container}>
        <SimpleAd
          title={ this.props.title }
          description={ this.props.description }
          place={ this.props.place }
          amount={ this.props.amount }
          timer={ this.props.timer } />
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <List>
            {
              this.props.littleHelperList ?
              this.props.littleHelperList.map((element, index) => (
                  <LittleHelper
                    id={ element.get('id') }
                    key={ element.get('id') }
                  />
              ))
              : <Card title={ 'No se cuenta con Helpers disponibles.' } titleStyle={ styles.title } />   
            }
          </List>
        </ScrollView>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('PublishAdNavigator')} underlayColor='rgba(0,0,0,0)'>
          <View style={styles.iconView}>
            <Ionicons name="ios-add-circle" size={30} color="rgb(0,173,239)" />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
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
  }
});

export default MoreAdScreen