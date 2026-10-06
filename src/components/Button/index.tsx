import { styles } from "@/styles/components/button.styles"
import type { MaterialIconsIconName } from "@react-native-vector-icons/material-icons"
import { MaterialIcons } from "@react-native-vector-icons/material-icons"
import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native"


type PrimaryProps = {
    variant?: "primary"
    title: string
    iconName?: MaterialIconsIconName
}
type SecondaryProps ={
    variant?: "secondary"
    title: string
    iconName?: MaterialIconsIconName
}
type IconProps = {
    variant: "icon"
    title?: string
    iconName: MaterialIconsIconName
}
type Props = TouchableOpacityProps & {iconColor?: string} & (PrimaryProps | IconProps | SecondaryProps)


export function Button ({title, iconName, variant="primary", iconColor, ...rest}: Props){

    const isPrimary = variant === "primary"
    const defaultColor = variant === "icon" ? "#DB4D4D" : variant === "secondary" ? "#6a46eb" : "#fff";
    return(
        <TouchableOpacity 
                style={[variant === "primary" ? styles.container : variant === "icon" ? styles.iconButton : styles.secondaryButton]}
                activeOpacity={0.7}
                {...rest}
        >
            {isPrimary && (
            <LinearGradient
                colors={["#3A7ED5", "#7F48F0"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={[StyleSheet.absoluteFill]}
            />
        )}
            {iconName && (
                <MaterialIcons 
                    name={iconName}
                    size={25} 
                    color={iconColor || defaultColor}
                />
            )}

            {title && variant !== "icon" && (
                <Text 
                    style={[
                        variant === "primary" ? styles.title : styles.secondaryTitle
                    ]}
                >
                    {title}
                </Text>
            )}
            
        </TouchableOpacity>
    )
}
