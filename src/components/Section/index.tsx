import { colors } from "@/styles/colors"
import { styles } from "@/styles/components/section.styles"
import { MaterialIcons, MaterialIconsIconName } from "@react-native-vector-icons/material-icons"
import { ReactNode } from "react"
import { Text, View } from "react-native"

type Props = {
    title?: string
    iconName?: MaterialIconsIconName
    children: ReactNode
    size?: number
    header: boolean
    variant?: "default" | "highlight"
}

export function Section({ title, iconName, header=true, variant = "default", children }: Props){

    if (variant === "highlight") {
    return (
        <View style={styles.highlightContainer}>
                {iconName && (
                    <View style={styles.largeIconBox}>
                        <MaterialIcons name={iconName} size={28} color={colors.purple[500]}/>
                    </View>
                )}
                
                <View style={styles.highlightContent}>
                    {children}
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                { iconName &&
                    <MaterialIcons name={iconName} size={20} color={colors.purple[500]}/>
                }
                    <Text style={styles.title}>{title}</Text>
            </View>
                {header &&
                    <View style={styles.divider} />
                }
                    <View style={styles.content}>
                {children}
                    </View>
        </View>
    )
}