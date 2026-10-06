import { styles as quoteStyle } from "@/styles/components/quote.styles"
import { styles } from "@/styles/components/radiobutton.styles"
import { QuoteBgColor, QuoteStatus, QuoteStatusColor, QuoteStatusLabel } from "@/types/QuoteStatus"
import { Text, TouchableOpacity, View } from "react-native"

type Props = {
    status: QuoteStatus
    isSelected: boolean
    onPress: () => void
}

export function StatusRadioButton({status, isSelected, onPress}: Props){
    const label = QuoteStatusLabel[status]
    const color = QuoteStatusColor[status]
    const bgColor = QuoteBgColor[status]

    return(
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
            
            <View style={[
                styles.radioOuter, 
                isSelected && styles.radioOuterSelected
            ]}>
                {isSelected && <View style={styles.radioInner} />}
            </View>

            
            <View style={[quoteStyle.statusTag, { backgroundColor: bgColor }]}>
                <View style={[quoteStyle.statusDot, { backgroundColor: color }]} />
                <Text style={[quoteStyle.statusText, { color: color }]}>
                    {label}
                </Text>
            </View> 
        </TouchableOpacity>
    )
}