import { useState } from "react"
import { View, Text, TouchableOpacity, TextInput } from "react-native";

import styles from "./styles";

// firebase
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase"

export default function Warn({ myMarkers, setMyMarkers }) {
    const [comentario, setComentario] = useState("");

    async function newMarker() {
        try {
            const newDoc = await addDoc(collection(db, "controls"), {
                latitude: myMarkers[0].latitude,
                longitude: myMarkers[0].longitude,
                comment: comentario
            })
            if (newDoc.id) {
                setMyMarkers([]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <View style={myMarkers.length ? styles.container : styles.none}>
            <TextInput
                style={styles.textArea}
                placeholder="Comentario. Ejemplo, control de ITV"
                value={comentario}
                onChangeText={text => setComentario(text)}
                multiline={true}
                numberOfLines={3}
            />
            <TouchableOpacity style={styles.buttonContainer} onPress={newMarker}>
                <Text style={styles.button}>Confirmar</Text>
            </TouchableOpacity>
        </View>
    );
}