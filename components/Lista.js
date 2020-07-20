import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import Swipeable from 'react-native-gesture-handler/Swipeable'


const BtnAnimatable = Animatable.createAnimatableComponent(TouchableOpacity)

export default function Lista({ data, handleDelete }) {

    function RightAction(){
        return(
            <BtnAnimatable animation="bounceIn" duration={2000} style={styles.rightActions}  onPress={()=> handleDelete(data)}>
                <Ionicons name="md-trash" size={30} color="#fff"/>
            </BtnAnimatable>
        )
    }
    return (

        <Swipeable renderRightActions={RightAction}>
            <Animatable.View animation="bounceIn" style={styles.container}>
                <View>
                    <Text style={styles.txt}>Produto: {data.produto}</Text>
                    <Text style={styles.txt}>Quantidade: {data.quantidade}</Text>
                    <Text style={styles.txt}>Preço: R$ {data.preco},00</Text>
                </View>
            </Animatable.View>
        </Swipeable>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 7,
        elevation: 1.5,
        borderRadius: 7
    },
    txt: {
        color: "#121212",
        fontSize: 18,
        marginLeft: 5
    },
    rightActions:{
        backgroundColor: 'red',
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-end",
        paddingHorizontal: 22,
        borderRadius: 10
    }
})