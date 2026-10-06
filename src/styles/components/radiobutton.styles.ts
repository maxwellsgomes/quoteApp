import { colors } from "@/styles/colors"
import { StyleSheet } from "react-native"


export const styles = StyleSheet.create({
    container: {
        width: "40%",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 12, 
    },
    radioOuter: {
        width: 22,
        height: 22,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.gray[300], // Cinza quando inativo
        alignItems: "center",
        justifyContent: "center",
    },
    
    radioOuterSelected: {
        borderColor: colors.purple[500], 
        backgroundColor: colors.purple[500],
        borderWidth: 0, 
    },
    radioInner: {
        width: 8,
        height: 8,
        borderRadius: 5,
        backgroundColor: "#FFF",
    },
    lable:{
        fontSize: 16,
        color: colors.gray[500]
    }
})