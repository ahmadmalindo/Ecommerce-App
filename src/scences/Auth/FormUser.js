import { Button, Container, Gap, Header, Input, Selection } from "components/global"
import { Nontification } from "helper"
import { storage } from "helper/storage"
import moment from "moment"
import React, { useState } from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import normalize from "react-native-normalize"
import mySalon from "utils/MySalonUtils"
import { colors } from "utils/colors"
import { stylesFonts } from "utils/fonts"
import {Picker} from '@react-native-picker/picker'

function FromUser({ navigation, route }) {

    const { data } = route.params

    const [isLoading, setIsloading] = useState(false)
    const [month, setMonth] = useState("")
    const [arrayDays, setArrayDays] = useState([])
    const [date, setDate] = useState("")
    const [pickerMonth, setPickerMonth] = useState(false)
    const [pickerDate, setPickerDate] = useState(false)

    const arrayMonth = moment.months()
    const year = moment().format('YYYY')

    const getDaysInMonth = async () => {
        let arrayDays = moment(moment(`${year}-${month + 1}`)).daysInMonth()

        let days = []
        for (let i = 0; i < arrayDays; i++) {
            days.push(i + 1)
        }

        setArrayDays(days);
        setPickerDate(true)
    }


    const handleSaveBirthDate = async () => {
        setIsloading(true)

        let params = {
            NoMember: data.NoMember,
            TglLahir: moment(`${year}-${month + 1}-${date}`).format('DD'),
            BulanLahir:  moment(`${year}-${month + 1}`).format('MM')
        }

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
                        month={month}
                        onMonthPicker={() => {
                            setPickerMonth(true)
                            setPickerDate(false)
                        }}
                        date={date}
                        onDatePicker={() => {
                            if (month !== '') {
                                getDaysInMonth(true)
                            }
                            else {
                                Nontification('Pilih tanggal dahulu')
                            }
                        }}
                    />
                    <Gap marginBottom={normalize(24)}/>
                    <SectionButton
                        isLoading={isLoading}
                        onPress={() => handleSaveBirthDate()}
                    />
                </View>
            </ScrollView>
            {pickerMonth &&
            <Picker
                selectedValue={month}
                onValueChange={(itemValue, itemIndex) => {
                    setMonth(itemValue)
                    setPickerMonth(false)
                    setDate("")
                }}
                style={{height: normalize(250), backgroundColor: colors.grey_3}}
            >
                {arrayMonth.map((item, index) => {
                    return (
                        <Picker.Item label={item} value={index} />
                    )
                })}
            </Picker>
            }
            {pickerDate &&
            <Picker
                selectedValue={date}
                onValueChange={(itemValue, itemIndex) => {
                    setDate(itemValue)
                    setPickerDate(false)
                }}
                style={{height: normalize(250), backgroundColor: colors.grey_3}}
            >
              {arrayDays.map(item => {
                return (
                    <Picker.Item label={item.toString()} value={item} />
                )
              })}
            </Picker>
            }
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
    month,
    date,
    onMonthPicker,
    onDatePicker
}) {

    const monthDate = moment.months(month);

    return (
        <>
            <Selection
                tittle="Bulan Lahir"
                placeHolder={month === "" ? 'Pilih Bulan Lahir' : monthDate}
                costumIcon={<Image source={require('assets/images/ic_calendar.png')} style={styles.icon}/>}
                onPress={onMonthPicker}
            />
            <Gap marginBottom={normalize(16)}/>
            <Selection
                tittle="Tanggal Lahir"
                placeHolder={date === "" ? 'Pilih Tanggal Lahir' : date}
                costumIcon={<Image source={require('assets/images/ic_calendar.png')} style={styles.icon}/>}
                onPress={onDatePicker}
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