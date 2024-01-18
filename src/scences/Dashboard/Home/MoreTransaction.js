import { CardNearest, CardTransaction, Container, Gap, Header, HeaderProfile, HeaderSection, Input } from "components/global"
import { Nontification } from "helper"
import { currencyFloat } from "helper"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { FlatList, Image, ImageBackground, InteractionManager, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import normalize from "react-native-normalize"
import { colors, fonts, justifyContent, radius, stylesFonts } from "utils/index"
import * as Location from 'expo-location';
import { useFocusEffect } from "@react-navigation/native"
import mySalon from "utils/MySalonUtils"
import { storage } from "helper/storage"

function MoreTransaction({ navigation }) {

    const [selectedIndex, setSelectedIndex] = useState(null)
    const [dataMember, setDataMember] = useState([])
    const [dataTransaction, setDataTransaction] = useState([])

    const storePhoneNumber = storage.getString("storePhoneNumber")

    const getDashboardMember = async () => {

        let params = {
            hpUser: storePhoneNumber
        }

        const res = await mySalon.DashboardMember(params)

        if (res.status === 200) {
            setDataMember(res)
            storage.getString("storeNomorMember", res.NoMember)
        }
        else {
            Nontification(res.response)
        }
    }

    const handleCancelTransaction = async () => {
        const res = await mySalon.OrderCancel({NoMember: storage.getString("storeNomorMember")})

        if (res.status === 200) {
            getTransactionHistory()
        }
        else {
            Nontification(res)
        }
    }

    const getTransactionHistory = async () => {
        const res = await mySalon.TransactionHistory({NoHP: storePhoneNumber})

        if (res.status === 200) {
            setDataTransaction(res.responsedata)
        }
        else {
            Nontification(res.response)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {
            getDashboardMember()
            getTransactionHistory()
          });
      
          return () => task.cancel();
        }, [navigation])
    );

    return (
        <Container backgroundColor={'white'}>
            <View style={{paddingTop: normalize(16), paddingHorizontal: normalize(16)}}>
                <Header
                    tittle={'Riwayat Transaksi'}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <ScrollView>
                <View style={{paddingTop: normalize(24), paddingHorizontal: normalize(16)}}>
                    <SectionCard
                        status_member={dataMember?.NamaKategoriMember}
                        type_member={dataMember?.StatusUser}
                        number_member={dataMember?.NoMember}
                        name_member={dataMember?.NamaMember}
                        phone_member={dataMember?.TelpMember}
                    />
                    <Gap marginBottom={normalize(16)}/>
                    <SectionList
                        dataMember={dataMember}
                        data={dataTransaction}
                        navigation={navigation}
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                        onCancelTransaction={(item) => handleCancelTransaction()}
                    />
                </View>
            </ScrollView>
        </Container>
    )
}

function SectionCard ({
    status_member = 'SILVER MEMBER',
    type_member = 'VIP',
    number_member = '0109 2409 0000 1009',
    name_member = 'ALYCIA GENOSVEVA',
    phone_member = '085123456789'
}) {
    return (
        <ImageBackground source={require('assets/images/ic_content_card.png')} style={styles.icBg}>
            <View style={{width: '100%', height: normalize(160), padding: normalize(16)}}>
                <View style={justifyContent.space_beetwen}>
                    <View style={[styles.viewCardMember, justifyContent.view_center]}>
                        <Text style={[stylesFonts.Overline, {color: 'white'}]}>{status_member}</Text>
                    </View>
                    <View style={justifyContent.flex_start}>
                        <Image source={require('assets/images/ic_star.png')} style={{width: normalize(16), height: normalize(16), marginRight: normalize(4)}}/>
                        <Text style={[stylesFonts.Subtittle_2_Bold, {color: 'white'}]}>{type_member}</Text>
                    </View>
                </View>
                <Gap marginBottom={normalize(16)}/>
                <View>
                    <Text style={[stylesFonts.Subtittle_1_SemiBold, {color: 'white'}]}>{number_member}</Text>
                    <Gap marginBottom={normalize(8)}/>
                    <Text style={[stylesFonts.Body_2_Medium, {color: 'white'}]}>{name_member}</Text>
                </View>
                <Gap marginBottom={normalize(16)}/>
                <View style={{alignItems: 'flex-end'}}> 
                    <Text style={[stylesFonts.Body_2_SemiBold, {color: 'white'}]}>{phone_member}</Text>
                </View>
            </View>
        </ImageBackground>
    )
}

function SectionList ({
    navigation,
    dataMember,
    data,
    selectedIndex,
    setSelectedIndex,
    onCancelTransaction
}) {

    return (
        <>
            {data.length > 0 ?
            <FlatList
                data={data}
                renderItem={(({item,index}) => {

                    let pembayaran = item?.Pembayaran?.split("/")

                    return (
                        <CardTransaction
                            placeName={item.NamaCabang}
                            date={item.Tanggal}
                            payment_methods={pembayaran[0]}
                            payment={pembayaran[1]}
                            receipt_number={item.Struk}
                            item={item}
                            index={index}
                            selectedIndex={selectedIndex}
                            onPress={() => {
                                if (item.status !== "cancel") {
                                    if(selectedIndex === index) {
                                        setSelectedIndex(null)
                                    }
                                    else {
                                        setSelectedIndex(index)
                                    }
                                }
                            }}
                            onPressAction={() => {
                                if (item.Struk !== "-1") {
                                    item.username = dataMember?.NamaMember
                                    navigation.navigate('DetailReceipt', {id: item.Kode, kode_cabang: item.KodeCabang, data: item})
                                }
                                else {
                                    onCancelTransaction(item)
                                }
                            }}
                        />
                    )
                })}
            />
            :
            <View style={{alignItems: 'center'}}>
                <Image source={require('assets/images/ic_no_data.png')} style={{width: '100%', height: normalize(267)}}/>
                <Gap marginBottom={normalize(16)}/>
                <Text style={stylesFonts.Heading_3}>Tidak ada data</Text>
                <Gap marginBottom={normalize(16)}/>
                <Text style={[stylesFonts.Body_2_Bold, {width: '70%', textAlign: 'center', color: colors.grey}]}>Anda belum memiliki riwayat transaksi silahkan lakukan transaksi terlebih dahulu</Text>
            </View>
            }
        </>
    )
}

export default MoreTransaction

const styles = StyleSheet.create({
    
})