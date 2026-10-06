import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
    
    container:{
        flex: 1,
    },
    detailsContainer: {
        borderRadius: 16,
        padding: 15,
        margin: 15,
        marginTop: 25,
        marginBottom: 0,
        borderWidth: 1,
        borderColor: colors.gray[300],
    },
    detailsHeader:{
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10
    },
    detailsClient:{
        gap:3, 
        marginBottom: 10,
        flex: 2
    },
    iconContainer:{
        backgroundColor: colors.purple[200],
        borderRadius: 10,
    },
    label:{
        fontSize: 14,
        color: colors.gray[600]
    },
    labelDetail:{
        fontSize: 16,
        color: colors.gray[800],
        fontWeight: 600,
    },
    totalSecondaryLabel:{
        fontSize: 15,
        color: colors.gray[500],
        fontWeight: 400
    },
    totalQuoteLabel:{
        fontSize: 16,
        color: colors.gray[800],
        fontWeight: 700
    },
    totalQuote:{
        fontSize: 20,
        color: colors.gray[800],
        fontWeight: 700
    },
    content:{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: colors.gray[100],
        borderColor: colors.gray[200],
        flex: 1,
        paddingBottom: 20
    },
    divider: {
        height: 1.5,
        backgroundColor: colors.gray[200],  
        marginVertical: 15,
        marginHorizontal: -10
    },
    quoteNumber:{
        color: colors.gray[200],
        fontSize: 15,
        fontWeight: 500
    },
    quoteTitle:{
        color: "#000",
        fontSize: 20,
        fontWeight: 500,
        flex: 1
    },
    header:{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginTop: 50,
        padding: 15,
        gap: 10,
        justifyContent: "space-between"
    },
    scrollContent:{
        paddingBottom: 0,
        gap: 16,
        flexGrow: 1
    },
    actionFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 35,
        backgroundColor: colors.gray[100], 
        borderTopWidth: 1,
        borderColor: colors.gray[200], 
    },
    circleButton: {
        width: 45,
        height: 45,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: colors.gray[200],
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareButton: {
        backgroundColor: colors.purple[500], 
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 25,
        gap: 8,
    },
    oldPrice:{
        fontSize: 14,
        color: colors.gray[400],
        textAlign: "right",
        textDecorationLine: "line-through"
    },
    totalQuoteContainer:{
        flexDirection:"column", 
        flex: 1,
        gap: 4
    },
    totalRow:{
        flexDirection: "row", 
        justifyContent: "space-between",
        alignItems: "center"
    }
})