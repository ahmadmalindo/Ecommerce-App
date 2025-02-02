import { Feather } from "@expo/vector-icons"
import { useFocusEffect } from "@react-navigation/native"
import { Container, Gap } from "components/global"
import HeaderApp from "components/global/Header/HeaderApp"
import { Nontification } from "helper"
import { storage } from "helper/storage"
import React, { useState } from "react"
import { FlatList, Image, InteractionManager, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import normalize from "react-native-normalize"
import { colors, justifyContent, radius, responsive, stylesFonts } from "utils/index"

function Account({ navigation }) {

    const storageUser = storage.getMap("storageUser")

    const [isLoading, setIsLoading] = useState(false)

    let profile_menu = [
        // {
        //     tittle: 'Ubah Profil',
        //     ic: '',
        //     navigation: 'EditProfile'
        // },
        // {
        //     tittle: 'Ganti Password',
        //     ic: '',
        //     navigation: 'EditPassword'
        // },
        {
            tittle: 'Alamat Saya',
            ic: '',
            navigation: 'Address'
        },
        {
            tittle: 'Hapus Akun',
            ic: '',
            navigation: 'DeleteAccount'
        },
        {
            tittle: 'Logout',
            ic: '',
            navigation: null
        }
    ]

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {

          });
      
          return () => task.cancel();
        }, [navigation])
    );

    const onRefresh = React.useCallback(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <Container backgroundColor={'white'}>
            <HeaderApp
                customColorIconBack="white"
                title={"Account"}
                onPress={() => {
                    navigation.navigate("Cart")
                }}
            />
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                }
            >
                <View style={{paddingTop: normalize(16), paddingHorizontal: normalize(16), alignItems: 'center'}}>
                    <SectionNama
                        fullname={storageUser?.fullname}
                        email={storageUser?.email}
                    />
                    <Gap marginBottom={responsive(24)}/>
                    <FlatList
                        style={{width: '100%'}}
                        data={profile_menu}
                        renderItem={(({item, index}) => {
                            return (
                                <SectionListMenu
                                    item={item}
                                    index={index}
                                    onPress={() => {
                                        if (item.navigation == null) { 
                                            Nontification("Apakah anda ingin keluar?", [
                                                {
                                                    text: 'Ya',
                                                    onPress: () => {
                                                        storage.clearMemoryCache()
                                                        storage.clearStore()
                                                        navigation.replace("Onboard")
                                                    }
                                                },
                                                {
                                                    text: 'Tidak'
                                                }
                                            ])

                                        }
                                        else {
                                            navigation.navigate(item.navigation)
                                        }
                                    }}
                                />
                            )
                        })}
                    />
                </View>
                <Gap marginBottom={normalize(296)}/>
            </ScrollView>
        </Container>
    )
}

function SectionNama ({
    fullname,
    email
}) {
    return (
        <View style={{alignItems: 'center'}}>
            <Text style={[stylesFonts.Body_1_SemiBold]}>{fullname}</Text>
            <Text style={[stylesFonts.Subtittle_2_Regular]}>{email}</Text>
        </View>
    )
}

function SectionListMenu ({item, index, onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.card, justifyContent.space_beetwen]} >
            <View style={justifyContent.flex_start}>
                {/* <Image source={item.ic} style={{width: normalize(32), height: normalize(32), marginRight: normalize(12)}}/> */}
                <Text style={[stylesFonts.Subtittle_2_Regular, {color: colors.black}]}>{item.tittle}</Text>
            </View>
            <Feather name="chevron-right" size={responsive(20)} color={colors.black} />
        </TouchableOpacity>
    )
}

export default Account

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: normalize(48),
        borderRadius: radius.r_16,
        backgroundColor: 'white',
        paddingHorizontal: normalize(12),
        marginBottom: normalize(12)
    },
})