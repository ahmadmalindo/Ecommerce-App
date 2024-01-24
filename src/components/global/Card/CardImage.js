import React from 'react';
import { Image, ImageBackground, Text, View, StyleSheet, Pressable } from 'react-native';
import { Gap } from '../Gap';
import { justifyContent, stylesFonts, colors } from 'utils/index';
import normalize from 'react-native-normalize';

function CardImage ({
    status_member = '',
    type_member = '',
    number_member = '',
    name_member = '',
    phone_member = '',
    onPress
}) {
    return (
        <Pressable onPress={onPress}>
            <ImageBackground source={require('assets/images/ic_content_card.png')} borderRadius={normalize(16)} style={styles.icBg}>
                <View style={{width: '100%', height: normalize(160), padding: normalize(16)}}>
                    <View style={[justifyContent.flex_start, styles.viewCardMember, {alignSelf: 'flex-end', marginRight: normalize(86)}]}>
                        <Text style={[stylesFonts.Overline, {color: 'white'}]}>{status_member}</Text>
                        <Gap marginRight={normalize(4)}/>
                        <View style={[styles.triangle, {zIndex: 0}]}>
                            <View style={[justifyContent.flex_start, {height: normalize(21), transform: [{rotate: '180deg'}], zIndex: 10, marginTop: normalize(-20)}]}>
                                <Image source={require('assets/images/ic_star.png')} style={{width: normalize(16), height: normalize(16), marginRight: normalize(4)}}/>
                                <Text style={[stylesFonts.Subtittle_2_Bold, {color: 'white'}]}>{type_member}</Text>
                            </View>
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
        </Pressable>
    )
}

export default CardImage;

const styles = StyleSheet.create({
    viewCardMember: {
        minWidth: normalize(94),
        maxWidth: normalize(114),
        height: normalize(21),
        backgroundColor: '#FFFFFF33',
        borderRadius: normalize(5),
        paddingHorizontal: normalize(16)
    },
    triangle: {
        width: normalize(108),
        height: normalize(21),
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: normalize(14),
        borderTopWidth: normalize(21),
        borderRightColor: "transparent",
        borderTopColor: colors.grey_2,
        borderTopLeftRadius: normalize(4),
        borderBottomLeftRadius: normalize(4),
        transform: [{rotate: '180deg'}],
    },
})