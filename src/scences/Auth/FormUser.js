import { Button, Container, Gap, Header, Input, Selection } from "components/global"
import React, { useState } from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import normalize from "react-native-normalize"
import { colors } from "utils/colors"
import { stylesFonts } from "utils/fonts"

function FromUser({ navigation }) {

    const [input, setInput] = useState({
        numberPhone: "",
        password: "",
        isOpen: true
    })

    return (
        <Container backgroundColor={'white'}>
            <ScrollView>
                <View style={{paddingTop: normalize(24), paddingHorizontal: normalize(16)}}>
                    <Header onPress={() => navigation.goBack()}/>
                    <Gap marginBottom={normalize(32)}/>
                    <SectionTittle/>
                    <Gap marginBottom={normalize(24)}/>
                    <SectionFormInput
                       onPress={() => alert('12')}
                    />
                    <Gap marginBottom={normalize(24)}/>
                    <SectionButton
                        onPress={() => navigation.replace("DashboardNavigation")}
                    />
                </View>
            </ScrollView>
        </Container>
    )
}

function SectionTittle () {
    return (
        <>
            <Text style={stylesFonts.Body_1_Bold}>Lengkapi biodata Anda sebelum melanjutkan ke halaman selanjutnya</Text>
        </>
    )
}

function SectionFormInput ({
    onPress
}) {
    return (
        <>
            <Selection
                tittle="Tanggal Lahir"
                placeHolder={'Pilih Tanggal Lahir'}
                costumIcon={<Image source={require('assets/images/ic_calendar.png')} style={styles.icon}/>}
                onPress={onPress}
            />
        </>
    )
}

function SectionButton({
    onPress
}) {

    return (
        <>
            <Button
                tittle={"Simpan"}
                onPress={onPress}
            />
        </>
    )
}

export default FromUser

const styles = StyleSheet.create({
    icon: {
        width: normalize(24),
        height: normalize(24)
    }
})