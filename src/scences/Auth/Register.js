import { useFocusEffect } from "@react-navigation/native"
import { Button, Container, Gap, HeaderBack, Input } from "components/global"
import React, { useState } from "react"
import { Image, InteractionManager, ScrollView, StyleSheet, Text, View } from "react-native"
import { colors } from "utils/colors"
import { stylesFonts } from "utils/fonts"
import { responsive } from "utils"

function Register({ navigation }) {

    const [isLoading, setIsloading] = useState(false)

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        password: "",
        isOpen: true,
    })
 
    const handleRegister = async () => {
    }

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {

          });
      
          return () => task.cancel();
        }, [navigation])
      );

    return (
        <Container backgroundColor={'white'}>
            <ScrollView>
                <View style={{paddingTop: responsive(24), paddingHorizontal: responsive(16)}}>
                    <HeaderBack onBack={() => navigation.goBack()}/>
                    <Gap marginBottom={responsive(32)}/>
                    <SectionTittle/>
                    <Gap marginBottom={responsive(24)}/>
                    <SectionFormInput
                        input={input}
                        setInput={setInput}
                    />
                    <Gap marginBottom={responsive(24)}/>
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
            <Gap marginBottom={responsive(8)}/>
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
                tittle={'Nama Lengkap'}
                placeholder={'Ketikan nama lengkap anda'}
                value={input.fullname}
                onChangeText={(val) => setInput({
                    ...input,
                    fullname: val
                })}
            />
            <Gap marginBottom={responsive(16)}/>
            <Input
                tittle={'Email'}
                placeholder={'Ketikan email aktif'}
                autoCapitalize={"none"}
                keyboardType={'email-address'}
                value={input.email}
                onChangeText={(val) => setInput({
                    ...input,
                    email: val
                })}
            />
            <Gap marginBottom={responsive(16)}/>
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
        </>
    )
}

function SectionButton({
    onPressLogin,
    isLoading
}) {

    return (
        <>
            <Button
                isLoading={isLoading}
                tittle={"Daftar"}
                onPress={() => onPressLogin()}
            />
        </>
    )
}

export default Register

const styles = StyleSheet.create({
})