import React from 'react';
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


class PackScreen extends React.Component {
	constructor(props){
		super(props)
	}

	static navigationOptions = ({ navigation }) => ({
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
      backgroundColor={'#2e4964'} />
  })

	render() {
		return (
			<View style={styles.container}>
        <ScrollView 
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <Pack
            title={'Basic Pack'}
            description={'50 coins just for $5'} />
          <Pack
            title={'Pro Pack'}
            description={'100 coins just for $50'} />
          <Pack
            title={'Epic Pack'}
            description={'1000 coins just for $500'} />
        </ScrollView>
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

export default PackScreen;
