import { View, Text, TouchableOpacity, TextInput } from "react-native"
import { StatusBar } from 'expo-status-bar';

import styles from "./styles"

export default function Auth({ setAuth }) {
    return(
        <View style={styles.container}>
            <StatusBar style="light"/>
            <Text style={styles.brand}>Controls application</Text>
            <Text style={styles.title}>Iniciar sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Tu nombre o apodo"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={() => setAuth(true)}>
                <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>
            <Text style={styles.msg}>
                Si no tienes una cuenta se te creará una automaticamente
            </Text>
        </View>
    )
}