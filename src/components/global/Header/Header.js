import { AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import normalize from "react-native-normalize";
import { colors, fonts, stylesFonts } from "utils/index";

const Header = ({
    tittle,
    onPress
}) => {
    return (
        <TouchableOpacity style={styles.row} onPress={onPress}>
            <AntDesign name="arrowleft" size={24} color="black"style={{marginRight: normalize(24)}} />
            <Text style={stylesFonts.Body_1_Bold} numberOfLines={1}>{tittle}</Text>
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