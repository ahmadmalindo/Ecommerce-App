import { CardNearest, CardTransaction, Container, Gap, Header, HeaderProfile, HeaderSection, Input } from "components/global"
import { Nontification } from "helper"
import { currencyFloat } from "helper"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { FlatList, Image, ImageBackground, InteractionManager, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import normalize from "react-native-normalize"
import { colors, fonts, justifyContent, radius, stylesFonts } from "utils/index"
import * as Location from 'expo-location';
import { useFocusEffect, useIsFocused } from "@react-navigation/native"
import mySalon from "utils/MySalonUtils"

function Nearest({ navigation }) {

    let minimum_distance = 0.15

    const focused = useIsFocused()

    const [inputSearch, setInputSearch] = useState("")
    const [dataNearest, setDataNearest] = useState([])

    const getNearestOutlet = async (location) => {

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
        getNearestOutlet(location);
        })();
    }, []);

    return (
        <Container backgroundColor={'white'}>
            <View style={{paddingTop: normalize(16), paddingHorizontal: normalize(16)}}>
                <Header
                    tittle={'Nearest'}
                    onPress={() => navigation.goBack()}
                />
                <Gap marginBottom={normalize(34)}/>
                <Input
                    placeholder={'Search'}
                    left={false}
                    costumIcon={<Image source={require('assets/images/ic_search.png')} style={{width: normalize(24), height: normalize(24)}}/>}
                    value={inputSearch}
                    onChangeText={(val) => {
                        if (inputSearch.length > 1) {
                            getNearestOutlet()
                        }
                        else if (inputSearch.length  < 2) {
                            getNearestOutlet()

                        }
                        setInputSearch(val)
                    }}
                />
            </View>
            <ScrollView>
                <View style={{paddingTop: normalize(24), paddingHorizontal: normalize(16)}}>
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
                                        if (parseFloat(item.Jarak) <= minimum_distance) {
                                            navigation.navigate('DetailNearest', {id: item.nKode, data: item})
                                        }
                                        else {
                                           Nontification("Anda tidak dapat order karena melebihi jarak 0.15 km dari lokasi anda")
                                        }

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

export default Nearest

const styles = StyleSheet.create({
    
})