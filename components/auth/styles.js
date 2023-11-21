import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#000"
    },
    brand: {
        color: "#fff",
        position: "absolute",
        bottom: 20,
        textTransform: "uppercase",
        fontSize: 15,
        fontWeight: "100"
    },
    title: {
        color: "#fff",
        textTransform: "uppercase",
        fontSize: 20,
        letterSpacing: 1,
        fontWeight: "700",
        textAlign: "center",
        padding: 10,
        marginBottom: 10
    },
    msg: {
        color: "#fff",
        fontWeight: "100",
        paddingHorizontal: 12,
        textAlign: "center",
        fontSize: 10,
        marginTop: 25
    },
    input: {
        backgroundColor: "#fff",
        height: 45,
        width: "80%",
        margin: 10,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    button: {
        backgroundColor: "#009E70",
        width: "80%",
        marginTop: 10,
        borderRadius: 5
    },
    textButton: {
        color: "#fff",
        textAlign: "center",
        textTransform: "uppercase",
        fontWeight: "600",
        fontSize: 15,
        padding: 8
    }
})

export default styles