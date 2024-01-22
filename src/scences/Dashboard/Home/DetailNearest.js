import { MaterialIcons } from "@expo/vector-icons"
import { useFocusEffect } from "@react-navigation/native"
import { Button, CardHairStylelist, CardNearest, CardTransaction, Container, Gap, Header, HeaderProfile, HeaderSection, Input, ModalConfirmOrder } from "components/global"
import { Nontification } from "helper"
import { currencyFloat } from "helper"
import { storage } from "helper/storage"
import moment from "moment"
import React, { useState } from "react"
import { Alert, FlatList, Image, ImageBackground, InteractionManager, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import normalize from "react-native-normalize"
import mySalon from "utils/MySalonUtils"
import { colors, fonts, justifyContent, radius, stylesFonts } from "utils/index"

function DetailNearest({ navigation, route }) {

    const { id, data } = route.params

    const [inputSearch, setInputSearch] = useState("")
    const [modal, setModal] = useState(false)
    const [show, setShow] = useState(false)
    const [dataKaryawan, setDataKaryawan] = useState([])

    const getKaryawanStanby = async () => {
        const res = await mySalon.KaryawanStanby({nKodeOutlet: id})

        if (res.status === 200) {
            setDataKaryawan(res.responsedata)
        }
        else {
            Nontification(res.response)
        }
    }

    const handleInputOrder = async () => {

        let params = {
            NoMember: storage.getString("storeNomorMember"),
            NoHP: storage.getString("storePhoneNumber"),
            KodeCabang: id
        }

        const res = await mySalon.OrderInput(params)

        if (res.status === 200) {
            setModal(false)
            Alert.alert("Perhatian", "Berhasil Melakukan Order", [
                {
                    text: 'Ya',
                    onPress: () => navigation.navigate("Home")
                }
            ])
        }
        else {
            Nontification(res.response)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {
            getKaryawanStanby()
          });
      
          return () => task.cancel();
        }, [navigation])
    );

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    return (
        <Container backgroundColor={'white'}>
            <View style={{paddingTop: normalize(16), paddingHorizontal: normalize(16)}}>
                <Header
                    onPress={() => navigation.goBack()}
                />
                <Gap marginBottom={normalize(34)}/>
                <SectionTittle
                    namePlace={data?.Nama}
                    detail_address={data?.Alamat}
                />
                <Gap marginBottom={normalize(16)}/>
                <Input
                    placeholder={'Search'}
                    left={false}
                    costumIcon={<Image source={require('assets/images/ic_search.png')} style={{width: normalize(24), height: normalize(24)}}/>}
                    value={inputSearch}
                    onChangeText={(val) => setInputSearch(val)}
                />
            </View>
            <ScrollView 
                onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        setShow(true)
                    }
                }}
                scrollEventThrottle={400}
            >
                <View style={{paddingTop: normalize(24), paddingHorizontal: normalize(16)}}>
                    <FlatList
                        numColumns={2}
                        data={dataKaryawan}
                        showsVerticalScrollIndicator={false}
                        renderItem={(({item, index}) => {
                            return (
                                <CardHairStylelist
                                    image={item?.foto}
                                    hairstylist_name={item?.Alias}
                                    hairstylist_sc={item?.jabatan}
                                    rating={item?.rating}
                                    ulasan={item?.jml_user}
                                    item={item}
                                    index={index}
                                />
                            )
                        })}
                        />
                </View>
            </ScrollView>
            <ModalConfirmOrder
                isVisible={modal}
                outlet={data?.Nama}
                distance={data?.Jarak}
                date={moment().format('YYYY-MM-DD')}
                onBackdropPress={() => setModal(false)}
                onSwipeComplete={() => setModal(false)}
                onPress={() => handleInputOrder()}
            />
            {show &&
            <View style={{paddingHorizontal: normalize(16), height: normalize(84), justifyContent: 'center'}}>
                <Button
                    tittle={'Pesan Sekarang'}
                    onPress={() => setModal(true)}
                />
            </View>
            }
        </Container>
    )
}

function SectionTittle ({
    namePlace = 'Malang Tows Square',
    detail_address = 'Malang Town Square, Blok GE 2 No. 1, Malang'
}) {
    return (
        <>
            <Text style={stylesFonts.Subtittle_1_Bold}>{namePlace}</Text>
            <Gap marginBottom={normalize(6)}/>
            <View style={justifyContent.flex_start}>
                <MaterialIcons name="location-pin" size={18} color={colors.grey} style={{marginRight: normalize(4)}} />
                <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>{detail_address}</Text>
            </View>
        </>
    )
}

export default DetailNearest

const styles = StyleSheet.create({
    
})