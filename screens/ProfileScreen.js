import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import { 
  Button,
  Header,
  Icon,
  Card,
  Avatar,
  Badge,
  List,
  ListItem 
} from 'react-native-elements';
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import Money from '../components/Money'

class ProfileScreen extends React.Component {
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
      drawerLabel: 'Perfil', 
      header: <Header
        leftComponent={
          <TouchableHighlight onPress={() => navigation.navigate('DrawerToggle')} underlayColor='rgba(0,0,0,0)'>
            <View>
              <Ionicons name="md-list" size={30} color="white" />
            </View>
          </TouchableHighlight>
        }
        centerComponent={{ text: 'Perfil', style: styles.header }} 
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
      <View style={ styles.container }>
      	<Header
      	  outerContainerStyles={{flex:1}}
          backgroundColor='#2d3e50'
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Perfil', style: { color: '#fff' } }} 
          rightComponent={ <Money quantity='0'  /> }
        />
        <Picture 
          src={ this.props.user.get('picture') }
          name={ this.props.user.get('name') }
          />
        <Information
          title="Jobs Done"
          iconName="done"
          iconType="materialIcons"
          iconColor='#cad1d8'
          calification="18" />
        <Information 
          title="Five Stars"
          iconName="star"
          iconType="feather"
          iconColor='#cad1d8'
          calification="8" />
        <Information 
          title="Complains"
          iconName="mood-bad"
          iconType="materialIcons"
          iconColor='#cad1d8'
          calification="0" />
        <View style={styles.square}></View>
      </View>
    );
  }
};

const mapStateToProps = state => {
  return {
    user: state.getIn(['userReducer', 'user'])
  }
}

const _ProfileScreen = connect(
  mapStateToProps,
  null
)(ProfileScreen)


const Picture = ({ src, name }) => (
  <View style={styles.pictureContainer}>
    <Avatar
		large
		rounded
		source={{uri: src}}/>
	 <Text h2 style={{color:'#9e9e9e'}}> { name } </Text>
  </View>
)


const Information = ({ iconName, iconType, iconColor, title, calification }) => (
	<View style={{ flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center', }}>
		<View style={ styles.information }>
		<Icon
			  name={ iconName }
			  type={ iconType }
			  color={ iconColor }
			/>
		<Text>{ title }</Text>
		<Text h1 style={ styles.number }>
      { calification }
    </Text>
		</View>
	</View>
)



export default _ProfileScreen


const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#eef0f3',
  },
  pictureContainer:{
  		flex:1,
  		marginTop:60,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
  },
  money: {
	    flexDirection: 'row',
	    margin:10,
  }, 
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  information:{
	  	flexDirection: 'row',
	  	justifyContent: 'space-between',
        alignItems: 'center',
	  	width: 320,
	  	height:40,
	  	backgroundColor:'#fff',
	  	borderRadius: 4,
	  	margin:0.5,
  },
  number:{
  		width: 40,
	  	height:38,
	  	backgroundColor:"#fff",
	  	color:"black",
	  	fontWeight: 'bold',
	  	fontSize: 20,
	  	marginTop: 10
  },
  square:{
  		width: 200,
	  	height:38,
	  	backgroundColor:"#eef0f3",
  }
  });

