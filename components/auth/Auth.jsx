import { useState } from "react"

// RN
import { View, Text, TouchableOpacity, TextInput } from "react-native"
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "./styles"

// firebase
import { collection, addDoc, getDocs } from "firebase/firestore"
import { db } from "../../firebase"

export default function Auth({ setAuth }) {
    const [nombre, setNombre] = useState("");
    const [error, setError] = useState(false);

    async function newUser() {
        try {
            let data;

            await getDocs(collection(db, "users")).then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                .map((doc) => ({...doc.data() }));

                data = newData;
            });

            for (const element of data) {
                if (nombre.trim().toLowerCase() === element.nombre) {
                    setError(true);
                    return; 
                }
            }

            const newDoc = await addDoc(collection(db, "users"),
                { nombre: nombre.trim().toLowerCase() })
            ;
            newDoc.id && setAuth(nombre);
            newDoc.id && await AsyncStorage.setItem('auth', nombre);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <View style={styles.container}>
            <StatusBar style="light"/>
            <Text style={styles.brand}>Controls application</Text>
            <Text style={styles.title}>Escribe tu nombre o apodo</Text>
            <TextInput
                style={styles.input}
                placeholder="Tu nombre o apodo"
                value={nombre} onChangeText={text => setNombre(text)}
            />
            <Text style={error ? styles.msgError : styles.msgErrorNone}>
                El nombre esta en uso, elige otro.
            </Text>
            <TouchableOpacity style={styles.button} onPress={newUser}>
                <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>
            <Text style={styles.msg}>
                Creemos rápido tu cuenta
            </Text>
        </View>
    )
}