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
        this.setState({ searchText: searchText})
        let filteredData = this.state.data.filter(function (item) {
            return item.title.includes(searchText)
        })
        this.setState({ filteredData })

        /* Busca alterando o parametro da url
        fetch(`https://forkify-api.herokuapp.com/api/search?q=${searchText}`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                data: res.recipes || []
            })
        })
        */

    }

    //Busca fixa de um indrediente ja especificao na url
    loadRecipes = () => {
        fetch(`https://forkify-api.herokuapp.com/api/search?q=pizza`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res.recipes || []
                })
            })
    }  
    componentDidMount() {
        this.loadRecipes();
        //Carregando as receitas favoritas que estão no async storage para o state.
        AsyncStorage.getItem('recipe').then(res => {
            this.setState({ favorites: JSON.parse(res) });
        }).catch(error => {
            this.setState({ favorites: [] });
        });
    }

    favoriteRecipe = recipe_id => {
        const clickedRecipie = this.state.data.filter(recipe => recipe.recipe_id === recipe_id);
        const updatedFavorities = this.state.favorites;
        const favorites = this.state.favorites;
        //Verifica se a receita clicada já não esta nos favoritos
        const added = updatedFavorities.filter(item => parseInt(item.recipe_id, 10) === parseInt(recipe_id, 10))
        //Só adiciona os favoritos se a receita já não estiver
        if (added.length === 0) {
            updatedFavorities.push(clickedRecipie[0])
        } else {
            // Aqui vamos remover a receita da lista de acaso o usuario clicar no favorito novamente
            updatedFavorities.splice(updatedFavorities.findIndex(recipe => recipe.recipe_id === recipe_id), 1)
        }

        //Atualiza o state com a nova lista de favoritos
        this.setState({ favorites: updatedFavorities })

        //Persiste a nova list de favoritos no Async Storage
        AsyncStorage.setItem('recipe', JSON.stringify(updatedFavorities))
    }

    render() {
        const { search } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.searchbar}>
                    <SearchBar
                        searchIcon={{ color: '#ff0800' }}
                        lightTheme={true}
                        placeholderTextColor={"#ff0800"}
                        inputStyle={{ backgroundColor: 'white', fontSize: 20, color: '#ff0800' }}
                        containerStyle={{ backgroundColor: 'white', borderRadius: 50, borderBottomColor: 'transparent', borderTopColor: 'transparent' }}
                        inputContainerStyle={{ backgroundColor: 'white', }}
                        placeholder="Pesquise receitas aqui"
                        autoCorrect={false}
                        onChangeText={this.search}
                        value={this.state.searchText}
                    />
                </View>
                <View style={styles.list}>
                    <FlatList style={styles.list}
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
                                color="#ff0800"
                            />
                        }
                        iconRight
                        title='Favoritos '
                        titleStyle={{ color: '#ff0800' }}
                        buttonStyle={{ backgroundColor: '#fff', color: '#ff0800', }}
                    >
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff7f7'

    },
    searchbar: {
        margin: 10,
        marginTop: 20,
    },
    list: {
        flex: 1
    },
    button: {
        width: '100%',
        alignSelf: "center"

    }
})