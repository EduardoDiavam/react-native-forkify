import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image } from 'react-native'
import { Button, SearchBar, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
Icon.loadFont();

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      search: ''
    }
  }

  updateSearch = (search) => {
    this.setState({ search });
  };


  loadRecipes = () => {
    fetch('https://forkify-api.herokuapp.com/api/search?q={}')
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
            onChangeText={this.updateSearch}
            value={search}
          />
        </View>
        <View style={styles.container}>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <View style={styles.line}>
                <Text style={styles.title}>{item.title}</Text>
                <Image style={styles.image} source={{uri: item.image_url}} />            
                <Text style={styles.publisher}>Publisher: {item.publisher}</Text>
              </View>
            )}
            keyExtractor={item => item.recipe_id}
          />
        </View>

        <View style={styles.button}>
          <Button
            onPress={() => navigation.navigate('Favorites')}
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

  },
  button: {
    flex: 1,
    justifyContent: "flex-end"

  },

  line: {
    height: 150,
    flexDirection: "row",
    borderBottomColor: "#960000",
    borderBottomWidth: 1,
    paddingLeft: 10,
    flexDirection:"column"
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
    marginTop:10,
    alignSelf:"flex-start",

  },
  info: {
    alignSelf:"flex-end"
  },
  title: {
    fontSize:15,
    fontWeight: "bold"
  },
  publisher: {
    flexDirection: "row",
    alignItems:"flex-end",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    fontSize: 12,
    marginRight: 10,
    paddingBottom:10,
  }


})
