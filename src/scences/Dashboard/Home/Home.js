import { useFocusEffect } from "@react-navigation/native"
import { CardTransaction, Container, Gap, HeaderProfile, HeaderSection } from "components/global"
import { Nontification } from "helper"
import { currencyFloat } from "helper"
import { storage } from "helper/storage"
import moment from "moment"
import React, { useState } from "react"
import { FlatList, Image, ImageBackground, InteractionManager, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import normalize from "react-native-normalize"
import WebView from "react-native-webview"
import mySalon from "utils/MySalonUtils"
import { colors, fonts, justifyContent, radius, stylesFonts } from "utils/index"

function Home({ navigation }) {

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

    const getTransactionHistory = async () => {
        const res = await mySalon.TransactionHistory({NoHP: storePhoneNumber})

        if (res.status === 200) {
            setDataTransaction(res.responsedata)
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
                <HeaderProfile
                    username={dataMember?.NamaMember}
                    photo={dataMember?.fotoFile}
                    adminNumber={dataMember?.waCS}
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{paddingTop: normalize(24), paddingHorizontal: normalize(16)}}>
                    <SectionCard
                        status_member={dataMember?.NamaKategoriMember}
                        type_member={dataMember?.StatusUser}
                        number_member={dataMember?.NoMember}
                        name_member={dataMember?.NamaMember}
                        phone_member={dataMember?.TelpMember}
                    />
                    <Gap marginBottom={normalize(16)}/>
                    <SectionInfo 
                        html={dataMember?.NotifLevelUP}
                        // status_member={member[5]}
                        // minimum_transaction={member[8]}
                        // due_date={member[9]}
                    />
                    <Gap marginBottom={normalize(16)}/>
                    <Image source={require('assets/images/ic_cardPromo.png')} resizeMethod="scale" resizeMode="contain" style={{width: '100%', height: normalize(158)}}/>
                    <Gap marginBottom={normalize(16)}/>
                    <HeaderSection
                        tittle={'Transaksi Terakhir'}
                        more={'Lihat Semua'}
                    />
                    <Gap marginBottom={normalize(16)}/>
                    <SectionList
                        data={dataTransaction}
                        navigation={navigation}
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                        onCancelTransaction={(item) => handleCancelTransaction()}
                    />
                </View>
            </ScrollView>
            <SectionCreateOrder
                onPress={() => navigation.navigate('Nearest')}
            />
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

function SectionInfo({
    html = '',
    status_member = 'GOLD MEMBER',
    minimum_transaction = 2945000,
    due_date= '2024-05-31'
}) {

    return (
        <View style={[styles.viewInfo, justifyContent.view_center]}>
            <WebView
                originWhitelist={["*"]}
                source={{
                    html: 
                    `<html><body style="background-color:transparent;">${html}</body></html>`
                }}
                style={{width: normalize(250),height:normalize(200), backgroundColor: 'transparent'}}
            />
            {/* <Text style={[stylesFonts.Overline, {textAlign: 'center'}]}>
                Naikkan level anda ke <Text style={{fontFamily: fonts.bold}}>{status_member}</Text> dengan transaksi <Text style={{fontFamily: fonts.bold}}>Rp {minimum_transaction}</Text> sebelum  <Text style={{fontFamily: fonts.bold}}>{moment(due_date).format('DD-MM-YYYY')}</Text>
            </Text> */}
        </View>
    )
}

function SectionList ({
    navigation,
    data,
    selectedIndex,
    setSelectedIndex,
    onCancelTransaction
}) {

    return (
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
                                navigation.navigate('DetailReceipt', {id: item.Kode})
                            }
                            else {
                                onCancelTransaction(item)
                            }
                        }}
                    />
                )
            })}
        />
    )
}

function SectionCreateOrder ({onPress}) {
    return (
        <TouchableOpacity style={[styles.viewOrder, justifyContent.center]} onPress={onPress}>
            <Image source={require('assets/images/ic_gunting.png')} style={{width: normalize(24), height: normalize(24), marginRight: normalize(6)}}/>
            <Text style={[stylesFonts.Body_1_Bold, {color: 'white'}]}>Order</Text>
        </TouchableOpacity>
    )
}

export default Home

const styles = StyleSheet.create({
    icBg: {
        width: '100%',
        height: normalize(160),
        borderRadius: radius.r_16
    },
    viewCardMember: {
        width: normalize(94),
        height: normalize(21),
        backgroundColor: '#FFFFFF33',
        borderRadius: normalize(5),
    },
    viewInfo: {
        width: '100%',
        height: normalize(48),
        backgroundColor: colors.orange,
        borderRadius: radius.r_10,
        paddingHorizontal: normalize(34)
    },
    viewOrder: {
        width: normalize(127),
        height: normalize(48),
        backgroundColor: colors.primary,
        borderRadius: normalize(100),
        position: 'absolute',
        right: normalize(16),
        bottom: normalize(16)
    }
})