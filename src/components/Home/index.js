import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image } from 'react-native'
import { Button, SearchBar, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
Icon.loadFont();

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchText: "",
      data: [],
      filteredData: [],
      favorites:[],
    }
  }

  search = (searchText) => {
    this.setState({ searchText: searchText });

    let filteredData = this.state.data.filter(function (item) {
      return item.title.includes(searchText);
    });

    this.setState({ filteredData: filteredData });
  }

  setData = async (value) => {
    
    AsyncStorage.setItem('key', value);
    console.log("Home -> setData -> value", value);    
  }

  setMultipleData = async (recipie) => {

    const updatedFavorities  = [...this.state.favorites];
    updatedFavorities.push(recipie);
    this.setState({ favorites: updatedFavorities });
    /*
    const recipes = [['publisher', item.publisher ], ['title', item.title], ['image', item.image_url]]
    AsyncStorage.multiSet(recipes), () => {
      console.log('chegou')
    }*/
  }

  showData = () => {
    const value = AsyncStorage.getItem('key');
    value.then(res => {
      console.log("Home -> showData -> res", res)      
    })
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
        <View style={styles.container}>
          <FlatList
            data={this.state.filteredData && this.state.filteredData.length > 0 ? this.state.filteredData : this.state.data}
            renderItem={({ item }) => (
              <View style={styles.line}>
                <Text style={styles.title}>{item.title}</Text>
                <Image style={styles.image} source={{ uri: item.image_url }} />
                <Text style={styles.publisher}>Publisher: {item.publisher}</Text>
                <Icon onPress={() => this.setMultipleData(item)} color="#960000" size={35} name="heart" style={styles.icon}></Icon>              
              </View>              
            )}
            keyExtractor={item => item.recipe_id}
          />
        </View>

        <View style={styles.button}>
          <Button
            onPress={() => { this.props.navigation.navigate("Favorites") }}
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
    justifyContent: "flex-end"

  },

  line: {
    height: 150,
    flexDirection: "row",
    borderBottomColor: "#960000",
    borderBottomWidth: 1,
    paddingLeft: 10,
    flexDirection: "column"
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
    marginTop: 10,
    alignSelf: "flex-start",

  },
  info: {
    alignSelf: "flex-end"
  },
  title: {
    fontSize: 15,
    fontWeight: "bold"
  },
  publisher: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    fontSize: 12,
    marginRight: 10,
    paddingBottom: 10,
  },
  icon: {
    position: "absolute",
    right: 20,
    top: 20,

  }


})