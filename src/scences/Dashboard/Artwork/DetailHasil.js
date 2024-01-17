import { MaterialIcons } from "@expo/vector-icons"
import { useFocusEffect, useIsFocused } from "@react-navigation/native"
import { Button, CardHairStylelist, CardNearest, CardTransaction, Container, Gap, Header, HeaderProfile, HeaderSection, Input, ModalConfirmOrder } from "components/global"
import { Nontification } from "helper"
import { currencyFloat } from "helper"
import { storage } from "helper/storage"
import moment from "moment"
import React, { useLayoutEffect, useState } from "react"
import { Alert, FlatList, Image, ImageBackground, InteractionManager, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import normalize from "react-native-normalize"
import mySalon from "utils/MySalonUtils"
import { colors, fonts, justifyContent, radius, stylesFonts } from "utils/index"

function DetailHasil({ navigation, route }) {

    const focused = useIsFocused()

    const { data, index } = route.params

    const [selectedIndex, setSelectedIndex] = useState(null)

    useLayoutEffect(() => {
        setSelectedIndex(index)
    }, [focused])

    console.log(data);

    return (
        <Container backgroundColor={'white'}>
            <View style={{paddingTop: normalize(16), paddingHorizontal: normalize(16)}}>
                <Header
                    tittle={'Super Light Blonde'}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <View style={{paddingTop: normalize(24)}}>
                <Image resizeMethod="scale" resizeMode="cover"  source={{uri: data[selectedIndex]}} style={{width: '100%', height: normalize(550), backgroundColor: colors.grey_2}}/>
                <Gap marginBottom={normalize(16)}/>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={data}
                    renderItem={(({item, index}) => {
                        return (
                            <SectionList
                                item={item}
                                index={index}
                                photo={item?.File}
                                onPress={() => setSelectedIndex(index)}
                            />
                        )
                    })}
                />
            </View>
        </Container>
    )
}

function SectionList ({
    onPress,
    photo
}) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image resizeMethod="scale" resizeMode="cover"  source={{uri: photo}} style={{width: '100%', height: normalize(100),backgroundColor: colors.grey_2}}/>
        </TouchableOpacity>
    )
}

export default DetailHasil

const styles = StyleSheet.create({
    card: {
        width: normalize(68), 
        height: normalize(100), 
        marginRight: normalize(6),
        borderRadius: normalize(8),
        overflow: 'hidden'
    }
})