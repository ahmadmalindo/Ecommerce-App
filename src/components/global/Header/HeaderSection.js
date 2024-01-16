import { AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import normalize from "react-native-normalize";
import { colors, fonts, justifyContent, stylesFonts } from "utils/index";

const HeaderSection = ({
    tittle,
    more,
    onPress
}) => {
    return (
        <View style={justifyContent.space_beetwen}>
            <Text style={stylesFonts.Body_1_Bold} numberOfLines={1}>{tittle}</Text>
            <Pressable onPress={onPress}>
                <Text style={[stylesFonts.Body_2_Regular, {color: colors.purple}]} numberOfLines={1}>{more}</Text>
            </Pressable>
        </View>
    )
}

export default HeaderSection

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