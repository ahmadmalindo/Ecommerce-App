import { Entypo, Octicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, TouchableOpacity, View, Text } from "react-native";
import { colors, customStyle, fonts, justifyContent, responsive, stylesFonts } from "utils/index";

const ButtonDots = ({
    isChecked,
    circle,
    borderRadius = responsive(6),
    borderRadius2 = responsive(4),
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
                        borderColor: isChecked ?  colors.primary : colors.grey_3,
                    }
                ]
            }
            >
            <View 
                style={[
                    justifyContent.view_center, 
                    customStyle.box2, 
                    {
                        borderRadius: circle ? 100 : borderRadius2,
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
                    <Octicons name="check" size={responsive(13)} color={'white'} />
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