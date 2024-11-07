import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fonts, justifyContent, responsive, stylesFonts } from "utils/index";
import { Entypo } from "@expo/vector-icons";

const Selection = ({ 
    tittle,
    fontFamilyTittle = fonts.regular,
    customHeight = responsive(44),
    customBackgroundColor = 'transparent',
    customBorderColor = colors.grey_2,
    customBorderRadius = responsive(10),
    customPaddingHorizontal = responsive(12),
    placeHolder,
    onPress,
    customIconLeft,
    customIconRight = <View style={{
        width: responsive(36),
        height: responsive(44),
        alignItems: 'center',
        justifyContent: 'center'
    }}>
            <Entypo name={"chevron-small-down"} size={responsive(24)} color={colors.grey} />
        </View>,
    customTextColor = colors.grey,
    customTextFont = fonts.regular,
    customStyleSelected,
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
                    {customIconLeft &&
                    <View>
                        {customIconLeft}
                    </View>
                    }
                    {placeHolder &&
                    <Text style={[stylesFonts.Subtittle_2_Regular, {color: customTextColor, fontFamily: customTextFont}]}>{placeHolder}</Text>
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
                        right: 0,
                        top: 0
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
