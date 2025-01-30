import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, fonts, justifyContent, responsive, stylesFonts } from "utils/index";
import { Gap } from "../Gap";

const HeaderApp = ({
    title,
    onBack,
    onPress,
    customColorIconBack = colors.grey,
    customColorText = colors.black,
    customViewStyle = <TouchableOpacity onPress={onPress}>
        <FontAwesome5 name="shopping-bag" size={responsive(20)} color={colors.grey} />
        <View style={{width: responsive(6), height: responsive(6), backgroundColor: colors.red_2, borderRadius: 100, position: 'absolute', right: responsive(-2)}}/>
    </TouchableOpacity>
}) => {
    return (
        <Gap
            paddingHorizontal={responsive(16)}
            paddingTop={responsive(16)}
            marginBottom={responsive(16)}
        >
            <View style={justifyContent.space_beetwen}>
                <TouchableOpacity onPress={onBack}>
                    <AntDesign name="arrowleft" size={responsive(20)} color={customColorIconBack}/>
                </TouchableOpacity>
                <Text style={[stylesFonts.Body_1_Regular, {color: customColorText}]}>{title}</Text>
                {customViewStyle}
            </View>
        </Gap>
    )
}

export default HeaderApp