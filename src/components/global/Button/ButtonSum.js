import { Entypo } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, TouchableOpacity, View, Text } from "react-native";
import { colors, fonts, justifyContent, responsive, stylesFonts } from "utils/index";

const Button = ({
    disabled,
    onPress,
    iconName = 'plus'
}) => {

    return (
        <TouchableOpacity 
            disabled={disabled}
            onPress={onPress} 
            style={[justifyContent.center, {
                width: responsive(30), 
                height: responsive(30), 
                backgroundColor: disabled ? colors.grey_3 : colors.primary, 
                borderRadius: 100
            }]}
        >
            <View 
                style={[justifyContent.center, {
                    width: responsive(16), 
                    height: responsive(16), 
                    backgroundColor: disabled ? colors.grey : 'white', 
                    borderRadius: 100
                }]}
                >
                <Entypo name={iconName} size={responsive(12)} color={disabled ? 'white' : colors.primary} />
            </View>
        </TouchableOpacity>
    )
} 

export default React.memo(Button)