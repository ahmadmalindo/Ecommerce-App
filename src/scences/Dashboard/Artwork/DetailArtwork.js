import { MaterialIcons } from "@expo/vector-icons"
import { useFocusEffect } from "@react-navigation/native"
import { CardHairStylelist, CardNearest, CardTransaction, Container, Gap, Header, HeaderProfile, HeaderSection, Input, ModalConfirmOrder } from "components/global"
import { Nontification } from "helper"
import { currencyFloat } from "helper"
import { storage } from "helper/storage"
import moment from "moment"
import React, { useState } from "react"
import { Alert, FlatList, Image, ImageBackground, InteractionManager, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import normalize from "react-native-normalize"
import mySalon from "utils/MySalonUtils"
import { colors, fonts, justifyContent, radius, stylesFonts } from "utils/index"

function DetailArtwork({ navigation, route }) {

    const { id, data } = route.params

    const [inputSearch, setInputSearch] = useState("")
    const [dataKaryawan, setDataKaryawan] = useState([])

    const getKaryawanStanby = async () => {
        const res = await mySalon.KaryawanOutlet({nKodeOutlet: id})

        if (res.status === 200) {
            setDataKaryawan(res.responsedata)
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
            <ScrollView>
                <View style={{paddingTop: normalize(24), paddingHorizontal: normalize(16)}}>
                    <FlatList
                        numColumns={2}
                        data={dataKaryawan}
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
                                    onPress={() => {
                                        navigation.navigate('DetailHairStyler', {id: item?.NIK, data: item})
                                    }}
                                />
                            )
                        })}
                    />
                </View>
            </ScrollView>
        </Container>
    )
}

function SectionTittle ({
    namePlace = '',
    detail_address = ''
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

export default DetailArtwork

const styles = StyleSheet.create({
    
})