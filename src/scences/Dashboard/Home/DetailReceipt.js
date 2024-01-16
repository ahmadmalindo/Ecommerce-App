import { Button, Container, Gap, Header, Input } from "components/global"
import React, { useState } from "react"
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native"
import normalize from "react-native-normalize"
import { justifyContent } from "utils/justifyContent"
import { colors } from "utils/colors"
import { stylesFonts } from "utils/fonts"
import moment from "moment"
import { currencyFloat } from "helper"

function DetailReceipt({ navigation, route }) {

    const { id } = route.params

    return (
        <Container backgroundColor={'white'}>
            <View style={{paddingTop: normalize(24), paddingHorizontal: normalize(16)}}>
                <Header tittle='Detail Receipt' onPress={() => navigation.goBack()}/>
            </View>
            <ScrollView>
                <View style={{paddingTop: normalize(24), paddingHorizontal: normalize(16)}}>
                    <SectionReceipt

                    />
                    <Gap marginBottom={normalize(16)}/>
                    <SectionReceipt2

                    />
                    <Gap marginBottom={normalize(16)}/>
                    <View style={{borderWidth: 1, borderStyle: 'dashed', borderColor: colors.grey_2, width: '100%', height: 0.5}}/>
                    <Gap marginBottom={normalize(16)}/>
                    <SectionReceipt3
                    />
                    <Gap marginBottom={normalize(16)}/>
                    <View style={{borderWidth: 1, borderStyle: 'dashed', borderColor: colors.grey_2, width: '100%', height: 0.5}}/>
                    <Gap marginBottom={normalize(16)}/>
                    <SectionReceipt4
                    />
                    <Gap marginBottom={normalize(16)}/>
                    <SectionFooter

                    />
                    <Gap marginBottom={normalize(16)}/>
                    <Text style={[stylesFonts.Body_2_SemiBold, {alignSelf: 'center'}]}>printed by THOMAS</Text>
                </View>
            </ScrollView>
        </Container>
    )
}

function  SectionReceipt({
    place_name = 'Malang Town Square',
    date = '2024-01-31'
}) {
    return (
        <View style={justifyContent.flex_start}>
            <Image source={require('assets/images/ic_receipt_logo.png')} style={{width: normalize(40), height: normalize(40), marginRight: normalize(16)}}/>
            <View>
                <Text style={stylesFonts.Body_1_Bold}>{place_name}</Text>
                <Text style={[stylesFonts.Body_2_SemiBold, {color: colors.grey}]}>{moment(date).format('MMMM DD,YYYY')}  |  12.00</Text>
            </View>
        </View>
    )
}

function  SectionReceipt2({
    username = 'Alycia Genosveva',
    invoice_number = '12345678'
}) {
    return (
        <View style={justifyContent.space_beetwen}>
            <View>
                <Text style={[stylesFonts.Body_2_SemiBold, {color: colors.grey}]}>Tn/Ny/Nn</Text>
                <Gap marginBottom={normalize(4)}/>
                <Text style={[stylesFonts.Body_2_SemiBold, {color: colors.grey}]}>Struk</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
                <Text style={stylesFonts.Body_2_SemiBold}>{username}</Text>
                <Gap marginBottom={normalize(4)}/>
                <Text style={[stylesFonts.Body_2_SemiBold, {color: colors.grey}]}>{invoice_number}</Text>
            </View>
        </View>
    )
}

function  SectionReceipt3({

}) {
    return (
        <>
            <View style={justifyContent.space_beetwen}>
                <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey, width: '50%'}]}>Perawatan</Text>
                <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey, width: '15%', textAlign:'right'}]}>Diskon</Text>
                <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey, width: '25%', textAlign:'right'}]}>Harga</Text>
            </View>
            <Gap marginBottom={normalize(6)}/>
            <FlatList
                data={[1,2,3,4,5]}
                renderItem={(({item}) => {
                    return (
                        <View style={[justifyContent.space_beetwen, {marginBottom: normalize(4)}]}>
                            <Text style={[stylesFonts.Body_2_SemiBold, {width: '50%'}]}>1 PCS Absolute Repair Conditioner 200ML</Text>
                            <Text style={[stylesFonts.Body_2_SemiBold, {width: '15%', textAlign:'right'}]}>-</Text>
                            <Text style={[stylesFonts.Body_2_SemiBold, {width: '25%', textAlign:'right'}]}>{currencyFloat(150000)}</Text>
                        </View>
                    )
                })}
            />
        </>
    )
}

function  SectionReceipt4({
    subtotal = 750000,
    discount = 0,
    total = 750000,
    tunai = 750000
}) {
    return (
        <View style={justifyContent.space_beetwen}>
            <View>
                <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>Sub Total</Text>
                <Gap marginBottom={normalize(4)}/>
                <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>Discount</Text>
                <Gap marginBottom={normalize(4)}/>
                <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>Total</Text>
                <Gap marginBottom={normalize(4)}/>
                <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>Tunai</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
                <Text style={stylesFonts.Body_2_Regular}>{subtotal}</Text>
                <Gap marginBottom={normalize(4)}/>
                <Text style={stylesFonts.Body_2_Regular}>{discount}</Text>
                <Gap marginBottom={normalize(4)}/>
                <Text style={stylesFonts.Body_2_Regular}>{total}</Text>
                <Gap marginBottom={normalize(4)}/>
                <Text style={stylesFonts.Body_2_Regular}>{tunai}</Text>
            </View>
        </View>
    )
}

function  SectionFooter({
    website = 'www.mysalon.co.id',
    contact = '0819-3247-2082'
}) {
    return (
        <View style={justifyContent.view_center}>
            <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>Website : {website}</Text>
            <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>Info Franchise : {contact}</Text>
        </View>
    )
}


export default DetailReceipt

const styles = StyleSheet.create({
    icon: {
        width: normalize(24),
        height: normalize(24)
    }
})