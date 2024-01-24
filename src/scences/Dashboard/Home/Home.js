import { useFocusEffect } from "@react-navigation/native"
import { CardImage, CardTransaction, Container, Gap, HeaderProfile, HeaderSection, ModalCompleteProfile, ModalPopUpRating } from "components/global"
import { Nontification, statusDashboard } from "helper/FunctionGlobal"
import { currencyFloat } from "helper"
import { storage } from "helper/storage"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { FlatList, Image, ImageBackground, InteractionManager, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import normalize from "react-native-normalize"
import WebView from "react-native-webview"
import mySalon from "utils/MySalonUtils"
import { colors, fonts, justifyContent, radius, stylesFonts } from "utils/index"

function Home({ navigation }) {

    const [selectedIndex, setSelectedIndex] = useState(null)
    const [dataMember, setDataMember] = useState([])
    const [dataTransaction, setDataTransaction] = useState([])
    const [dataRating, setDataRating] = useState([])
    const [modalRating, setModalRating] = useState(false)
    const [modalProfile, setModalProfile] = useState(false)

    const storePhoneNumber = storage.getString("storePhoneNumber")

    const getDashboardMember = async () => {

        let params = {
            hpUser: storePhoneNumber
        }

        const res = await mySalon.DashboardMember(params)

        if (statusDashboard.includes(res.status)) {
            if (res?.NamaMember === "NONAME" || res?.emailMember === null) {
                setModalProfile(true)
            }
            setDataMember(res)
            storage.getString("storeNomorMember", res.NoMember)
        }
        else {
            Nontification(res.response)
        }
    }

    const getTransactionHistory = async () => {
        const res = await mySalon.TransactionHistory({NoHP: storePhoneNumber})

        if (statusDashboard.includes(res.status)) {
            if (res?.responsedata !== undefined) {
                setDataTransaction(res.responsedata)
            }
        }
        else {
            Nontification(res.response)
        }
    }

    const getCloseOrder = async () => {
        const res = await mySalon.CloseOrder({NoHP: storePhoneNumber})

        if (res.status === 200) {
            setModalRating(true)
            setDataRating(res)
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

    useEffect(() => {
        getCloseOrder()
    }, [])

    let type_member = ["OK", "Non Member No Trx"]

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
                    {dataMember.NoMember !== "-1" &&
                    <CardImage
                        status_member={dataMember?.NamaKategoriMember}
                        type_member={dataMember?.StatusUser}
                        number_member={dataMember?.NoMember}
                        name_member={dataMember?.NamaMember}
                        phone_member={dataMember?.TelpMember}
                    />
                    }
                    {dataMember.NoMember !== "-1" &&
                    <>
                        <Gap marginBottom={normalize(16)}/>
                        <SectionInfo 
                            // html={dataMember?.NotifLevelUP}
                            status_member={dataMember?.NotifLevelUPuser}
                            minimum_transaction={dataMember?.NotifLevelUPtransaction_price}
                            due_date={dataMember?.NotifLevelUPtransaction_due}
                        />
                    </>
                    }
                    <Gap marginBottom={normalize(16)}/>
                    <Image source={require('assets/images/ic_cardPromo.png')} resizeMethod="scale" resizeMode="contain" style={{width: '100%', height: normalize(158)}}/>
                    <Gap marginBottom={normalize(16)}/>
                    <HeaderSection
                        tittle={'Transaksi Terakhir'}
                        more={'Lihat Semua'}
                        onPress={() => navigation.navigate('MoreTransaction')}
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
            {type_member.includes(dataMember.response) &&
            <SectionCreateOrder
                tittle={dataMember.response === "OK" ? "Order Member" : "Order Non Member"}
                onPress={() => navigation.navigate('Nearest')}
            />
            }
            <SectionModalPopUpRating
                dataRating={dataRating}
                modalRating={modalRating}
                setModalRating={setModalRating}
                onPress={() => {
                    navigation.navigate('Rating', {data: dataRating})
                    setModalRating(false)
                }}
            />
            <ModalCompleteProfile
                isVisible={modalProfile}
                onBackdropPress={() => setModalProfile(false)}
                onPress={() => {
                    navigation.navigate('EditProfile', {data: dataMember})
                    setModalProfile(false)
                }}
            />
        </Container>
    )
}

function SectionInfo({
    html = '',
    status_member = '',
    minimum_transaction = 0,
    due_date= ''
}) {

    return (
        <View style={[styles.viewInfo, justifyContent.view_center]}>
            {/* <WebView
                originWhitelist={["*"]}
                source={{
                    html: 
                    `<html><body style="background-color:transparent;">${html}</body></html>`
                }}
                style={{width: normalize(250),height:normalize(200), backgroundColor: 'transparent'}}
            /> */}
            <Text style={[stylesFonts.Overline, {textAlign: 'center'}]}>
                Naikkan level anda ke <Text style={{fontFamily: fonts.bold}}>{status_member}</Text> dengan transaksi <Text style={{fontFamily: fonts.bold}}>Rp {minimum_transaction}</Text> sebelum  <Text style={{fontFamily: fonts.bold}}>{due_date}</Text>
            </Text>
        </View>
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

function SectionCreateOrder ({onPress, tittle = 'Order'}) {
    return (
        <TouchableOpacity style={[styles.viewOrder, justifyContent.center]} onPress={onPress}>
            <Image source={require('assets/images/ic_gunting.png')} style={{width: normalize(24), height: normalize(24), marginRight: normalize(6)}}/>
            <Text style={[stylesFonts.Body_1_Bold, {color: 'white'}]}>{tittle}</Text>
        </TouchableOpacity>
    )
}

function SectionModalPopUpRating ({
    modalRating,
    setModalRating,
    dataRating,
    onPress
}) {

    
    const [time, setTime] = useState(0);

    useEffect(() => {
        let timerIdIOS = setInterval(() => {
            if (time > 0) {
                setTime(time - 1)
            }

            if (time == 0) {
                clearInterval(timerIdIOS)
            }
        }, 1000);

        return () => {
            clearInterval(timerIdIOS)
            if (time === 1) {
                if (!modalRating) {
                    setModalRating(true)
                }
            }
        };
    }, [time])


    return (
        <ModalPopUpRating
            isVisible={modalRating}
            date={dataRating.Tanggal}
            onBackdropPress={() => {
                setModalRating(false)
                setTime(180)
            }}
            onPress={() => {
                onPress()
                setTime(180)
            }}
        />
    )
}

export default Home

const styles = StyleSheet.create({
    icBg: {
        width: '100%',
        height: normalize(160),
        borderRadius: radius.r_16
    },
    viewInfo: {
        width: '100%',
        height: normalize(48),
        backgroundColor: colors.orange,
        borderRadius: radius.r_10,
        paddingHorizontal: normalize(34)
    },
    viewOrder: {
        minWidth: normalize(127),
        height: normalize(48),
        backgroundColor: colors.primary,
        borderRadius: normalize(100),
        position: 'absolute',
        right: normalize(16),
        bottom: normalize(25),
        paddingHorizontal: normalize(16)
    }
})