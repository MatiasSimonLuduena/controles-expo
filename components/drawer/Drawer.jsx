import { View, Text, TouchableOpacity } from "react-native"

import styles from "./styles"

export default function Drawer({ myMarkers, setMyMarkers, origin, closeDrawer }) {
    return(
        <View style={styles.container}>
            <View style={{ height: 24 }}></View>
            <Text style={styles.username}>Mi username</Text>
            <TouchableOpacity
                style={styles.warn}
                onPress={() => {
                    setMyMarkers([...myMarkers, origin]);
                    closeDrawer();
                }}
            >
                <Text style={styles.warnText}>Hay un control</Text>
            </TouchableOpacity>
        </View>
    )
}