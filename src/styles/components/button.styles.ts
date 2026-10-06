import { StyleSheet } from "react-native"
import { colors } from "../colors"

const basebutton = {
        flexDirection: "row" as const,
        alignItems: "center" as const,
        backgroundColor: colors.purple[500],
        justifyContent: "center" as const,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 999,
        gap: 8,
    }
const baseTitle = {
        fontSize: 16,
        fontWeight: "600" as const
}

export const styles = StyleSheet.create({
    container:{
        ...basebutton,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#e2e2e494"
    },
    secondaryButton:{
        ...basebutton,
        backgroundColor: "transparent",
        borderWidth: 1.5,
        borderColor: colors.gray[300]
    },
    title:{
        ...baseTitle,
        color: "#fff",
    },
    secondaryTitle:{
        ...baseTitle,
        color: colors.purple[500]
    },
    iconButton: {
        ...basebutton,
        paddingHorizontal: 0,
        paddingVertical: 0,
        backgroundColor: "#FFF",
        borderWidth: 1.5,
        borderColor: "#E5E5E5",
        borderRadius: 26,
        width: 52,
        height:52
    },
    iconTitle: {
        color: "#DB4D4D",
    },
})
  
