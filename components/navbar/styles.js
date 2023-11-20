import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        paddingHorizontal: 15
    },
    view: {
        height: 70,
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingBottom: 20
    },
    text: {
        color: "#fff",
        fontWeight: "500",
        fontSize: 15,
        textTransform: "uppercase",
        letterSpacing: 1
    }
});

export default styles;