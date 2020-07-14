import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'



export default props => {
    const [favorite, setFavorite] = useState(false)

    const favoritedYesOrNot = () => {
        setFavorite(!favorite)
    }

    const onPressHandler = () => {
        props.onToggleRecipe(props.recipe_id)
        favoritedYesOrNot()
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: props.image_url }} />
            <View style={styles.info}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.publisher}>{props.publisher}</Text>
            </View>
            <TouchableOpacity onPress={() => onPressHandler()} style={[styles.favorite]}>
                <Icon color="#FF0800" name={favorite ? 'heart' : 'heart-o'} size={30} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        padding: 20,
        margin: 10,
        borderRadius: 40,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ff0800'

    },
    image: {
        width: 120,
        height: 120,
        justifyContent: "flex-start",
        borderRadius: 30,
    },
    favorite: {
        width: '10%',
        position: "absolute",
        right: 10,
        alignSelf: "center",
        alignItems: "center"
    },
    info: {
        marginLeft: 10,
        flex: 1,
        justifyContent: "space-around"
    },
    title: {
        fontWeight: "bold",
        color: '#ff0800'
    },
    publisher: {
        color: '#800000'
    }
})
