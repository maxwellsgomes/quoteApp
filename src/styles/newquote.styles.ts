import { colors } from "@/styles/colors"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 25
    },
    header:{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: 20,
        padding: 15,
        gap: 10,
    },
    divider: {
    height: 1.5,
    backgroundColor: colors.gray[200],  
    marginVertical: 15,
    marginHorizontal: -16
    },
    scrollContent:{
        flexGrow: 1,
        gap: 16
    },
    content:{
        backgroundColor: colors.gray[100],
        flex: 1,
        width: "100%",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderWidth: 1,
        borderColor: colors.gray[200],
    },
    statusGrid:{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    title:{
        fontSize: 20,
        fontWeight: 500,
        color: colors.gray[200]
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
    containerPrice:{
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10
    },
    qtySelector:{
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 12,
        gap: 16,
        borderColor: colors.gray[300],
        borderWidth: 1,
    },
    qtyButton: {
        justifyContent: "center",
        alignItems: "center"
    },
    qtyNumber:{
        fontSize: 16,
        fontWeight: "600",
        minWidth: 20,
        textAlign: "center"
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
        paddingHorizontal: 80,
        justifyContent: "space-around",
    },
    totalRow:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",  
        width: "100%",  
    },
    totalItemCount:{
        fontSize: 14,
        color: colors.gray[400], 
    },
    subTotalPrice:{
        fontSize: 18,   
    },
    discountPrice:{
        fontSize: 16,
        color: "#fd3c3c",
        marginLeft: "auto"
    },
    totalPrice:{
        fontSize: 20, 
        fontWeight: 500  
    },
    oldPrice:{
        fontSize: 14,
        color: colors.gray[400],
        textAlign: "right",
        textDecorationLine: "line-through"
    },
 
})