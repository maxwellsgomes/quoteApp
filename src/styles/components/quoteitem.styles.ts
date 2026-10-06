import { StyleSheet } from "react-native";
import { colors } from "../colors";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 8,
    },
    content:{
        flex: 1,
        gap: 2
    },
    header:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title:{
        flex: 1,
        fontSize: 15,
        fontWeight: 600,
        marginRight: 8
    },
    price:{
        fontSize: 18,
        fontWeight: 700
    },
    footer:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 2
    },
    description: {
        flex: 1,
        fontSize: 13,
        color: colors.gray[500],
        marginRight: 8
    },
    qty:{
        fontSize: 13,
        color: colors.gray[500]
    },
    footerRight:{
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    editButton:{
        marginLeft: 12,
        justifyContent: "center",
        alignItems: "center",
    }
})