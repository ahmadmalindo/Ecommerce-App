import { Button, Container, Gap, Header, Input } from "components/global"
import { Nontification } from "helper"
import { storage } from "helper/storage"
import React, { useState } from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import normalize from "react-native-normalize"
import mySalon from "utils/MySalonUtils"
import { colors } from "utils/colors"
import { stylesFonts } from "utils/fonts"

function ForgotPassword({ navigation }) {

    const [input, setInput] = useState({
        numberPhone: "",
    })

    const handleForgotPassword = async () => {
        const res = await mySalon.ForgetPwdMember({hpUser: storage.getString("storePhoneNumber")})

        if (res.status === 200) {
            Nontification("Kode Sudah dikirim kepada pengguna")
        }
        else {
            Nontification(res.response)
        }
    }

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
                        onPress={() => handleForgotPassword()}
                    />
                </View>
            </ScrollView>
        </Container>
    )
}

function SectionTittle () {
    return (
        <>
            <Text style={stylesFonts.Body_1_Regular}>Masukkan no. telepon Anda yang telah terdaftar di MySalon</Text>
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
                placeholder={'62878123...'}
                left
                costumIcon={<Image source={require('assets/images/ic_electronicdevices.png')} style={styles.icon}/>}
                keyboardType={'numeric'}
                value={input.numberPhone}
                onChangeText={(val) => setInput({
                    ...input,
                    numberPhone: val
                })}
            />
        </>
    )
}

function SectionButton({
    onPress,
}) {

    return (
        <>
            <Button
                tittle={"Lanjutkan"}
                onPress={onPress}
            />
        </>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    icon: {
        width: normalize(24),
        height: normalize(24)
    }
})