import { AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { colors, fonts, justifyContent, responsive, stylesFonts } from "utils/index";

const HeaderSection = ({
    tittle,
    onPress,
    customColorText = colors.black,
    customColorTextMore = colors.primary,
    more = "Lihat Semua",
}) => {
    return (
        <View style={justifyContent.space_beetwen}>
            <Text style={[stylesFonts.Body_1_SemiBold, {color: customColorText}]} numberOfLines={1}>{tittle}</Text>
            <TouchableOpacity onPress={onPress}>
                <Text style={[stylesFonts.Body_2_Regular, {color: customColorTextMore}]} numberOfLines={1}>{more}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HeaderSection