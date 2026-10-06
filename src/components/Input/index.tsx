import { styles } from "@/styles/components/input.styles";
import { MaterialIcons, MaterialIconsIconName } from "@react-native-vector-icons/material-icons";
import { StyleProp, Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native";

type Props = TextInputProps & {
    iconName?: MaterialIconsIconName;
    suffix?: string;
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
}

export function Input({iconName, inputStyle, suffix, containerStyle, ...rest}: Props){
    return (
        <View style={[styles.container, containerStyle]} >
            {iconName && (
                <MaterialIcons name={iconName} size={30} color="#8E8E93"/>
            )}
            <TextInput placeholderTextColor="#2a2a41" style={[styles.input, inputStyle]} {...rest}/>
            {suffix && (
                <Text style={styles.suffix}>
                    {suffix}
                </Text>
            )}
        </View>
    )
}