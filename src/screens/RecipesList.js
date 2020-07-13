import React, { Component } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Button, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

import Recipes from '../components/Recipes'
const initialState = {
    searchText: "",
    data: [],
    favorites: [],
}


export default class RecipesList extends Component {

    state = {
        ...initialState
    }

    search = (searchText) => {
        this.setState({ searchText: searchText });

        let filteredData = this.state.data.filter(function (item) {
            return item.title.includes(searchText);
        });

        this.setState({ filteredData: filteredData });
    }


    loadRecipes = () => {
        fetch('https://forkify-api.herokuapp.com/api/search?q=pizza')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res.recipes || []
                })
            })
    }

    componentDidMount() {
        this.loadRecipes()
    }

    favoriteRecipe = recipe_id => {
        const clickedRecipie = this.state.data.filter(recipe => recipe.recipe_id === recipe_id);
        console.log("RecipesList -> clickedRecipe", clickedRecipie)
        
        const updatedFavorities = [...this.state.favorites];
        if(clickedRecipie){
            updatedFavorities.push(clickedRecipie[0]);
        }        
        this.setState({favorites: updatedFavorities})
        console.log("RecipesList -> updatedFavorities", updatedFavorities)
        AsyncStorage.setItem('recipe', JSON.stringify(updatedFavorities))
    }

    render() {
        const { search } = this.state;
        return (
            <View style={styles.container}>
                <View>
                    <SearchBar
                        lightTheme={true}
                        inputStyle={{ backgroundColor: 'white' }}
                        containerStyle={{ backgroundColor: 'white', borderRadius: 20 }}
                        inputContainerStyle={{ backgroundColor: 'white' }}
                        placeholder="Pesquise receitas aqui"
                        autoCorrect={false}
                        onChangeText={this.search}
                        value={this.state.searchText}
                    />
                </View>
                <View style={styles.RecipesList}>
                    <FlatList
                        data={this.state.filteredData && this.state.filteredData.length > 0 ? this.state.filteredData : this.state.data}
                        keyExtractor={item => item.recipe_id}
                        renderItem={({ item }) => 
                            <Recipes {...item} onToggleRecipe={this.favoriteRecipe} />}  
                    />
                </View>

                <View style={styles.button}>
                    <Button
                        onPress={() => { this.props.navigation.navigate("FavoritesList") }}
                        icon={
                            <Icon
                                name="heart"
                                size={15}
                                color="white"
                            />
                        }
                        iconRight
                        title='Favoritos '
                        buttonStyle={{ backgroundColor: '#960000' }}
                    >
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        position: "absolute",
        bottom: 0,
        width: '100%',

    },
})