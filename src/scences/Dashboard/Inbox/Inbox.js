import { useFocusEffect } from "@react-navigation/native"
import { CardTransaction, Container, Gap, HeaderProfile, HeaderSection, Input, ModalInbox } from "components/global"
import { Nontification, statusDashboard } from "helper/FunctionGlobal"
import { currencyFloat } from "helper"
import { storage } from "helper/storage"
import moment from "moment"
import React, { useState } from "react"
import { FlatList, Image, ImageBackground, InteractionManager, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import normalize from "react-native-normalize"
import mySalon from "utils/MySalonUtils"
import { colors, fonts, justifyContent, radius, stylesFonts } from "utils/index"

function Inbox({ navigation }) {

    const [inputSearch, setInputSearch] = useState("")
    const [dataMember, setDataMember] = useState([])
    const [dataInbox, setDataInbox] = useState([])
    const [modal, setModal] = useState(false)
    const [selectInbox, setSelectInbox] = useState("")

    const storePhoneNumber = storage.getString("storePhoneNumber")

    const getDashboardMember = async () => {

        let params = {
            hpUser: storePhoneNumber
        }

        const res = await mySalon.DashboardMember(params)

        if (statusDashboard.includes(res.status)) {
            setDataMember(res)
        }
        else {
            Nontification(res.response)
        }
    }

    const getInbox = async () => {
        const res = await mySalon.Inbox({NoHP: storage.getString('storePhoneNumber')})

        if (res.status === 200) {
            setDataInbox(res.responsedata)
        }
        else {
            Nontification(res.response)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {
            getDashboardMember()
            getInbox()
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
                        onChangeText={(val) => setInputSearch(val)}
                    />
                    <Gap marginBottom={normalize(24)}/>
                    <HeaderSection tittle={'Pemberitahuan Terbaru'}/>
                    <Gap marginBottom={normalize(24)}/>
                    <FlatList
                        data={dataInbox}
                        renderItem={(({item}) => {
                            let jam= item?.Hari?.split(" ")

                            return (
                                <SectionList
                                    tittle={item?.Judul}
                                    desc={item?.Deskripsi}
                                    time={jam[3]}
                                    item={item}
                                    onPress={() => {
                                        console.log(item);
                                        setSelectInbox(item)
                                        setModal(true)
                                    }}
                                />
                            )
                        })}
                    />
                </View>
            </ScrollView>
            <ModalInbox
                isVisible={modal}
                onBackdropPress={() => setModal(false)}
                tittle={selectInbox?.Judul}
                detail_message={selectInbox?.Deskripsi}
            />
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

export default Inbox

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