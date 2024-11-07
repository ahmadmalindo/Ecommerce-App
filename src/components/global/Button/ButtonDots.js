import { Entypo, Octicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, TouchableOpacity, View, Text } from "react-native";
import { colors, customStyle, fonts, justifyContent, responsive, stylesFonts } from "utils/index";

const ButtonDots = ({
    isChecked,
    circle,
    borderColor = colors.grey_3,
    borderRadius = responsive(6),
    onPress
}) => {

    return (
        <TouchableOpacity 
            onPress={onPress}
            style={
                [
                    justifyContent.view_center, customStyle.box,
                    {
                        borderRadius: circle ? 100 : borderRadius,
                        borderWidth: 2,
                        borderColor: isChecked ?  colors.primary : borderColor,
                    }
                ]
            }
            >
            <View 
                style={[
                    justifyContent.view_center, 
                    customStyle.box2, 
                    {
                        borderRadius: circle ? 100 : responsive(borderRadius - 2),
                        backgroundColor: isChecked ?  colors.primary : colors.grey_3
                    }
                ]}
            >
                {circle ?
                <>
                    {isChecked ?
                    <View 
                        style={{
                            width: responsive(6),
                            height: responsive(6),
                            backgroundColor: 'white',
                            borderRadius: 100
                        }}
                    />
                    :
                    null
                    }
                </>
                :
                <>
                    {isChecked ?
                    <Octicons name="check" size={responsive(10)} color={'white'} />
                    :
                    null
                    }
                </>
                }
            </View>
        </TouchableOpacity>
    )
} 

export default React.memo(ButtonDots)