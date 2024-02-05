import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import moment from "moment";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import normalize from "react-native-normalize";
import Animated, { FadeInDown, FadeOutDown, Layout, useAnimatedProps, withSpring } from "react-native-reanimated";
import { colors, fonts, justifyContent, radius, stylesFonts } from "utils/index";
import { Gap } from "../Gap";
import { currencyFloat } from "helper";

const CardTransaction = ({
    item,
    index,
    selectedIndex = 1,
    onPressAction,
    onPress,
    placeName = 'The Park Solo',
    date = '2024-01-22',
    payment_methods = 'BNI',
    payment = 196000,
    receipt_number = '12345678'
}) => {

    const animatedProps = useAnimatedProps(() => {
        return {
          marginLeft: index === selectedIndex ? withSpring(-100) : withSpring(0)
        };
      });
    
      const animatedProps2 = useAnimatedProps(() => {
        return {
          marginLeft: index === selectedIndex ? withSpring(-40) : withSpring(-140)
        };
      });
    
      return (
        <Animated.View layout={Layout.springify()} entering={FadeInDown.duration(index * 500).easing()} exiting={FadeOutDown.duration(index * 500).easing()} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Animated.View key={index} animatedProps={animatedProps} onResponderStart={() => alert('123')} style={[styles.card, {zIndex: 10}]}>
              <TouchableOpacity 
                style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}
                onPress={onPress}
              >
                <View style={[justifyContent.flex_start, {width: '80%'}]}>
                    <Image source={require('assets/images/ic_onboard.png')} style={{width:normalize(62), height: normalize(62), borderRadius: radius.r_10, marginRight: normalize(16)}}/>
                    <View>
                        <View style={[styles.cardInfo, justifyContent.view_center, {backgroundColor: item.Struk !== "-1" ? colors.green : colors.red_2}]}>
                            <Text style={[stylesFonts.Overline, {color: 'white', fontFamily: fonts.semi_bold}]}>{item.Struk !== "-1" ? 'Selesai' : 'Dibatalkan' }</Text>
                        </View>
                        <Gap marginBottom={normalize(4)}/>
                        <Text style={stylesFonts.Body_1_Bold}>{placeName}</Text>
                        <Text style={[stylesFonts.Body_2_SemiBold, {color: colors.grey}]}>{date}</Text>
                    </View>
                </View>
                {item.status !== 'cancel' &&
                <>
                    {selectedIndex === index ?
                    <Entypo name="chevron-small-left" size={24} color="black" />
                    :
                    <Entypo name="chevron-small-right" size={24} color="black" />
                    }
                </>
                }
              </TouchableOpacity>
              <Gap marginBottom={normalize(16)}/>
              <View style={{width: '100%',height: 0.2, backgroundColor: colors.grey_2}}/>
              <Gap marginBottom={normalize(12)}/>
              <View style={justifyContent.space_beetwen}>
                <View>
                    <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>Payment method</Text>
                    <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>Payment</Text>
                    <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>Receipt number</Text>
                </View>
                <View>
                    <Text style={[stylesFonts.Body_2_SemiBold, {textAlign: "right"}]}>{payment_methods}</Text>
                    <Text style={[stylesFonts.Body_2_SemiBold, {textAlign: "right"}]}>{payment}</Text>
                    <Text style={[stylesFonts.Body_2_SemiBold, {textAlign: "right"}]}>{receipt_number === "-1" ? null : receipt_number}</Text>
                </View>
              </View>
            </Animated.View>   
            <Animated.View animatedProps={animatedProps2} onResponderStart={() => alert('123')} style={[styles.card2, {backgroundColor: item.Struk !== "-1" ? colors.green :  colors.red_2 }]}>
              <TouchableOpacity onPress={onPressAction}>
                {item.Struk !== "-1" ?
                <Image source={require('assets/images/ic_document.png')} style={{width: normalize(40), height: normalize(40), marginLeft: normalize(30)}} />
                :
                <Image source={require('assets/images/ic_trash.png')} style={{width: normalize(40), height: normalize(40), marginLeft: normalize(30)}}/>
                }
                <Text style={[stylesFonts.Overline, {color: 'white', marginLeft: normalize(30), marginTop: normalize(4)}]}>{item.Struk !== "-1" ? 'Receipt' : 'Cancel'}</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
      )
}

export default CardTransaction

const styles = StyleSheet.create({
    cardInfo: {
        minWidth: normalize(51),
        maxWidth: normalize(65),
        height: normalize(21),
        backgroundColor: colors.green,
        borderRadius: normalize(4),
        paddingHorizontal: normalize(4)
    },
    card: {
        width: '100%',
        height: normalize(181),
        borderRadius: normalize(16),
        backgroundColor: 'white',
        borderColor: colors.black,
        marginBottom: normalize(16),
        padding: normalize(16),
        shadowColor: "rgba(28, 39, 49, 0.08)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        elevation: 2,
        shadowOpacity: 1,
      },
      card2: {
        width: '37%',
        height: normalize(180),
        borderRadius: normalize(16),
        backgroundColor: colors.red_2,
        alignSelf: 'center',
        marginBottom: normalize(15),
        padding: normalize(16),
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
})