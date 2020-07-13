import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image } from 'react-native'
import { Button, SearchBar, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
Icon.loadFont();

import Home from '../Home/index'


export default class Favorites extends Component {

  constructor(props) {
    super(props)
    this.state = {
      publisher: ''
    }
  }
  

  componentDidMount = () => AsyncStorage.getItem('key').then((value) => this.setState({ 'publisher': value }))

  removeFavorite = async () => {
    try {
      await AsyncStorage.removeItem('key')
    } catch (e) {

    }
    console.log('Done.')
  }

  render() {
    return (
      <View>
        <Text>{this.state.publisher}</Text>
        <Icon onPress={this.removeFavorite} color="#960000" size={35} name="heart" style={styles.icon}></Icon>
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
