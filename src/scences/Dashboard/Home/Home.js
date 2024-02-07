import { useFocusEffect } from "@react-navigation/native"
import { CardImage, CardTransaction, Container, Gap, HeaderProfile, HeaderSection, ModalCompleteProfile, ModalPopUpRating, ModalPromoBirthday } from "components/global"
import { Nontification, statusDashboard } from "helper/FunctionGlobal"
import { currencyFloat } from "helper"
import { storage } from "helper/storage"
import moment from "moment"
import React, { useEffect, useRef, useState } from "react"
import { Dimensions, FlatList, Image, ImageBackground, InteractionManager, Linking, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import normalize from "react-native-normalize"
import WebView from "react-native-webview"
import mySalon from "utils/MySalonUtils"
import { colors, fonts, justifyContent, radius, stylesFonts } from "utils/index"
import { FontAwesome5 } from "@expo/vector-icons"

const { width: SCREEN_WIDTH } = Dimensions.get('window')

let image_banner = [
    {
        id: 1,
        img: 'https://msi.mysalon.id/images-slide/silver_senin.png'
    },
    {
        id: 2,
        img: 'https://msi.mysalon.id/images-slide/silver_selasa.png'
    },
    {
        id: 3,
        img: 'https://msi.mysalon.id/images-slide/silver_rabu.png'
    },
    {
        id: 4,
        img: 'https://msi.mysalon.id/images-slide/silver_kamis.png'
    },
    {
        id: 5,
        img: 'https://msi.mysalon.id/images-slide/silver_jumat.png'
    },
    {
        id: 6,
        img: 'https://msi.mysalon.id/images-slide/gold_member.png'
    },
    {
        id: 7,
        img: 'https://msi.mysalon.id/images-slide/platinum_member.png'
    },
]

function Home({ navigation }) {

    const [isLoading, setIsLoading] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [dataMember, setDataMember] = useState([])
    const [dataTransaction, setDataTransaction] = useState([])
    const [dataRating, setDataRating] = useState([])
    const [modalRating, setModalRating] = useState(false)
    const [modalProfile, setModalProfile] = useState(false)
    const [modalBirthDay, setModalBirthDay] = useState(false)

    const storePhoneNumber = storage.getString("storePhoneNumber")

    const getDashboardMember = async () => {

        let params = {
            hpUser: storePhoneNumber
        }

        const res = await mySalon.DashboardMember(params)

        if (statusDashboard.includes(res.status)) {
            if (res?.NamaMember === "NONAME") {
                setModalProfile(true)
            }
            else if (res?.emailMember === null) {
                setModalProfile(true)
            }
            else if (res?.TanggalLahir == null) {
                setModalProfile(true)
            }
            setDataMember(res)
            storage.setString("storeNomorMember", res.NoMember)
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
        else if (res.status !== 201) {
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

    const handleOpenWa = () => {

        let params = {
            number_phone: dataMember?.waCS?.substr(1)
        }

        Linking.openURL(`whatsapp://send?phone=+62${params.number_phone}`)
        .then(() => {

        })
        .catch(err => {
            Nontification("Pastikan Wa anda sudah terinstall di hp")
        })
    } 

    const getPopUpBirthDays = async () => {
        let params = {
            hpUser: storePhoneNumber
        }

        const res = await mySalon.DashboardMember(params)

        if (statusDashboard.includes(res.status)) {
            let tanggalLahir = res.TanggalLahir
            let birthDates = moment(tanggalLahir).startOf('days')
            let birthDatesAfter5Days = moment(tanggalLahir).add(6, 'days').startOf('days')
            let birthDatesBefore5Days = moment(tanggalLahir).subtract(6, 'days').startOf('days')

            let arrayBirthDatesNext = []
            let arrayBirthDatesBefore = []

            while(birthDates.add(1, 'days').diff(birthDatesAfter5Days) < 0) {
                arrayBirthDatesNext.push(birthDates.clone().format('YYYY-MM-DD'));
            }

            while(birthDatesBefore5Days.add(1, 'days').diff(birthDates) < 0) {
                arrayBirthDatesBefore.push(birthDatesBefore5Days.clone().format('YYYY-MM-DD'));
            }

            for (let i = 0; i < arrayBirthDatesBefore.length ; i++) {
                if (moment(arrayBirthDatesBefore[i]).isSame(moment().format('YYYY-MM-DD'))) {
                    console.log(arrayBirthDatesBefore[i]);
                    setModalBirthDay(true)
                }
            }
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

    useEffect(() => {
        getCloseOrder()
        getPopUpBirthDays()
    }, [])

    const onRefresh = React.useCallback(() => {
        setIsLoading(true);
        getDashboardMember()
        getCloseOrder()
        getPopUpBirthDays()
        getTransactionHistory()
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
      }, []);

    let type_member = ["OK", "Non Member No Trx"]

    return (
        <Container backgroundColor={'white'}>
            {/* <View style={{paddingTop: normalize(16), paddingHorizontal: normalize(16)}}>
                <HeaderProfile
                    username={dataMember?.NamaMember}
                    photo={dataMember?.fotoFile}
                    adminNumber={dataMember?.waCS}
                />
            </View> */}
            <ScrollView 
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                }
            >
                <View style={{paddingTop: normalize(24), paddingHorizontal: normalize(16)}}>
                    {dataMember.NoMember !== "-1" &&
                    <CardImage
                        data={dataMember}
                        photo_member={dataMember?.fotoFile}
                        status_member={dataMember?.NamaKategoriMember}
                        type_member={dataMember?.StatusUser}
                        number_member={dataMember?.NoMember}
                        name_member={dataMember?.NamaMember}
                        phone_member={dataMember?.TelpMember}
                        tittle={dataMember.response === "OK" ? "Order Member" : "Order Non Member"}
                        onPress={() => {
                            if (type_member.includes(dataMember.response)) {
                                navigation.navigate('Nearest')
                            }
                            else {
                                Nontification("Anda Tidak bisa order dikarenakan Non Member No Trx")
                            }
                        }}
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
                    <SectionImageSlider
                    />
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
            <SectionWhatsapp
                onPress={() => handleOpenWa()}
            />
            {/* {type_member.includes(dataMember.response) &&
            <SectionCreateOrder
                tittle={dataMember.response === "OK" ? "Order Member" : "Order Non Member"}
                onPress={() => navigation.navigate('Nearest')}
            />
            } */}
            <ModalPromoBirthday
                isVisible={modalBirthDay}
                username={dataMember?.NamaMember}
                onBackdropPress={() => setModalBirthDay(false)}
                onPress={() => {
                    setModalBirthDay(false)
                    setTimeout(() => {
                        navigation.navigate('Nearest')
                    }, 500)
                }}
            />
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
                onBackdropPress={() => {
                    if (dataMember.response === "OK") {
                        Nontification("Wajib Melengkapi Profile")
                    }
                    else {
                        setModalProfile(false)
                    }
                }}
                onPress={() => {
                    navigation.navigate('AuthNavigation', {screen: 'FromUser', params: {data: dataMember}})
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

function SectionImageSlider () {

    const bannerRef = useRef()
    const [bannerIndex, setBannerIndex] = useState(0)

    useEffect(() => {
        let lenght = image_banner.length - 1

        const interval = setInterval(() => {
            if (bannerIndex == lenght) {
                setBannerIndex(0)
            }
            else {
              setBannerIndex(bannerIndex + 1 )
            }
            bannerRef.current?.scrollToIndex({ index: bannerIndex, animated: true });
        }, 2500)
        return () => clearInterval(interval)
    }, [bannerIndex])

    return (
        <View>
            <FlatList
                ref={bannerRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={image_banner}
                renderItem={(({item,index}) => {
                    return (
                        <Image source={{uri: item.img}} resizeMethod="scale" resizeMode="cover" style={{width: SCREEN_WIDTH / 1.15, height: normalize(270), marginRight: normalize(16)}}/>
                    )
                })}
                onScrollToIndexFailed={info => {
                    const wait = new Promise(resolve => setTimeout(resolve, 700));
                    wait.then(() => {
                        bannerRef.current?.scrollToIndex({ index: info.index, animated: true });
                    });
                }}
            />
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

function SectionWhatsapp ({onPress, tittle = 'Order'}) {
    return (
        <TouchableOpacity style={[styles.btnWa, justifyContent.view_center]} onPress={onPress}>
            <Image source={require('assets/images/ic_wa.png')} style={{width: normalize(32), height: normalize(32)}}/>
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
    },
    btnWa: {
        width: normalize(48),
        height: normalize(48),
        backgroundColor: 'white',
        elevation: 3,
        shadowColor: '#CCE3FF66',
        shadowRadius: 10,
        shadowOpacity: 1,
        shadowOffset: {width: 1, height: 1},
        borderRadius: normalize(48),
        position: 'absolute',
        right: normalize(16),
        bottom: normalize(25),
    }
})