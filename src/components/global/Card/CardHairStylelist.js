import { AntDesign, Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, Pressable } from "react-native";
import normalize from "react-native-normalize";
import { colors, fonts, justifyContent, radius, stylesFonts } from "utils/index";
import { Gap } from "../Gap";
import { Button } from "../Button";

const CardHairStylelist = ({
    item,
    index,
    hairstylist_name = 'Cyndy Lillibridge',
    hairstylist_sc = 'CR',
    rating = '5.0',
    ulasan = '270',
    image,
    onPress
}) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{uri: image}} resizeMethod="scale" resizeMode="cover" style={{width: '100%', height: normalize(147), borderRadius: radius.r_12}}/>
            <View style={{padding: normalize(16)}}>
                <Text style={stylesFonts.Subtittle_2_Bold}>{hairstylist_name}</Text>
                <Gap marginBottom={normalize(6)}/>
                <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>{hairstylist_sc}</Text>
                <Gap marginBottom={normalize(6)}/>
                <View style={justifyContent.flex_start}>
                    <Image source={require('assets/images/ic_star.png')} style={{width: normalize(16), height: normalize(16)}}/>
                    <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>{rating} ({ulasan})</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CardHairStylelist

const styles = StyleSheet.create({
    card: {
        width: '48%',
        height: normalize(250),
        borderWidth: 1,
        borderColor: '#EBF0F5',
        shadowColor: "rgba(28, 39, 49, 0.08)",
        backgroundColor: 'white',
        marginBottom: normalize(16),
        marginRight: normalize(16),
        padding: normalize(6),
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        elevation: 2,
        shadowOpacity: 1,
        borderRadius: radius.r_16,
    },
    tittle: {
        fontSize: normalize(16),
        lineHeight: normalize(24),
        fontFamily: fonts.bold,
        color: colors.black
    },
})