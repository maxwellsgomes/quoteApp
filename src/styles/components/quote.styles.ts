import { StyleSheet } from "react-native"
import { colors } from "../colors"

export const styles = StyleSheet.create({
    container:{
        width: "100%",
        backgroundColor: "#FAFAFA", 
        borderRadius: 15,
        borderWidth: 1.5,
        borderColor: colors.gray[200],
        padding: 16, 
        gap: 10, 
        marginTop: 10,
    },
    topRow:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start", // O título e a tag ficam colados no teto
        gap: 12,
    },
    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end", // O cliente e o preço alinham por baixo
        gap: 8,
    },
    jobname: {
        flex: 1, // Garante que o texto ocupe o espaço livre e empurre a tag pra direita
        color: colors.gray[900], // Texto bem escuro
        fontSize: 16,
        fontWeight: "bold", // Negrito igual ao design
    },
    jobclient: {
        flex: 1,
        color: colors.gray[500],
        fontSize: 14,
    },
    jobcurrency:{
        color: colors.gray[900],
        fontSize: 15,
        fontWeight: 400,
    },
    jobprice: {
        color: colors.gray[900],
        fontSize: 18,
        fontWeight: "bold",
    },
    statusTag: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.green[300],
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        gap: 6,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 8,
        backgroundColor: colors.green[500], // Bolinha verde escura
    },
    statusText: {
        color: colors.green[500], // Texto verde escuro
        fontSize: 12,
        fontWeight: "bold",
    },
    jobDate: {
        fontSize: 12,
        fontWeight: 400,
        color: colors.gray[500]
    }
})