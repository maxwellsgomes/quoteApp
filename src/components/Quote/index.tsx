import { styles } from "@/styles/components/quote.styles"
import { QuoteDoc } from "@/types/QuoteDoc"
import { router } from 'expo-router'
import { Text, TouchableOpacity, View } from "react-native"
import { QuoteStatusBadge } from "../QuoteStatusBadge"


type Props = Pick<QuoteDoc, "id" | "client" | "title" | "status" | "createdAt"> & {
    price: number
}

export function Quote({id, title, client, price, status, createdAt}: Props){    
    
    return (
        
        <TouchableOpacity onPress={() => router.push({pathname: "/quotedetails", params: {id: id}})}>
        <View style={styles.container}>
            
            {/* LINHA SUPERIOR: Título e Status */}
            <View style={styles.topRow}>
                <Text style={styles.jobname} numberOfLines={2}> 
                    {title}    
                </Text>
                <QuoteStatusBadge status={status} />
                
            </View>
            <View>
                <Text style={styles.jobDate}>Data: {createdAt}</Text>
            </View>

            {/* LINHA INFERIOR: Cliente e Preço */}
            <View style={styles.bottomRow}>
                
                <Text style={styles.jobclient}>{client}</Text>
                <Text style={styles.jobprice}>
                    <Text style={styles.jobcurrency}>R$ </Text>
                    {price.toFixed(2)}
                </Text>
            </View>
        </View>
        </TouchableOpacity>
    )
}
