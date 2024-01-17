import { useFocusEffect } from "@react-navigation/native"
import { Container, Gap } from "components/global"
import { Nontification } from "helper"
import { storage } from "helper/storage"
import React, { useState } from "react"
import { FlatList, Image, InteractionManager, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import normalize from "react-native-normalize"
import mySalon from "utils/MySalonUtils"
import { colors, justifyContent, radius, stylesFonts } from "utils/index"

function Account({ navigation }) {

    const [dataMember, setDataMember] = useState([])

    const getDashboardMember = async () => {

        let params = {
            hpUser: storage.getString("storePhoneNumber")
        }

        const res = await mySalon.DashboardMember(params)

        if (res.status === 200) {
            setDataMember(res)
        }
        else {
            Nontification(res.response)
        }
    }

    let profile_menu = [
        {
            tittle: 'Ubah Profil',
            ic: require('assets/images/ic_edit_account.png'),
            navigation: 'EditProfile'
        },
        {
            tittle: 'Ganti Password',
            ic: require('assets/images/ic_password.png'),
            navigation: 'EditPassword'
        },
        {
            tittle: 'Privacy & Policy',
            ic: require('assets/images/ic_privacy.png'),
            navigation: ''
        },
        {
            tittle: 'Logout',
            ic: require('assets/images/ic_logout.png'),
            navigation: 'logout'
        }
    ]

    const handleLogout = async () => {
        const res = await mySalon.Logout({NoHp: storage.getString("storePhoneNumber")})

        if (res.status === 200) {
            storage.clearMemoryCache()
            storage.clearStore()
            navigation.replace('Onboard')
        }
        else {
            Nontification(res.response)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {
            getDashboardMember()
          });
      
          return () => task.cancel();
        }, [navigation])
    );

    return (
        <Container backgroundColor={'white'}>
            <ScrollView>
                <View style={{paddingTop: normalize(24), paddingHorizontal: normalize(16), alignItems: 'center'}}>
                    <SectionProfile
                        photo={dataMember?.fotoFile}
                        name={dataMember?.NamaMember}
                        phone={dataMember?.TelpMember}
                    />
                    <Gap marginBottom={normalize(32)}/>
                    <FlatList
                        style={{width: '100%'}}
                        data={profile_menu}
                        renderItem={(({item, index}) => {
                            return (
                                <SectionListMenu
                                    item={item}
                                    index={index}
                                    onPress={() => {
                                        if (item.navigation === "logout") {
                                            handleLogout()
                                        }
                                        else {
                                            navigation.navigate(item.navigation, {data: dataMember})
                                        }
                                    }}
                                />
                            )
                        })}
                    />
                </View>
            </ScrollView>
        </Container>
    )
}

function SectionProfile ({
    photo,
    name = 'Alycia Genosveva',
    phone = '085123456789'
}){
    return (
        <View style={{alignItems: 'center'}}>
            <Image source={{uri: photo}} resizeMethod="scale" resizeMode="cover" style={{width: normalize(80), height: normalize(80), borderRadius: normalize(80)}}/>
            <Gap marginBottom={normalize(12)}/>
            <Text style={stylesFonts.Body_1_Bold}>{name}</Text>
            <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>{phone}</Text>
        </View>
    )
}

function SectionListMenu ({item,index, onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.card, justifyContent.space_beetwen]} >
            <View style={justifyContent.flex_start}>
                <Image source={item.ic} style={{width: normalize(32), height: normalize(32), marginRight: normalize(12)}}/>
                <Text style={[stylesFonts.Subtittle_2_Regular, {color: index === 3 ? colors.red_2 : colors.black}]}>{item.tittle}</Text>
            </View>
            <Image source={require('assets/images/ic_circle_right.png')} style={{width: normalize(32), height: normalize(32)}}/>
        </TouchableOpacity>
    )
}

export default Account

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: normalize(48),
        borderRadius: radius.r_16,
        backgroundColor: colors.grey_3,
        paddingHorizontal: normalize(8),
        marginBottom: normalize(12)
    }
})