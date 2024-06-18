import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fonts, justifyContent, responsive, stylesFonts } from "utils/index";
import { Entypo } from "@expo/vector-icons";

const Selection = ({ 
    tittle,
    fontFamilyTittle = fonts.regular,
    customHeight = responsive(44),
    customBackgroundColor = 'white',
    customBorderColor = colors.grey_2,
    customBorderRadius = responsive(10),
    customPaddingHorizontal = responsive(12),
    placeHolder,
    onPress,
    costumIconLeft,
    customIconRight = <Entypo name={"chevron-small-down"} size={responsive(24)} color={colors.grey} />,
    customTextColor = colors.grey,
    customStyleSelected
}) => {

    return (
        <>
            {tittle &&
            <Text style={[stylesFonts.Subtittle_2_Medium, {marginBottom: responsive(10), fontFamily: fontFamilyTittle}]}>{tittle}</Text>
            }
            <TouchableOpacity 
                style={[
                    justifyContent.space_beetwen,
                    {
                        width: '100%',
                        height: customHeight,
                        borderWidth: 1,
                        backgroundColor: customBackgroundColor,
                        borderColor: customBorderColor, 
                        borderRadius: customBorderRadius,
                        paddingHorizontal: customPaddingHorizontal,
                        zIndex: 1
                    }
                ]}
                onPress={onPress}
            >
                <View style={justifyContent.flex_start}>
                    {costumIconLeft &&
                    <View>
                        {costumIconLeft}
                    </View>
                    }
                    {placeHolder &&
                    <Text style={[stylesFonts.Subtittle_2_Regular, {color: customTextColor}]}>{placeHolder}</Text>
                    }
                    {customStyleSelected &&
                    <View>
                        {customStyleSelected}
                    </View>
                    }
                </View>
                {customIconRight &&
                <View 
                    style={{
                        position: 'absolute',
                        right: responsive(8),
                        top: responsive(10)
                    }}
                >
                    {customIconRight}
                </View> 
                }
            </TouchableOpacity>
        </>
    )
}

export default React.memo(Selection)

const styles = StyleSheet.create({

})
