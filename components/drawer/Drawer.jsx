import { View, Text, TouchableOpacity } from "react-native"

import styles from "./styles"

export default function Drawer({ markers, setMarkers }) {
    return(
        <View style={styles.container}>
            <View style={{ height: 24 }}></View>
            <Text style={styles.username}>Mi username</Text>
            <TouchableOpacity
                style={styles.warn}
                onPress={() => setMarkers([...markers, {
                    latitude: -31.428086, longitude: -64.184786
                }])}
            >
                <Text style={styles.warnText}>Hay un control</Text>
            </TouchableOpacity>
        </View>
    )
}