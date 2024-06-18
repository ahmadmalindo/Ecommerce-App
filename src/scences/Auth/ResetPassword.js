import { Button, Container, Gap, HeaderBack, Input } from "components/global"
import { Nontification } from "helper"
import { storage } from "helper/storage"
import React, { useState } from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import { responsive } from "utils"
import eagleVisionPro from "utils/ApiUtils"
import { colors } from "utils/colors"
import { fonts, stylesFonts } from "utils/fonts"

function ResetPassword({ navigation }) {

    const [isLoading, setIsloading] = useState(false)
    const [input, setInput] = useState({
        password: "",
        isOpen: true,
        password2: "",
        isOpen2: true
    })
    const [modal, setModal] = useState(false)

    const handleResetPassword = async () => {
        setIsloading(true)

        let params = {
            password: input.password,
            password_confirmation: input.password2,
        }

        const res = await eagleVisionPro.ForgotPasswordNewPassword(params)

        setIsloading(false)

        if (res.code === 200) {
            Nontification(res.message, [
                {
                    text:'Ok',
                    onPress: () => {
                        storage.clearStore()
                        storage.clearMemoryCache()
                        navigation.replace("Login") 
                    }
                }
            ])
        }
        else {
            Nontification(res.message)
        }
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
                            handleResetPassword()
                        }}
                    />
                </View>
            </ScrollView>
        </Container>
    )
}

function SectionTittle () {
    return (
        <View style={{alignItems: 'center'}}>
            <Text style={[stylesFonts.Heading_2]}>Buat kata sandi baru</Text>
            <Gap marginBottom={responsive(4)}/>
            <Text style={[stylesFonts.Subtittle_2_Medium, {color: colors.grey, textAlign: 'center'}]}>Kata sandi baru haruslah berbeda  dengan kata sandi sebelumnnya</Text>
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
                placeholder={'Masukkan kata sandi'}
                password
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
            <Gap marginBottom={responsive(16)}/>
            <Input
                placeholder={'Masukkan kata sandi'}
                password
                secureTextEntry={input.isOpen2}
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
    onPress,
    isLoading
}) {

    return (
        <>
            <Button
                isLoading={isLoading}
                tittle={"Buat Kata Sandi"}
                onPress={onPress}
            />
        </>
    )
}

export default ResetPassword

const styles = StyleSheet.create({
    icon: {
        width: responsive(24),
        height: responsive(24)
    }
})