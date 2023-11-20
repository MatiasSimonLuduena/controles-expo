import { View, Text, TouchableOpacity } from "react-native"

import styles from "./styles"

export default function Drawer({ closeDrawer }) {
    return(
        <View style={styles}>
            <View style={{ height: 24 }}></View>
            <TouchableOpacity onPress={closeDrawer}>
                <Text>Cerrar Menú</Text>
            </TouchableOpacity>
        </View>
    )
}