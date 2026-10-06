import { styles } from "@/styles/components/checkbox.styles"
import { QuoteStatus } from "@/types/QuoteStatus"
import MaterialIcons from "@react-native-vector-icons/material-icons"
import { TouchableOpacity, View } from "react-native"
import { QuoteStatusBadge } from "../QuoteStatusBadge"

type Props = {
    status: QuoteStatus
    isSelected: boolean
    onPress: () => void
}

export function StatusCheckbox({ status, isSelected, onPress }: Props) {
    return (
        <TouchableOpacity style={styles.row} onPress={onPress}>
            <View style={[styles.box, isSelected && styles.boxSelected]}>
                {isSelected && <MaterialIcons name="check" size={16} color="#fff" />}
            </View>

            <QuoteStatusBadge status = {status} />

            
        </TouchableOpacity>
    )
}
