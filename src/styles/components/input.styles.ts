import { StyleSheet } from "react-native"
import { colors } from "../colors"

export const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        height: 52,
        backgroundColor: "#fff",
        borderWidth: 1.5,
        borderColor: colors.gray[300],
        borderRadius: 999,
        paddingHorizontal: 16,
    },
    input:{
        fontSize: 15,
        flex: 1,
        height: "100%",
        alignContent:"flex-start"
    },
    suffix:{
        fontSize: 18,
        color: colors.gray[600],
        fontWeight: 500
    }
})