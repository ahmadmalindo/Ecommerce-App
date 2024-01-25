import { useFocusEffect } from "@react-navigation/native"
import { Container, Gap, ModalPickPhoto } from "components/global"
import { Nontification, statusDashboard } from "helper/FunctionGlobal"
import { storage } from "helper/storage"
import React, { useState } from "react"
import { ActivityIndicator, FlatList, Image, InteractionManager, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import normalize from "react-native-normalize"
import mySalon from "utils/MySalonUtils"
import { colors, justifyContent, radius, stylesFonts } from "utils/index"
import * as ImagePicker from 'expo-image-picker';
import Axios from "axios";

const AxiosFrom = Axios.create()

function Account({ navigation }) {

    const [modal, setModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [dataMember, setDataMember] = useState([])

    const getDashboardMember = async () => {

        let params = {
            hpUser: storage.getString("storePhoneNumber")
        }

        const res = await mySalon.DashboardMember(params)

        if (statusDashboard.includes(res.status)) {
            setDataMember(res)
        }
        else {
            Nontification(res.response)
        }
    }

    let profile_menu = [
        // {
        //     tittle: 'Ubah Profil',
        //     ic: require('assets/images/ic_edit_account.png'),
        //     navigation: 'EditProfile'
        // },
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

    const takeImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
            updatePhotoProfile(result.assets[0].uri)
            setModal(false)
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
            updatePhotoProfile(result.assets[0].uri)
            setModal(false)
        }
    };

    const updatePhotoProfile = async(photo) => {
        setIsLoading(true)

        const formData = new FormData()

        formData.append("image_data", {
            uri: photo,
            type: 'image/png',
            name: 'image.png'
        })

        formData.append("NoHP", storage.getString("storePhoneNumber"))

        let api = `${base_uri}APICabang/fotUpload.php`

        AxiosFrom.post(api, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${storage.getString("token")}`
            },
            transformRequest: (data,headers) => {
                return formData
            }
        })
        .then(response => {
            setIsLoading(false)
            const res = response.data

            if (res.status == 200) {
                getDashboardMember()
            }
            else {
                Nontification(res.response)
            }
        })
        .catch(err => {
            setIsLoading(false)
            Nontification(err.response)
        })    
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
                        isLoading={isLoading}
                        onPress={() => setModal(true)}
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
            <ModalPickPhoto
                isVisible={modal}
                onBackdropPress={() => setModal(false)}
                onSwipeComplete={() => setModal(false)}
                onPress={(index) => {
                    if (index == 0) {
                        takeImage()
                    }
                    else {
                        pickImage()
                    }
                }}
            />
        </Container>
    )
}

function SectionProfile ({
    isLoading,
    photo,
    name = '',
    phone = '',
    onPress
}){
    return (
        <View style={{alignItems: 'center'}}>
            <Pressable style={{alignItems: 'center'}} onPress={onPress}>
                {isLoading ?
                <View style={[{width: normalize(80), height: normalize(80), borderRadius: normalize(80), backgroundColor: colors.grey_2}, justifyContent.view_center]}>
                    <ActivityIndicator />
                </View>
                :
                <Image source={{uri: photo}} resizeMethod="scale" resizeMode="cover" style={{width: normalize(80), height: normalize(80), borderRadius: normalize(80), backgroundColor: colors.grey}}/>
                }
                <Image source={require('assets/images/ic_edit.png')} style={styles.icon}/>
            </Pressable>
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
    },
    icon: {
        width: normalize(32),
        height: normalize(32),
        position: 'absolute',
        right: 0,
        bottom: 0
    },
})