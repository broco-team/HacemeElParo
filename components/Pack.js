import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { PricingCard } from 'react-native-elements'

const Pack = ({ title, description, price }) => (
	<View>
		<PricingCard
      title={ title }
      price={ price }
      info={ ['Descripción: ', description] }
      button={{ title: 'Comprar', icon: 'add-shopping-cart' }} />
	</View>
)

const styles = StyleSheet.create({
  centertext: {
    fontSize: 15,
    textAlign: 'center',
  },
  divider: { 
    height: 10,
    backgroundColor: 'white',
  }
})

export default Pack

