import { Button, Container, Gap, Header, Input, ModalPickPhoto } from "components/global"
import { Nontification } from "helper"
import React, { useState } from "react"
import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import normalize from "react-native-normalize"
import { colors, justifyContent, radius, stylesFonts } from "utils/index"
import * as ImagePicker from 'expo-image-picker';
import Axios from "axios";
import { storage } from "helper/storage"
import { base_uri } from "constants/BASE_URL"
import kaveMember from "utils/KaveMemberUtils"

const AxiosFrom = Axios.create()

function EditProfile({ navigation, route }) {

    const { data } = route.params

    const [input, setInput] = useState({
        fullname: data?.NamaMember,
        email: data?.emailMember,
        numberPhone: data?.TelpMember,
        photo: data?.fotoFile
    })
    const [modal, setModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const getDashboardMember = async () => {

        // let params = {
        //     hpUser: storage.getString("storePhoneNumber")
        // }

        // const res = await mySalon.DashboardMember(params)

        // if (res.status === 200) {
        //     setInput({
        //         fullname: res?.NamaMember,
        //         email: res?.emailMember,
        //         numberPhone: res?.TelpMember,
        //         photo: res?.fotoFile
        //     })
        // }
        // else {
        //     Nontification(res.response)
        // }
    }

    const handleUpdateEmail = async () => {
        // setIsLoading(true)
        // let params = {
        //     NoHP: storage.getString("storePhoneNumber"),
        //     Email: input.email
        // }

        // const res = await mySalon.SimpanEmail(params)

        // setIsLoading(false)

        // if (res.status !== 200) {
        //     Nontification(res.response)
        // }
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
        // setIsLoading(true)

        // const formData = new FormData()

        // formData.append("image_data", {
        //     uri: photo,
        //     type: 'image/png',
        //     name: 'image.png'
        // })

        // formData.append("NoHP", storage.getString("storePhoneNumber"))

        // let api = `${base_uri}APICabang/fotUpload.php`

        // AxiosFrom.post(api, formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         'Authorization': `Bearer ${storage.getString("token")}`
        //     },
        //     transformRequest: (data,headers) => {
        //         return formData
        //     }
        // })
        // .then(response => {
        //     setIsLoading(false)
        //     const res = response.data

        //     if (res.status == 200) {
        //         getDashboardMember()
        //     }
        //     else {
        //         Nontification(res.response)
        //     }
        // })
        // .catch(err => {
        //     setIsLoading(false)
        //     Nontification(err.response)
        // })    
    }

    return (
        <Container backgroundColor={'white'}>
            <View style={{paddingTop: normalize(16), paddingHorizontal: normalize(16)}}>
                <Header
                    tittle={'Edit Profil'}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <ScrollView>
                <View style={{paddingTop: normalize(42), paddingHorizontal: normalize(16)}}>
                    <View style={{alignItems: 'center'}}>
                        <SectionProfile
                            loading={isLoading}
                            photo={input.photo}
                            onPress={() => setModal(true)}
                        />
                    </View>
                    <Gap marginBottom={normalize(24)}/>
                    <SectionForm
                        input={input}
                        setInput={setInput}
                    />
                    <Gap marginBottom={normalize(24)}/>
                    <Button
                        isLoading={isLoading}
                        tittle={'Simpan'}
                        onPress={() => handleUpdateEmail()}
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
    photo,
    loading,
    onPress
}){
    return (
        <Pressable style={{alignItems: 'center'}} onPress={onPress}>
            {loading ?
            <View style={[{width: normalize(80), height: normalize(80), borderRadius: normalize(80), backgroundColor: colors.grey_2}, justifyContent.view_center]}>
                <ActivityIndicator />
            </View>
            :
            <Image source={{uri: photo}} resizeMethod="scale" resizeMode="cover" style={{width: normalize(80), height: normalize(80), borderRadius: normalize(80), backgroundColor: colors.grey_2}}/>
            }
            <Image source={require('assets/images/ic_edit.png')} style={styles.icon}/>
        </Pressable>
    )
}

export default EditProfile

function SectionForm ({
    input,
    setInput
}) {
    return (
        <View>
            <Input
                editable={false}
                tittle={'Fullname'}
                placeholder={'Ketikan Nama'}
                value={input.fullname}
                onChangeText={(val) => setInput({
                    ...input,
                    fullname: val
                })}
            />
            <Gap marginBottom={normalize(16)}/>
            <Input
                tittle={'Email'}
                placeholder={'Ketikan Email'}
                value={input.email}
                onChangeText={(val) => setInput({
                    ...input,
                    email: val
                })}
            />
            <Gap marginBottom={normalize(16)}/>
            <Input
                editable={false}
                tittle={'No. Telepon'}
                placeholder={'62878123...'}
                left
                costumIcon={<Image source={require('assets/images/ic_electronicdevices.png')} style={styles.icon2}/>}
                keyboardType={'numeric'}
                value={input.numberPhone}
                onChangeText={(val) => setInput({
                    ...input,
                    numberPhone: val
                })}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        width: normalize(32),
        height: normalize(32),
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    icon2: {
        width: normalize(24),
        height: normalize(24)
    }
})