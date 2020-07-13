import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image } from 'react-native'
import { Button, SearchBar, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import Recipes from '../components/Recipes'

const initialState = {
    favorites: [],
}


export default class FavoritesList extends Component {

    state = {
        ...initialState
    }

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('recipe')
        const favorites = JSON.parse(stateString) || initialState
        this.setState({ favorites: favorites })
        console.log(favorites)
    }

    removeFavorite = recipe_id => {
        const clickedRecipie = this.state.favorites.filter(recipe => recipe.recipe_id === recipe_id);
        const favorites = this.state.favorites.filter(recipe => recipe.recipe_id !== recipe_id)
        this.setState({favorites})
        const updatedFavorities = [...this.state.favorites];
        if(clickedRecipie){
            updatedFavorities.pop(clickedRecipie[0]);
        }        
        this.setState({favorites: updatedFavorities})
        console.log("RecipesList -> updatedFavorities", updatedFavorities)
        AsyncStorage.setItem('recipe', JSON.stringify(updatedFavorities))
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.favorites}
                    keyExtractor={item => item.recipe_id}
                    renderItem={({ item }) =>
                        <Recipes {...item} onToggleRecipe={this.removeFavorite} />}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
}
)
