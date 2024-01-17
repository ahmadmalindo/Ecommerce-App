import { CardNearest, CardTransaction, Container, Gap, HeaderProfile, HeaderSection, Input } from "components/global"
import { Nontification } from "helper"
import { currencyFloat } from "helper"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { FlatList, Image, ImageBackground, InteractionManager, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import normalize from "react-native-normalize"
import mySalon from "utils/MySalonUtils"
import { colors, fonts, justifyContent, radius, stylesFonts } from "utils/index"
import * as Location from 'expo-location';
import { useFocusEffect } from "@react-navigation/native"
import { storage } from "helper/storage"

function Artwork({ navigation }) {

    const [inputSearch, setInputSearch] = useState("")
    const [dataNearest, setDataNearest] = useState([])
    const [dataMember, setDataMember] = useState([])
    const [location, setLocation] = useState(null);

    const storePhoneNumber = storage.getString("storePhoneNumber")

    const getDashboardMember = async () => {

        let params = {
            hpUser: storePhoneNumber
        }

        const res = await mySalon.DashboardMember(params)

        if (res.status === 200) {
            setDataMember(res)
        }
        else {
            Nontification(res.response)
        }
    }

    const getNearestOutlet = async () => {

        let params = {
            latUser : location?.coords?.latitude,
            longUser :location?.coords?.longitude,
            stringCari : inputSearch
        }

        const res = await mySalon.NearestOutlet(params)

        if (res.status === 200) {
            setDataNearest(res.responsedata);
        }
        else {
            Nontification(res.response)
        }
    }

    useEffect(() => {
        (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Nontification('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        })();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {
            getDashboardMember()
            getNearestOutlet()
          });
      
          return () => task.cancel();
        }, [navigation])
    );

    return (
        <Container backgroundColor={'white'}>
            <View style={{paddingTop: normalize(16), paddingHorizontal: normalize(16)}}>
                <HeaderProfile
                    username={dataMember?.NamaMember}
                    photo={dataMember?.fotoFile}
                    adminNumber={dataMember?.waCS}
                />
            </View>
            <ScrollView>
                <View style={{paddingTop: normalize(24), paddingHorizontal: normalize(16)}}>
                    <Input
                        placeholder={'Search'}
                        left={false}
                        costumIcon={<Image source={require('assets/images/ic_search.png')} style={{width: normalize(24), height: normalize(24)}}/>}
                        value={inputSearch}
                        onChangeText={(val) => {
                            if (inputSearch.length > 1) {
                                setTimeout(() => {
                                    getNearestOutlet()
                                }, 1000)
                            }
                            else if (inputSearch.length  < 2) {
                                setTimeout(() => {
                                    getNearestOutlet()
                                }, 1000)
                            }
                            setInputSearch(val)
                        }}
                    />
                    <Gap marginBottom={normalize(24)}/>
                    <FlatList
                        data={dataNearest}
                        renderItem={(({item,index}) => {
                            return (
                                <CardNearest
                                    distance={item?.Jarak}
                                    namePlace={item?.Nama}
                                    detail_address={item?.Alamat}
                                    item={item}
                                    index={index}
                                    onPress={() => {
                                        navigation.navigate('DetailArtwork', {id: item.nKode, data: item})
                                        setInputSearch("")
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

function SectionList ({
    item,
    tittle = 'Promo Akhir Tahun 12.12',
    desc = 'Segera pesan di outlet terdekat denganmu!',
    time = moment().format('LT'),
    onPress
}) {
    return (
        <TouchableOpacity style={[styles.viewCard, justifyContent.space_beetwen, {backgroundColor: item.isRead ? colors.secondary_2 : 'white', borderColor: item.isRead ? colors.primary : colors.grey_2}]} onPress={onPress}>
            <Image source={item.isRead ? require('assets/images/ic_notif_fill.png') : require('assets/images/ic_notif.png')} style={[styles.icon, {marginRight: normalize(12)}]}/>
            <View style={{width: '65%'}}>
                <Text style={stylesFonts.Subtittle_2_Bold}>{tittle}</Text>
                <Text style={stylesFonts.Subtittle_2_Regular} numberOfLines={1}>{desc}</Text>
            </View>
            <Text style={stylesFonts.Subtittle_2_Regular} numberOfLines={1}>{time}</Text>
        </TouchableOpacity>
    )
}

export default Artwork

const styles = StyleSheet.create({
    viewCard: {
        width: '100%',
        height: normalize(70),
        borderRadius: radius.r_16,
        padding: radius.r_16,
        backgroundColor: colors.secondary_2,
        borderWidth: 1,
        borderColor: colors.primary,
        marginBottom: normalize(16),
        paddingHorizontal: normalize(16)
    },
    icon: {
        width: normalize(50),
        height: normalize(50)
    }
})