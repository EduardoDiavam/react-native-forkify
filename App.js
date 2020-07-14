import React from 'react'
import { NavigationContainer, } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import RecipesList from './src/screens/RecipesList'
import FavoritesList from './src/screens/FavoritesList'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="RecipesList"
          component={RecipesList}

          options={{
            headerShown: false,
            title: 'Forkify',
            headerStyle: {
              backgroundColor: '#FFF',
            },
            headerTitleStyle: {
              alignSelf: 'center'
            },
            headerTintColor:
              '#FF0800',
          }} />
        <Stack.Screen
          name="FavoritesList"
          component={FavoritesList}
          options={{
            title: 'Lista de Favoritos',
            headerStyle: {
              backgroundColor: '#FF0800',
            },
            headerTintColor: '#fff'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
