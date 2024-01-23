import { Button, Container, Gap, Header, Input, Selection } from "components/global"
import { Nontification } from "helper"
import { storage } from "helper/storage"
import moment from "moment"
import React, { useState } from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import DatePicker from "react-native-date-picker"
import normalize from "react-native-normalize"
import mySalon from "utils/MySalonUtils"
import { colors } from "utils/colors"
import { stylesFonts } from "utils/fonts"

function FromUser({ navigation, route }) {

    const { data } = route.params

    const [isLoading, setIsloading] = useState(false)
    const [date, setDate] = useState("")
    const [open, setOpen] = useState(false)

    const handleSaveBirthDate = async () => {
        setIsloading(true)

        let params = {
            NoMember: data.NoMember,
            TglLahir: moment(date).format('DD'),
            BulanLahir:  moment(date).format('MM')
        }

        console.log(JSON.stringify(params))

        const res = await mySalon.SimpanTanggalLahir(params)

        setIsloading(false)

        if (res.status === 200) {
            storage.setBool('isLogin', true)
            storage.setString('storePhoneNumber', data.TelpMember)
            navigation.navigate('DashboardNavigation')
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
                        date={date}
                       onPress={() => setOpen(true)}
                    />
                    <Gap marginBottom={normalize(24)}/>
                    <SectionButton
                        isLoading={isLoading}
                        onPress={() => handleSaveBirthDate()}
                    />
                </View>
            </ScrollView>
            <DatePicker
                modal
                mode="date"
                open={open}
                date={date === "" ? new Date() : date}
                maximumDate={new Date()}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
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
    date,
    onPress
}) {
    return (
        <>
            <Selection
                tittle="Tanggal Lahir"
                placeHolder={date === "" ? 'Pilih Tanggal Lahir' : moment(date).format('DD MMM YYYY')}
                costumIcon={<Image source={require('assets/images/ic_calendar.png')} style={styles.icon}/>}
                onPress={onPress}
            />
        </>
    )
}

function SectionButton({
    isLoading,
    onPress
}) {

    return (
        <>
            <Button
                isLoading={isLoading}
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