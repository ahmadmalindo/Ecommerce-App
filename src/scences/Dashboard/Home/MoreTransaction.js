import { CardImage2, CardNearest, CardTransaction, Container, Gap, Header, HeaderProfile, HeaderSection, Input, ModalBenefitMember } from "components/global"
import { Nontification } from "helper"
import { currencyFloat } from "helper"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { Dimensions, FlatList, Image, ImageBackground, InteractionManager, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import normalize from "react-native-normalize"
import { colors, fonts, justifyContent, radius, stylesFonts } from "utils/index"
import * as Location from 'expo-location';
import { useFocusEffect } from "@react-navigation/native"
import mySalon from "utils/MySalonUtils"
import { storage } from "helper/storage"
import { statusDashboard } from "helper/FunctionGlobal"

const { width: SCREEN_WIDTH } = Dimensions.get("window")

function MoreTransaction({ navigation }) {

    const [selectedIndex, setSelectedIndex] = useState(null)
    const [dataMember, setDataMember] = useState([])
    const [dataMemberSummary, setDataMemberSummary] = useState([])
    const [dataTransaction, setDataTransaction] = useState([])
    const [dataBenefitMember, setDataBenefitMember] = useState([])
    const [modal, setModal] = useState(false)
    const [selectCard, setSelectCard] = useState()

    const storePhoneNumber = storage.getString("storePhoneNumber")

    const getDashboardMember = async () => {

        let params = {
            hpUser: storePhoneNumber
        }

        const res = await mySalon.DashboardMember(params)

        if (statusDashboard.includes(res.status)) {
            setDataMember(res)
            getBenefitMember(res)
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

        if (statusDashboard.includes(res.status)) {
            if (res?.responsedata !== undefined) {
                setDataTransaction(res.responsedata)
            }
        }
        else {
            Nontification(res.response)
        }
    }

    const getSummaryTransactionHistory = async () => {
        const res = await mySalon.SummaryHistoryTrx({NoHP: storePhoneNumber})

        if (statusDashboard.includes(res.status)) {
            setDataMemberSummary(res)
        }
        else {
            Nontification(res.response)
        }
    }

    const getBenefitMember = async (data_member) => {

        const res = await mySalon.BenefitMember({levelMember: 'SILVER'})

        if (res.status === 200) {
            let data = res?.responsedata?.map((x,i) => {
                return ({
                    ...x, 
                    image: i + 1 === 1 ? require('assets/images/ic_content_card_1.png') : i + 1 === 2 ? require('assets/images/ic_content_card_2.png') : require('assets/images/ic_content_card_3.png'),
                    id_type: i + 1
                })
            })

            let final_data = []

            if (data_member?.NamaKategoriMember === "SILVER MEMBER" ) {
                final_data = data
            }
            else if (data_member?.NamaKategoriMember === "GOLD MEMBER") {
                final_data = data?.splice(1)
            }
            else if (data_member?.NamaKategoriMember === "PLATINUM MEMBER") {
                final_data = data?.splice(2)
            }

            setDataBenefitMember(final_data)
        }
        else {
            Nontification(res.response)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {
            getDashboardMember()
            getSummaryTransactionHistory()
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
                    {/* {dataMember.NoMember !== "-1" && */}
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={dataBenefitMember}
                        renderItem={(({item, index}) => {
                            return (
                                <View style={{width: SCREEN_WIDTH / 3.4, marginRight: normalize(6) }}>
                                    <CardImage2
                                        index={index}
                                        item={item}
                                        source={item.image}
                                        number_member={dataMemberSummary?.NoMember}
                                        name_member={dataMemberSummary?.jumlahNaikGold}
                                        phone_member={dataMemberSummary?.saveTransaksi}
                                        onPress={() => {
                                            setSelectCard(item)
                                            setModal(true)
                                        }}
                                    />
                                </View>
                            )
                        })}
                    />
                    {/* } */}
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
            <ModalBenefitMember
                isVisible={modal}
                onBackdropPress={() => setModal(false)}
                tittle={selectCard?.title}
                benefits={selectCard?.message_1}
                detail_message={selectCard?.message_2}
                detail_message_2={selectCard?.message_2}
                detail_message_3={selectCard?.message_3}
                detail_message_4={selectCard?.message_4}
                detail_message_5={selectCard?.message_5}
                detail_message_6={selectCard?.message_6}
                detail_message_7={selectCard?.message_7}
            />
        </Container>
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