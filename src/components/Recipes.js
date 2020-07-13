import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default props => {
    return (
        <View style={styles.container}>
                <Image style={styles.image} source={{uri: props.image_url}} />
                <View style={styles.info}>            
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.publisher}>{props.publisher}</Text>
                </View>
            <TouchableOpacity onPress={() => props.onToggleRecipe(props.recipe_id)} style={styles.favorite}>
                <Icon color="red" name='heart' size={20} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        padding: 20,
        paddingLeft: 5,
        backgroundColor: '#fff'
    },
    image: {
        width: 75,
        height: 75,
        justifyContent: "flex-start",
        borderRadius: 10,
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
        fontWeight: "bold"
    },
    publisher: {
    
    }
})
