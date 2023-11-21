import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000"
    },
    username: {
        color: "#fff",
        marginHorizontal: 30,
        marginBottom: 20,
        marginTop: 30,
        fontSize: 18
    },
    warn: {
        borderColor: "#C6C6C6",
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 15,
        borderRadius: 10
    },
    warnText: {
        color: "#fff",
        fontSize: 12,
        textTransform: "uppercase"
    }
});

export default styles;