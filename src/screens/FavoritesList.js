import React, { Component } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
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
    }

    removeFavorite = recipe_id => {
        const clickedRecipie = this.state.favorites.filter(recipe => recipe.recipe_id === recipe_id);
        const favorites = this.state.favorites.filter(recipe => recipe.recipe_id !== recipe_id)
        this.setState({ favorites })
        const updatedFavorities = [...this.state.favorites];
        if (clickedRecipie) {
            updatedFavorities.splice(updatedFavorities.findIndex(recipe => recipe.recipe_id === recipe_id), 1)
        }
        this.setState({ favorites: updatedFavorities })
        AsyncStorage.setItem('recipe', JSON.stringify(updatedFavorities))
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList style={styles.list}
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
        backgroundColor: '#fff7f7'
    },
    list: {
        marginTop: 10,
    }
}
)
