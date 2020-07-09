import React from 'react'
import {NavigationContainer, } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Home from './src/components/Home'
import Favorites from './src/components/Favorites'

const Stack = createStackNavigator()

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Forkify',
            headerStyle: {
              backgroundColor: '#960000',
            },
            headerTitleStyle:{
              alignSelf: 'center'
            },
            headerTintColor: 
              '#fff',
          }} />
        <Stack.Screen name="Favorites" component={Favorites} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
