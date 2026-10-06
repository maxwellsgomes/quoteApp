import { styles } from "@/styles/components/quote.styles";
import { QuoteBgColor, QuoteStatus, QuoteStatusColor, QuoteStatusLabel } from "@/types/QuoteStatus";
import { Text, View } from "react-native";


type BadgeProps = {
    status: QuoteStatus;
}

export function QuoteStatusBadge({ status }: BadgeProps) {
    const label = QuoteStatusLabel[status as keyof typeof QuoteStatusLabel];
    const color = QuoteStatusColor[status as keyof typeof QuoteStatusColor];
    const bgcolor = QuoteBgColor[status as keyof typeof QuoteBgColor];

    return (
        <View style={[styles.statusTag, { backgroundColor: bgcolor, alignSelf: 'flex-start' }]}>
            <View style={[styles.statusDot, { backgroundColor: color }]} />
            <Text style={[styles.statusText, { color: color }]}>{label}</Text>
        </View>
    );
}