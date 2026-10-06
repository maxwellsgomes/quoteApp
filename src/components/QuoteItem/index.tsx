import { styles } from "@/styles/components/quoteitem.styles";
import { Item } from "@/types/Item";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { Text, TouchableOpacity, View } from "react-native";

type Props = Pick<Item, "id" | "title" | "price" | "qty" | "description"> & {
    onEdit?: () => void
    onRemove?: () => void
    showEditIcon?: boolean;
}

export function QuoteItem({ title, price, qty, description, showEditIcon= true, onEdit, onRemove }: Props){
    return(
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title} numberOfLines={1}>{title}</Text>
                    <Text style={styles.price}>R$ {price.toFixed(2)}</Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.description} numberOfLines={1}>{description}</Text>
                    <Text style={styles.qty}>Qt: {qty}</Text>
                </View>
            </View>
            {showEditIcon && (
            <TouchableOpacity style={styles.editButton} onPress={onEdit}>
                <MaterialIcons name="edit" size={22} color="#6A46EB" />
            </TouchableOpacity>
            )}
        </View>
    )
}