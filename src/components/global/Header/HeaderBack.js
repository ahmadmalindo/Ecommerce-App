import { AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, fonts, justifyContent, responsive, stylesFonts } from "utils/index";

const HeaderBack = ({
    tittle,
    onBack,
    customColorIcon = colors.black,
    customColorText = colors.black,
    customViewStyle = <View style={{width: responsive(24), height: responsive(24)}}/>
}) => {
    return (
        <View style={justifyContent.space_beetwen}>
            <TouchableOpacity onPress={onBack}>
                <AntDesign name="arrowleft" size={responsive(24)} color={customColorIcon} />
            </TouchableOpacity>
            <Text style={[stylesFonts.Body_1_SemiBold, {color: customColorText}]} numberOfLines={1}>{tittle}</Text>
            {customViewStyle}
        </View>
    )
}

export default HeaderBack