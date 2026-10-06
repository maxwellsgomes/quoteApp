import { StyleSheet } from "react-native"
import { colors } from "../colors"

export const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    box: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: colors.gray[300],
        alignItems: "center",
        justifyContent: "center",
    },
    boxSelected: {
        backgroundColor: colors.purple[500],
        borderColor: colors.purple[500],
    },
})