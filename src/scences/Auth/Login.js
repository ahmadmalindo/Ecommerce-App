import { useFocusEffect } from "@react-navigation/native"
import { Button, Container, Gap, Header, Input } from "components/global"
import { storage } from "helper"
import React, { useState } from "react"
import { Image, InteractionManager, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import normalize from "react-native-normalize"
import mySalon from "utils/MySalonUtils"
import { colors } from "utils/colors"
import { fonts, stylesFonts } from "utils/fonts"
import MMKVStorage from "react-native-mmkv-storage"
import { statusDashboard, Nontification } from "helper/FunctionGlobal"
import DeviceInfo from 'react-native-device-info';

function Login({ navigation }) {

    const storage = new MMKVStorage.Loader().initialize()

    const [isLoading, setIsloading] = useState(false)
    const [deviceUniqueId, setDeviceUniqueId] = useState("")
    //081366886666
    //567928
    //087854402772
    //112233
    //085795515906 platinum
    //652278 pw platinum
    //082251434434 gold
    //020501 pw gold
    //085236468718 no member
    //787181
    //567928 deviceId

    const [input, setInput] = useState({
        numberPhone: "",
        password: "",
        isOpen: true
    })

    const getDeviceUniqueId = async () => {
        DeviceInfo.getUniqueId().then((uniqueId) => {
            console.log(uniqueId);
            setDeviceUniqueId(uniqueId)
        });
    }
 
    const getAuthentification = async () => {
        let params = {
            NamaUser: 'LAYANA',
            pwdUser: 'qsv5hVTQFE6QYOf',
            grant_type: "password"
        }

        const res = await mySalon.Authentification(params)

        if (res.status === 200) {
            storage.setString("token",res.access_token)
        }
    }

    const handleLogin = async () => {
        setIsloading(true)

        let isFormat62 = input.numberPhone.includes("62")
        let numberPhone = input.numberPhone.slice(2)

        let params = {
            hpUser: isFormat62 ? `0${numberPhone}` : input.numberPhone,
            pwdUser: input.password,
            perangkatID: deviceUniqueId
        }

        const res = await mySalon.Login(params)

        setIsloading(false)

        if (res.status === 200) {
            getDashboardMember()
        }
        else {
            Nontification(res.response)
        }
    }

    const getDashboardMember = async () => {
        setIsloading(true)

        let params = {
            hpUser: input.numberPhone
        }

        const res = await mySalon.DashboardMember(params)

        setIsloading(false)

        if (statusDashboard.includes(res.status)) {
            if (res.TanggalLahir !== null) {
                storage.setBool('isLogin', true)
                storage.setString('storePhoneNumber', params.hpUser)
                navigation.navigate('DashboardNavigation')
            }
            else {
                if (res.response !== 'OK') {
                    storage.setBool('isLogin', true)
                    storage.setString('storePhoneNumber', params.hpUser)
                    navigation.navigate('DashboardNavigation')
                }
                else {
                    navigation.navigate('FromUser', {data: res})
                }
            }
        }
        else {
            Nontification(res.response)
        }
    }


    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {
            getDeviceUniqueId()
            getAuthentification()
          });
      
          return () => task.cancel();
        }, [navigation])
      );

    return (
        <Container backgroundColor={'white'}>
            <ScrollView>
                <View style={{paddingTop: normalize(24), paddingHorizontal: normalize(16)}}>
                    <Header onPress={() => navigation.goBack()}/>
                    <Gap marginBottom={normalize(32)}/>
                    <SectionTittle/>
                    <Gap marginBottom={normalize(24)}/>
                    <SectionFormInput
                        input={input}
                        setInput={setInput}
                    />
                    <Gap marginBottom={normalize(24)}/>
                    <SectionButton
                        isLoading={isLoading}
                        onPressLogin={() => handleLogin()}
                        onPressForgot={() => navigation.navigate("ForgotPassword")}
                    />
                    <Gap marginBottom={normalize(24)}/>
                    <Pressable onPress={() => navigation.navigate('Register')}>
                        <Text style={[stylesFonts.Body_2_Regular, {textAlign: 'center'}]}>Tidak Punya Akun ? <Text style={{color: colors.primary, fontFamily: fonts.bold}}>Register</Text></Text>
                    </Pressable>
                </View>
            </ScrollView>
        </Container>
    )
}

function SectionTittle () {
    return (
        <>
            <Text style={stylesFonts.Body_1_Bold}>Selamat datang kembali. Silahkan masuk ke Akun Anda</Text>
            <Gap marginBottom={normalize(8)}/>
            <Text style={[stylesFonts.Subtittle_2_Regular, {color: colors.grey}]}>Lengkapi data Anda</Text>
        </>
    )
}

function SectionFormInput ({
    input,
    setInput
}) {
    return (
        <>
            <Input
                tittle={'No. Telepon'}
                placeholder={'0878123...'}
                left
                costumIcon={<Image source={require('assets/images/ic_electronicdevices.png')} style={styles.icon}/>}
                keyboardType={'numeric'}
                value={input.numberPhone}
                onChangeText={(val) => setInput({
                    ...input,
                    numberPhone: val
                })}
            />
            <Gap marginBottom={normalize(16)}/>
            <Input
                tittle={'Kata Sandi'}
                placeholder={'Masukkan kata sandi'}
                password
                keyboardType={'numeric'}
                secureTextEntry={input.isOpen}
                onPress={() => setInput({
                    ...input,
                    isOpen: !input.isOpen
                })}
                value={input.password}
                onChangeText={(val) => setInput({
                    ...input,
                    password: val
                })}
            />
        </>
    )
}

function SectionButton({
    onPressLogin,
    onPressForgot,
    isLoading
}) {

    return (
        <>
            <Button
                isLoading={isLoading}
                tittle={"Masuk"}
                onPress={() => onPressLogin()}
            />
            <Gap marginBottom={normalize(8)}/>
            <Button
                any_color
                border
                customColor="white"
                customColorText={colors.primary}
                tittle={"Lupa Kata Sandi"}
                onPress={() => onPressForgot()}
            />
        </>
    )
}

export default Login

const styles = StyleSheet.create({
    icon: {
        width: normalize(24),
        height: normalize(24)
    }
})