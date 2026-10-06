import { styles } from "@/styles/components/radiobutton.styles"
import { OrderBy, OrderByLabel } from "@/types/OrderBy"
import { Text, TouchableOpacity, View } from "react-native"

type Props = {
    option: OrderBy
    isSelected: boolean
    onPress: () => void
}

export function OrderRadioButton({ option, isSelected, onPress }: Props) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
            <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                {isSelected && <View style={styles.radioInner} />}
            </View>

            <Text style={styles.lable}>{OrderByLabel[option]}</Text>
        </TouchableOpacity>
    )
}