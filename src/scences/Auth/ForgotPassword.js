import { Button, Container, Gap, HeaderBack, Input } from "components/global"
import { Nontification } from "helper"
import { storage } from "helper/storage"
import React, { useState } from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import { responsive } from "utils"
import eagleVisionPro from "utils/ApiUtils"
import { colors } from "utils/colors"
import { fonts, stylesFonts } from "utils/fonts"

function ForgotPassword({ navigation }) {

    const [isLoading, setIsloading] = useState(false)
    const [input, setInput] = useState({
        email: __DEV__ ? "aldirifaiemail@mail.com" : "",
    })

    const handleForgotPassword = async () => {
        navigation.navigate("VerificationOtp", {data: input})
    }

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
                    <Gap marginBottom={responsive(34)}/>
                    <SectionButton
                        isLoading={isLoading}
                        onPress={() => {
                           handleForgotPassword()
                        }}
                        onBack={() => {
                            navigation.goBack()
                        }}
                    />
                </View>
            </ScrollView>
        </Container>
    )
}

export default ForgotPassword

function SectionTittle () {
    return (
        <View style={{alignItems: 'center'}}>
            <Text style={[stylesFonts.Heading_2]}>Atur ulang kata sandi</Text>
            <Gap marginBottom={responsive(4)}/>
            <Text style={[stylesFonts.Subtittle_2_Medium, {color: colors.grey, textAlign: 'center'}]}>Silahkan masukan email anda kami akan mengirimkan kode OTP melalui email anda</Text>
        </View>
    )
}

function SectionFormInput ({
    input,
    setInput
}) {
    return (
        <>
            <Input
                tittle={'Email'}
                placeholder={'Masukkan email anda...'}
                keyboardType={'numeric'}
                value={input.email}
                onChangeText={(val) => setInput({
                    ...input,
                    email: val
                })}
            />
        </>
    )
}

function SectionButton({
    isLoading,
    onPress,
    onBack
}) {

    return (
        <>
            <Button
                isLoading={isLoading}
                tittle={"Kirim Kode"}
                onPress={onPress}
            />
            <Gap
                marginBottom={responsive(16)}
            />
            <Text onPress={onBack} style={[stylesFonts.Subtittle_2_Regular, {color: colors.grey, textAlign: 'center'}]}>Anda ingat kata sandi anda? <Text style={{fontFamily: fonts.medium, color: colors.primary}}>Masuk</Text></Text>
        </>
    )
}

const styles = StyleSheet.create({
})