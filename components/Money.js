import React from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import {
  Icon
} from 'react-native-elements'

const Money = ({ quantity }) => (
  <View style={styles.money }>
    <Icon 
      name='coin'
      type='material-community'
      color='#fff' />
   <Text style={{color: 'white'}}> {quantity} </Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#eef0f3',
  },
  money: {
      flexDirection: 'row',
      margin:10,
      marginTop: 30,
  }, 
})

export default Money