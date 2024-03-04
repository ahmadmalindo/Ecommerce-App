import { useFocusEffect } from "@react-navigation/native"
import { Button, Container, Gap, Header, Input } from "components/global"
import { storage } from "helper"
import React, { useState } from "react"
import { Image, InteractionManager, ScrollView, StyleSheet, Text, View } from "react-native"
import normalize from "react-native-normalize"
import mySalon from "utils/MySalonUtils"
import { colors } from "utils/colors"
import { stylesFonts } from "utils/fonts"
import MMKVStorage from "react-native-mmkv-storage"
import { Nontification } from "helper"

function Register({ navigation }) {

    const storage = new MMKVStorage.Loader().initialize()

    const [isLoading, setIsloading] = useState(false)

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        numberPhone: "",
        password: "",
        password2: "",
        isOpen: true,
        isOpen2: true,
    })
 
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

    const handleRegister = async () => {
        if (input.numberPhone === "") {
            Nontification("Nomor Handphone Wajib di Isi")
        }
        else if (input.fullname === "") {
            Nontification("Nama Lengkap Wajib di Isi")
        }
        else if (input.email === "") {
            Nontification("Email Wajib di Isi")
        }
        else if (input.email === "") {
            Nontification("Email Wajib di Isi")
        }
        else if (input.password === "") {
            Nontification("Password Wajib di Isi")
        }
        else if (input.password === "123456") {
            Nontification("Password yang anda masukkan tidak aman")
        }
        else if (input.password !== input.password2) {
            Nontification("Kata Sandi dan Konfimasi Kata Sandi Harus Sama")
        }
        else {
            setIsloading(true)

            let isFormat62 = input.numberPhone.slice(0, 2) === "62"
            let numberPhone = input.numberPhone.slice(2)
    
            let params = {
                NoHP: input.numberPhone,
                Nama: input.fullname,
                Email: input.email,
                nPIN: input.password,
            }

            navigation.navigate('VerificationOtp', params)
    
            setIsloading(false)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {
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
                        onPressLogin={() => handleRegister()}
                        onPressForgot={() => navigation.navigate("ForgotPassword")}
                    />
                </View>
            </ScrollView>
        </Container>
    )
}

function SectionTittle () {
    return (
        <>
            <Text style={stylesFonts.Body_1_Bold}>Ayo bergabung ke MySalon. Silahkan daftarkan Akun Anda</Text>
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
                tittle={'Nama Lengkap'}
                placeholder={'Ketikan nama lengkap anda'}
                left
                costumIcon={<Image source={require('assets/images/ic_electronicdevices.png')} style={styles.icon}/>}
                value={input.fullname}
                onChangeText={(val) => setInput({
                    ...input,
                    fullname: val
                })}
            />
            <Gap marginBottom={normalize(16)}/>
            <Input
                tittle={'Email'}
                placeholder={'Ketikan email aktif'}
                left
                autoCapitalize={"none"}
                keyboardType={'email-address'}
                costumIcon={<Image source={require('assets/images/ic_electronicdevices.png')} style={styles.icon}/>}
                value={input.email}
                onChangeText={(val) => setInput({
                    ...input,
                    email: val
                })}
            />
            <Gap marginBottom={normalize(16)}/>
            <Input
                tittle={'Buat Kata Sandi'}
                placeholder={'Masukkan kata sandi'}
                password
                keyboardType={'numeric'}
                secureTextEntry={input.isOpen}
                maxLength={6}
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
            <Gap marginBottom={normalize(16)}/>
            <Input
                tittle={'Konfitmasi Kata Sandi'}
                placeholder={'Masukkan konfirmasi kata sandi'}
                password
                keyboardType={'numeric'}
                secureTextEntry={input.isOpen2}
                maxLength={6}
                onPress={() => setInput({
                    ...input,
                    isOpen2: !input.isOpen2
                })}
                value={input.password2}
                onChangeText={(val) => setInput({
                    ...input,
                    password2: val
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
                tittle={"Daftar"}
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

export default Register

const styles = StyleSheet.create({
    icon: {
        width: normalize(24),
        height: normalize(24)
    }
})