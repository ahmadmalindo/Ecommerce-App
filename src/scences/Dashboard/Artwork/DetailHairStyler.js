import { MaterialIcons } from "@expo/vector-icons"
import { useFocusEffect } from "@react-navigation/native"
import { Button, CardHairStylelist, CardNearest, CardTransaction, Container, Gap, Header, HeaderProfile, HeaderSection, Input, ModalConfirmOrder } from "components/global"
import { BlurView } from "expo-blur"
import { Nontification } from "helper"
import { currencyFloat } from "helper"
import { storage } from "helper/storage"
import moment from "moment"
import React, { useState } from "react"
import { Alert, FlatList, Image, ImageBackground, InteractionManager, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import normalize from "react-native-normalize"
import mySalon from "utils/MySalonUtils"
import { colors, fonts, justifyContent, radius, stylesFonts } from "utils/index"

function DetailHairStyler({ navigation, route }) {

    const { id } = route.params

    const [dataArtwork, setDataArtWork] = useState([])

    const getKarywanArtworksView = async () => {
        const res = await mySalon.KarywanArtworksView({nNIK: id})

        if (res.status === 200) {
            setDataArtWork(res.responsedata)
        }
        else {
            Nontification(res.response)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {
            getKarywanArtworksView()
          });
      
          return () => task.cancel();
        }, [navigation])
    );

    return (
        <Container backgroundColor={'white'}>
            <View style={{paddingTop: normalize(16), paddingHorizontal: normalize(16)}}>
                <Header
                    share
                    onShare={() => Nontification("ini btn share")}
                    tittle={'Detail'}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <ScrollView>
                <View style={{paddingTop: normalize(36), paddingHorizontal: normalize(16)}}>
                    <Image source={require('assets/images/ic_banner.png')} style={{width: '100%', height: normalize(100), borderRadius: normalize(16)}}/>
                    <Gap marginBottom={normalize(16)}/>
                    <SectionProfile

                    />
                </View>
                <View>
                    <Gap marginBottom={normalize(16)}/>
                    <View style={{width: '100%',height: 1, backgroundColor: colors.grey_2}}/>
                    <Gap marginBottom={normalize(16)}/>
                    <FlatList
                        numColumns={3}
                        data={dataArtwork}
                        renderItem={(({item, index}) => {
                            return (
                                <SectionList
                                    item={item}
                                    index={index}
                                    onPress={() => navigation.navigate('DetailHasil')}
                                />
                            )
                        })}
                    />
                </View>
            </ScrollView>
        </Container>
    )
}

function SectionProfile ({
    photo,
    hairstylist_name = 'Cyndy Lillibridge',
    hairstylist_sc = 'CR',
    rating = '5.0',
    ulasan = '270',
    onPress
}) {
    return (
        <>
            <View style={justifyContent.flex_start}>
                <Image source={{uri: photo}} resizeMethod="scale" resizeMode="cover" style={{width: normalize(40), height: normalize(40), borderRadius: normalize(40),marginRight: normalize(12), backgroundColor: colors.grey_2}}/>
                <View>
                    <Text style={[stylesFonts.Body_1_Bold]}>{hairstylist_name}</Text>
                    <Gap marginBottom={normalize(4)}/>
                    <View style={justifyContent.flex_start}>
                        <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>{hairstylist_sc}</Text>
                        <Gap marginRight={normalize(6)}/>
                        <View style={{width:normalize(6),height: normalize(6), backgroundColor: colors.grey, borderRadius: normalize(6)}}/>
                        <Gap marginRight={normalize(6)}/>
                        <Image source={require('assets/images/ic_star.png')} style={{width: normalize(16), height: normalize(16)}}/>
                        <Gap marginRight={normalize(6)}/>
                        <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>{rating} ({ulasan})</Text>
                    </View>
                </View>
            </View>
            <Gap marginBottom={normalize(16)}/>
            <Button
                border
                tittle={'Lihat Ulasan'}
                onPress={onPress}
            />
        </>
    )
}

function SectionList ({
    tittle = 'Light Blonde',
    date = '01/09/2023',
    onPress
}) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <ImageBackground resizeMethod="scale" resizeMode="cover"  source={require('assets/images/ic_onboard.png')} style={{width: '100%', height: normalize(187)}}>
                <View style={{width: '100%', height: normalize(187), justifyContent: 'flex-end', alignItems: 'center'}}>
                    <BlurView intensity={80} tint="dark" style={{width: '100%', alignItems: 'center'}}>
                        <Text style={[stylesFonts.Body_2_Regular, {color: 'white'}]}>{tittle}</Text>
                        <Text style={[stylesFonts.Body_2_Regular, {color: 'white'}]}>{date}</Text>
                    </BlurView>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default DetailHairStyler

const styles = StyleSheet.create({
    card: {
        width: '33%',
        height: normalize(187),
        marginBottom: normalize(4),
        marginRight: normalize(4)
    }
})