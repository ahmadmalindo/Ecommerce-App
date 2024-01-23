import { Button, CardNearest, CardTransaction, Container, Gap, Header, HeaderProfile, HeaderSection, Input, ModalToast } from "components/global"
import { Nontification } from "helper"
import { currencyFloat } from "helper"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { FlatList, Image, ImageBackground, InteractionManager, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import normalize from "react-native-normalize"
import { colors, fonts, justifyContent, radius, stylesFonts } from "utils/index"
import { useFocusEffect } from "@react-navigation/native"
import mySalon from "utils/MySalonUtils"
import { MaterialIcons } from "@expo/vector-icons"
import StarRating from 'react-native-star-rating-widget';

function Rating({ navigation, route }) {

    const { data } = route.params

    const [isLoading, setIsloading] = useState(false)
    const [rating, setRating] = useState(0)
    const [input, setInput] = useState(0)
    const [modal, setModal] = useState(false)

    const handleSubmitRating = async () => {
        
        if (rating === 0) {
            Nontification("Masukkan Rating dahulu")
        }
        else if (input === "") {
            Nontification("Masukkan Saran")
        }
        else {
            setIsloading(true)

            let params = {
                KodeTransaksi : data?.KodeTransaksi,
                JumlahRating : parseFloat(rating),
                KodeCabang: data?.KodeCabang,
                Komentar : input
            }
    
            const res = await mySalon.SubmitRating(params)

            setIsloading(false)

            if (res.status === 200) {
                setModal(true)
                setTimeout(() => {
                    setModal(false)
                }, 3500)
            }
            else {
                Nontification(res.response)
            }
        }
    }

    return (
        <Container backgroundColor={'white'}>
            <View style={{paddingTop: normalize(16), paddingHorizontal: normalize(16)}}>
                <Header
                    tittle={'Berikan Penilaian'}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <ScrollView>
                <View style={{paddingTop: normalize(24), paddingHorizontal: normalize(16)}}>
                    <SectionPlaceName
                        date={data?.Tanggal}
                    />
                    <Gap marginBottom={normalize(24)}/>
                    <SectionRating
                        rating={rating}
                        setRating={(val) => setRating(val)}
                        input={input}
                        setInput={setInput}
                    />
                    <Gap marginBottom={normalize(16)}/>
                    <Button
                        isLoading={isLoading}
                        tittle={'Kirim'}
                        onPress={() => handleSubmitRating()}
                    />
                </View>
            </ScrollView>
            <ModalToast
                message={'Berhasil Memberikan Penilaian'}
                isVisible={modal}
                onBackdropPress={() => {
                    setModal(false)
                    navigation.navigate("Home")
                }}
                onSwipeComplete={() => {
                    setModal(false)
                    navigation.navigate("Home")
                }}
            />
        </Container>
    )
}

function SectionPlaceName ({
    distance = '2.5',
    placename = 'Malang Town Square',
    detail_address = 'Malang Town Square, Blok GE 2 No. 1, Malang',
    date = 'February 20, 2023 | 08:59:45',
}) {
    return (
        <>
            <ImageBackground source={require('assets/images/ic_onboard.png')} resizeMethod='scale' borderRadius={radius.r_14} resizeMode='cover' style={{width: '100%', height: normalize(120)}}>
                <View style={{width: '100%', height: normalize(120), justifyContent: 'flex-end', padding: normalize(16)}}>
                    <View style={[justifyContent.flex_start,{alignSelf: 'flex-end'}]}>
                        <MaterialIcons name="location-pin" size={16} color="white" style={{marginRight: normalize(4)}} />
                        <Text style={[stylesFonts.Body_2_Regular, {color: 'white'}]}>{distance} Km</Text>
                    </View>
                </View>
            </ImageBackground>
            <Gap marginBottom={normalize(16)}/>
            <Text style={[stylesFonts.Heading_1]}>{placename}</Text>
            <Gap marginBottom={normalize(6)}/>
            <View style={justifyContent.flex_start}>
                <MaterialIcons name="location-pin" size={18} color={colors.grey} style={{marginRight: normalize(4)}} />
                <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>{detail_address}</Text>
            </View>
            <Gap marginBottom={normalize(6)}/>
            <Text style={[stylesFonts.Body_2_Bold, {color: colors.grey}]}>{date}</Text>
        </>
    )
}

function SectionRating ({
    rating,
    setRating,
    input,
    setInput
}) {
    return (
        <View style={{alignItems: 'center'}}>
            <StarRating
                starSize={50}
                color={colors.yellow_2}
                rating={rating}
                onChange={setRating}
            />
            <Gap marginBottom={normalize(16)}/>
            <Text style={[stylesFonts.Subtittle_2_Bold]}>Nilai {rating}/5.0</Text>
            <Gap marginBottom={normalize(16)}/>
            <Input
                paragraph
                placeholder={'Masukan Saran anda'}
                value={input}
                onChangeText={(val) => setInput(val)}
            />
        </View>
    )
}

export default Rating

const styles = StyleSheet.create({
    
})