import React from "react";
import { ActivityIndicator, TouchableOpacity, View, Text } from "react-native";
import { colors, fonts, responsive, stylesFonts } from "utils/index";

const Button = ({
    isLoading,
    tittle,
    disabled,
    onPress,
    cutomBackgroundColor = colors.primary,
    cutomBackgroundColorDisabled = colors.grey_2,
    customHeight = responsive(44),
    customBorderWidth = 0,
    customBorderColor = 'white',
    customBorderColorDisabled = colors.grey_2,
    customBorderRadius = responsive(10),
    custumColorLoadingIndicator = 'white',
    customJustifyContent = 'center',
    customPaddingHorizontal = 0,
    customIconLeft,
    customIconRight,
    customColorText = 'white',
    customColorTextDisabled = 'white',
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
                backgroundColor: disabled ? cutomBackgroundColorDisabled : cutomBackgroundColor,
                borderWidth: customBorderWidth,
                borderColor: disabled ? customBorderColorDisabled : customBorderColor,
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
                            color: disabled ? customColorTextDisabled : customColorText,
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