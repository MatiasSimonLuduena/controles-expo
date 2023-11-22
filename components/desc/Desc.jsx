import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./styles";

// firebase
import { doc, getDoc, deleteDoc } from "firebase/firestore"
import { db } from "../../firebase"

export default function Desc({ idMarker, setIdMarker }) {
    const [description, setDescription] = useState({});

    async function control() {
        try {
            const controlDocRef = doc(db, 'controls', idMarker);
            const controlDocSnapshot = await getDoc(controlDocRef);

            if (controlDocSnapshot.exists()) {
                const controlData = { ...controlDocSnapshot.data(), id: controlDocSnapshot.id };
                setDescription(controlData);
            } else {
                console.log('El documento no existe');
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteDocument() {
        try {
            const controlDocRef = doc(db, 'controls', idMarker);
            await deleteDoc(controlDocRef);
            setIdMarker(null);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        control();
    }, [idMarker]);

    return(
        <View style={idMarker ? styles.container : styles.none}>
            <Text>{description.comment}</Text>
            <View style={{ flexDirection: "row", marginTop: 25, alignItems: "center" }}>
                <Text style={styles.is}>¿Este control ya no está más?</Text>
                <TouchableOpacity onPress={deleteDocument}>
                    <Text style={styles.button}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}