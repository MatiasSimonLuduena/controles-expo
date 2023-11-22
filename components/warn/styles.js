import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "#fff",
        width: "100%",
        padding: 10
    },
    textArea: {
      height: 70,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      padding: 10
    },
    buttonContainer: {
        backgroundColor: "#009E70",
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10
    },
    button: {
        color: "#fff",
        textTransform: "uppercase",
        fontWeight: "500",
        fontSize: 15,
        letterSpacing: 1
    },
    none: {
      display: 'none'
    }
});

export default styles;