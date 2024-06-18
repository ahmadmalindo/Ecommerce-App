import React from "react";
import { ActivityIndicator, TouchableOpacity, View, Text } from "react-native";
import { colors, fonts, responsive, stylesFonts } from "utils/index";

const Button = ({
    isLoading,
    tittle,
    disabled,
    onPress,
    cutomBackgroundColor = colors.primary,
    customHeight = responsive(44),
    customBorder = 0,
    customBorderColor = 'white',
    customBorderRadius = responsive(10),
    custumColorLoadingIndicator = 'white',
    customJustifyContent = 'center',
    customPaddingHorizontal = 0,
    customIconLeft,
    customIconRight,
    customColorText = 'white',
    customFontFamily = fonts.medium,
    customTextMarginHorizontal = responsive(10),
}) => {

    return (
        <TouchableOpacity 
            disabled={disabled}
            style={[{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                height: customHeight,
                backgroundColor: cutomBackgroundColor,
                borderWidth: customBorder,
                borderColor: customBorderColor,
                borderRadius: customBorderRadius,
                justifyContent: customJustifyContent,
                paddingHorizontal: customPaddingHorizontal
            }]}
            onPress={onPress}
        >   
            {isLoading ?
            <ActivityIndicator color={custumColorLoadingIndicator}/>
            :
            <>
                {customIconLeft &&
                <View>
                    {customIconLeft}
                </View>
                }
                <Text 
                    style={[
                        stylesFonts.Body_1_Medium, 
                        {
                            color: customColorText,
                            marginHorizontal: customTextMarginHorizontal,
                            fontFamily: customFontFamily
                        }
                    ]}
                >
                    {tittle}
                </Text>
                {customIconRight &&
                <View>
                    {customIconRight}
                </View>
                }
            </>
            }
        </TouchableOpacity>
    )
} 

export default React.memo(Button)