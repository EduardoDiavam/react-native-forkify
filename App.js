import React from 'react'
import {NavigationContainer, } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import RecipesList from './src/screens/RecipesList'
import FavoritesList from './src/screens/FavoritesList'

const Stack = createStackNavigator()

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="RecipesList"
          component={RecipesList}
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
        <Stack.Screen name="FavoritesList" component={FavoritesList} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
