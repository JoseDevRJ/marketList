import React, { useState, useCallback, useEffect} from 'react'
import { Modal, FlatList, SafeAreaView, StatusBar, Text, StyleSheet, View, TouchableOpacity, TextInput, AsyncStorage } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Lista from './components/Lista'
import * as Animatable from 'react-native-animatable'

const BtnAnimatable = Animatable.createAnimatableComponent(TouchableOpacity)

export default function App() {

    const [open, setOpen] = useState(false)
    const [inicial, setInicial] = useState(0)
    const [lista, setLista] = useState([])
    const [produto, setProduto] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [preco, setPreco] = useState(0)

    useEffect(() => {
        async function load(){
            const listaStorage = await AsyncStorage.getItem('@list')
            const totalStorage = await AsyncStorage.getItem('@total')

            if(listaStorage){
                setLista(JSON.parse(listaStorage))
                setInicial(JSON.parse(totalStorage))
            }
        }
        load()
    }, [])

    useEffect(() => {
        async function save(){
            await AsyncStorage.setItem('@list',JSON.stringify(lista))
            await AsyncStorage.setItem('@total',JSON.stringify(inicial))
        }
        save()

    }, [lista,inicial])

    function add(){
        if((produto === '') || (quantidade === '') || (preco === '')){
            alert("Preencha todos os campos")
        }else{
            const data = {
                key: Math.random(),
                produto: produto,
                quantidade :quantidade,
                preco: preco
        }
        setLista([...lista, data])
        setInicial(inicial - (data.quantidade * data.preco))
        setOpen(false)
        setProduto('')
        setQuantidade('')
        setPreco('')
    }
}
    const handleDelete = useCallback((data) => {
        const find = lista.filter(r => r.key != data.key)
        setInicial(inicial + (data.preco * data.quantidade))
        setLista(find)
    })
        

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#0f7c90" barStyle="light-content" />

            <View style={styles.header}>
                <Text style={styles.title}>Tenho ainda...</Text>
                <Text style={styles.title}>R$ {inicial},00</Text>
                <Text style={styles.title}>Minha lista</Text>
            </View>


            <FlatList
                showsHorizontalScrollIndicator={false}
                data={lista}
                keyExtractor={(item) => String(item.key)}
                renderItem={({ item }) => <Lista data={item} handleDelete={handleDelete}/>}
            />

            <Modal transparent={false} visible={open}>
                <SafeAreaView style={styles.modal}>
                    <View animation="fadeInUp" duration={1500} style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setOpen(false)}>
                            <Ionicons name="md-arrow-back" size={40} color="#fff" style={{marginLeft:10}}/>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Novo item</Text>
                    </View>
                    <Animatable.View animation="fadeInUp" style={styles.modalBody}>
                        <TextInput style={styles.modalInput} placeholder="Produto"
                         placeholderTextColor="#000" returnKeyType='next'
                         value={produto} onChangeText={(valor) => setProduto(valor)}/>

                        <TextInput style={styles.modalInput} placeholder="Quantidade"
                         placeholderTextColor="#000" keyboardType="numeric" returnKeyType='next' autoCapitalize="words"
                         value={quantidade} onChangeText={(valor) => setQuantidade(valor)}/>

                        <TextInput style={styles.modalInput} placeholder="Preço"
                         placeholderTextColor="#000" keyboardType="numeric" returnKeyType='done'
                         value={preco} onChangeText={(valor) => setPreco(valor)}/>
                         <TouchableOpacity onPress={add}>
                             <Text style={styles.btnSave}>Salvar</Text>
                         </TouchableOpacity>
                         <TextInput style={styles.modalInput} keyboardType="numeric" placeholderTextColor="#000"
                        returnKeyType="done" placeholder="Quanto tenho para gastar?" onChangeText={(text) => setInicial(text)} />
                    </Animatable.View>
                </SafeAreaView>
            </Modal>

            <BtnAnimatable useNativeDriver animation="bounceInUp" duration={1500} style={styles.addBtn} onPress={() => setOpen(true)}>
                <Ionicons name="ios-add" size={40} color="#fff" />
            </BtnAnimatable>

            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f7c90"
    },
    header: {
        alignItems: "center"
    },
    title: {
        marginTop: 5,
        paddingBottom: 10,
        fontSize: 25,
        color: "#fff"
    },
    addBtn: {
        position: "absolute",
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: "red",
        right: 25,
        bottom: 25,
        alignItems: "center",
        justifyContent: "center",
        elevation: 2,
        zIndex: 9,
        shadowColor: "#fff",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 1,
            height: 3
        }
    },
    inputInicial: {
        borderWidth: 1,
        borderColor: "blue",
        backgroundColor: "#ddd",
        height: 50,
        width: 100,
        borderRadius: 30,
        left: 20,
        bottom: 30,
        textAlign: "center"
    },
    modal: {
        flex: 1,
        backgroundColor: "#0f7c90"
    },
    modalHeader:{
        flexDirection: "row",
        alignItems:"center",
        marginTop: 20
    },
    modalTitle:{
        marginLeft: 10,
        marginTop: 5,
        paddingBottom: 10,
        fontSize: 25,
        color: "#fff",
    },
    modalInput: {
        margin: 5,
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "blue",
    },
    btnSave:{
        marginTop: 20,
        margin: 5,
        padding: 15,
        borderRadius: 10,
        backgroundColor: "red",
        textAlign:"center",
        color: "#fff",
        fontSize: 20
    }
})