import { AntDesign, Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import normalize from "react-native-normalize";
import { colors, fonts, justifyContent, radius, stylesFonts } from "utils/index";
import { Gap } from "../Gap";
import { Button } from "../Button";

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const CardNearest = ({
    item,
    index,
    image,
    distance = '2.5 Km',
    namePlace = 'Mall Olympic Garden',
    detail_address = 'Mall Olympic Garden, Lantai 2/SF-26, Malang',
    onPress
}) => {
    return (
        <View style={styles.card}>
            <ImageBackground source={{uri: image}} borderTopLeftRadius={normalize(16)} borderTopRightRadius={normalize(16)} resizeMethod="scale" resizeMode="cover" style={{width: SCREEN_WIDTH / 1.1, height: normalize(120), backgroundColor: colors.grey_2, borderTopRightRadius: normalize(16), borderTopLeftRadius: normalize(16)}}>
                <View style={{width: '100%', height: normalize(120), justifyContent: 'flex-end', padding: normalize(16)}}>
                    <View style={[justifyContent.flex_start,{alignSelf: 'flex-end'}]}>
                        <MaterialIcons name="location-pin" size={16} color="white" style={{marginRight: normalize(4)}} />
                        <Text style={[stylesFonts.Body_2_Regular, {color: 'white'}]}>{distance} Km</Text>
                    </View>
                </View>
            </ImageBackground>
            <View style={{padding: normalize(16)}}>
                <Text style={stylesFonts.Subtittle_1_Bold}>{namePlace}</Text>
                <Gap marginBottom={normalize(4)}/>
                <View style={justifyContent.flex_start}>
                    <MaterialIcons name="location-pin" size={18} color={colors.grey} style={{marginRight: normalize(4)}} />
                    <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>{detail_address}</Text>
                </View>
                <Gap marginBottom={normalize(16)}/>
                <Button
                    tittle={'Detail'}
                    onPress={onPress}
                />
            </View>
        </View>
    )
}

export default CardNearest

const styles = StyleSheet.create({
    card: {
        width: '100%',
        minHeight: normalize(244),
        shadowColor: "rgba(28, 39, 49, 0.08)",
        backgroundColor: 'white',
        marginBottom: normalize(16),
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