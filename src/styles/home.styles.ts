import { colors } from "@/styles/colors"
import { StyleSheet } from "react-native"


export const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: 47,
        backgroundColor: colors.background
    },
    header:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    textContainer:{
        flexDirection: "column",
    },
    content:{
        backgroundColor: colors.gray[100],
        width: "100%",
        flex: 1,
        paddingHorizontal: 15,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderWidth: 1,
        borderColor: colors.gray[200]
    },
    title:{
        fontSize: 18,
        color: colors.gray[200],
        fontWeight: "bold"
    },
    subtitle:{
        fontSize: 13,
        color: colors.gray[300],
        marginTop: 2
    },
    form:{
        marginTop: 15,
        flexDirection: "row",
        paddingHorizontal: 0,
        paddingVertical: 0,
        width: "100%",
        gap: 12,
        alignItems: "center",
    },
    modalContainer:{
        flex: 1,
        justifyContent:"flex-end"
    },
    modalContent:{
        backgroundColor: "#fff",
        paddingBottom: 32,
        padding: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        gap: 10
    },
    modalHeader:{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        justifyContent: "space-between"
    },
    modalTitle:{
        fontSize: 14,
        fontWeight: 600,   
    },
    footer:{
        borderTopColor: colors.gray[100],
        borderTopWidth: 1,
        flexDirection: "row",
        padding: 20,
        justifyContent: "space-evenly",
    },
})