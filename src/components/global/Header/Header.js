import { AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import normalize from "react-native-normalize";
import { colors, fonts, justifyContent, stylesFonts } from "utils/index";

const Header = ({
    tittle,
    onPress,
    onShare,
    share
}) => {
    return (
        <TouchableOpacity style={justifyContent.space_beetwen} onPress={onPress}>
            <View style={justifyContent.flex_start}>
                <AntDesign name="arrowleft" size={24} color="black"style={{marginRight: normalize(24)}} />
                <Text style={stylesFonts.Body_1_Bold} numberOfLines={1}>{tittle}</Text>
            </View>
            {share &&
            <Entypo name="share" size={24} color={colors.primary} onPress={onShare}/>
            }
        </TouchableOpacity>
    )
}

export default Header

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    tittle: {
        fontSize: normalize(16),
        lineHeight: normalize(24),
        fontFamily: fonts.bold,
        color: colors.black
    },
})