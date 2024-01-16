import { AntDesign, Entypo } from "@expo/vector-icons";
import { Nontification } from "helper";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable, Linking } from "react-native";
import normalize from "react-native-normalize";
import { colors, fonts, justifyContent, stylesFonts } from "utils/index";

const HeaderProfile = ({
    username = 'Alycia Genosveva',
    photo = '',
    adminNumber = '081932472082'
}) => {

    const handleOpenWa = () => {

        let params = {
            number_phone: adminNumber.substr(1)
        }

        Linking.openURL(`whatsapp://send?phone=+62${params.number_phone}`)
        .then(() => {

        })
        .catch(err => {
            Nontification("Pastikan Wa anda sudah terinstall di hp")
        })
    } 

    return (
        <View style={justifyContent.space_beetwen}>
            <View style={justifyContent.flex_start}>
                <Image source={{uri: photo}} resizeMethod="scale" resizeMode="cover" style={{width: normalize(40), height: normalize(40), borderRadius: normalize(40),marginRight: normalize(12), backgroundColor: colors.grey_2}}/>
                <View>
                    <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>Selamat datang,</Text>
                    <Text style={[stylesFonts.Body_1_Bold]}>{username}</Text>
                </View>  
            </View>
            <Pressable onPress={() => handleOpenWa()}>
                <Image source={require('assets/images/ic_btn_wa.png')} resizeMethod="scale" resizeMode="cover" style={{width: normalize(80), height: normalize(45), marginRight: normalize(-24),marginTop: normalize(15)}}/>
            </Pressable>
        </View>
    )
}

export default HeaderProfile

const styles = StyleSheet.create({

})