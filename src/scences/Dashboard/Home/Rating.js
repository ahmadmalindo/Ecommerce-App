import { Button, CardNearest, CardTransaction, Container, Gap, Header, HeaderProfile, HeaderSection, Input } from "components/global"
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
import { MaterialIcons } from "@expo/vector-icons"
import StarRating from 'react-native-star-rating-widget';

function Rating({ navigation }) {

    const [inputSearch, setInputSearch] = useState("")
    const [dataNearest, setDataNearest] = useState([])
    const [location, setLocation] = useState(null);

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
            getNearestOutlet()
          });
      
          return () => task.cancel();
        }, [navigation])
    );

    return (
        <Container backgroundColor={'white'}>
            <View style={{paddingTop: normalize(16), paddingHorizontal: normalize(16)}}>
                <Header
                    tittle={'Berikan Penilaian'}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <ScrollView>
                <View style={{paddingTop: normalize(24), paddingHorizontal: normalize(16)}}>
                    <SectionPlaceName

                    />
                    <Gap marginBottom={normalize(24)}/>
                    <SectionRating

                    />
                    <Gap marginBottom={normalize(16)}/>
                    <Button
                        tittle={'Kirim'}
                    />
                </View>
            </ScrollView>
        </Container>
    )
}

function SectionPlaceName ({
    distance = '2.5',
    placename = 'Malang Town Square',
    detail_address = 'Malang Town Square, Blok GE 2 No. 1, Malang',
    date = 'February 20, 2023 | 08:59:45'
}) {
    return (
        <>
            <ImageBackground source={require('assets/images/ic_onboard.png')} resizeMethod='scale' borderRadius={radius.r_14} resizeMode='cover' style={{width: '100%', height: normalize(120)}}>
                <View style={{width: '100%', height: normalize(120), justifyContent: 'flex-end', padding: normalize(16)}}>
                    <View style={[justifyContent.flex_start,{alignSelf: 'flex-end'}]}>
                        <MaterialIcons name="location-pin" size={16} color="white" style={{marginRight: normalize(4)}} />
                        <Text style={[stylesFonts.Body_2_Regular, {color: 'white'}]}>{distance} Km</Text>
                    </View>
                </View>
            </ImageBackground>
            <Gap marginBottom={normalize(16)}/>
            <Text style={[stylesFonts.Heading_1]}>{placename}</Text>
            <Gap marginBottom={normalize(6)}/>
            <View style={justifyContent.flex_start}>
                <MaterialIcons name="location-pin" size={18} color={colors.grey} style={{marginRight: normalize(4)}} />
                <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>{detail_address}</Text>
            </View>
            <Gap marginBottom={normalize(6)}/>
            <Text style={[stylesFonts.Body_2_Bold, {color: colors.grey}]}>{date}</Text>
        </>
    )
}

function SectionRating ({
    rating = 4.5
}) {
    return (
        <View style={{alignItems: 'center'}}>
            <StarRating
                starSize={50}
                color={colors.yellow_2}
                rating={rating}
                onChange={() => ''}
            />
            <Gap marginBottom={normalize(16)}/>
            <Text style={[stylesFonts.Subtittle_2_Bold]}>Nilai {rating}/5.0</Text>
        </View>
    )
}

export default Rating

const styles = StyleSheet.create({
    
})