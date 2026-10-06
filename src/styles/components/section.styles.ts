import { colors } from "@/styles/colors"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        paddingHorizontal: 16,
        padding: 16,
        margin: 15,
        marginBottom: 0,
        borderWidth: 1,
        borderColor: colors.gray[300]
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    title: {
        fontSize: 15,
        fontWeight: "400",
        color: colors.gray[400],
    },
    quoteName: {
        fontSize: 15,
        fontWeight: "400",
        color: colors.gray[900],
    },

    content: {
        gap: 12,
    },
    divider: {
    height: 1.5,
    backgroundColor: colors.gray[200],  
    marginVertical: 15,
    marginHorizontal: -16
    },
    highlightContainer: {
        flexDirection: 'row', 
        alignItems: 'flex-start', 
        backgroundColor: colors.gray[100], 
        borderRadius: 16,
        paddingHorizontal: 16,
        padding: 16,
        margin: 15, 
        gap: 15, 
        borderWidth: 1, 
        borderColor: colors.gray[200],
    },
    largeIconBox: {
        backgroundColor: colors.purple[200], // Fundo da caixinha do ícone
        padding: 10,
        borderRadius: 12,
    },
    highlightContent: {
        flex: 1, // Faz a área do children empurrar o limite até a borda direita
    }
})