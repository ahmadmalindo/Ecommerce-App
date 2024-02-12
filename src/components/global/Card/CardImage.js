import React from 'react';
import { Image, ImageBackground, Text, View, StyleSheet, Pressable } from 'react-native';
import { Gap } from '../Gap';
import { justifyContent, stylesFonts, colors, radius } from 'utils/index';
import normalize from 'react-native-normalize';
import { Button } from '../Button';
import { TouchableOpacity } from 'react-native-gesture-handler';

function CardImage ({
    data,
    source,
    photo_member, 
    status_member = '',
    type_member = '',
    number_member = '',
    name_member = '',
    phone_member = '',
    onPress,
    tittle
}) {
    return (
        <Pressable>
            <ImageBackground source={status_member === "SILVER MEMBER" ? require('assets/images/ic_content_card_1.png') : status_member === "GOLD MEMBER" ? require('assets/images/ic_content_card_2.png') : status_member === "PLATINUM MEMBER" ? require('assets/images/ic_content_card_3.png') : null} borderRadius={normalize(16)} style={styles.icBg}>
                <View style={{width: '100%', minHeight: normalize(104), padding: normalize(16)}}>
                    <View style={justifyContent.space_beetwen}>
                        <Text style={[stylesFonts.Subtittle_2_Bold, {color: 'white', width: '32%'}]}></Text>
                        {status_member === "SILVER MEMBER" ?
                        <Image source={require('assets/images/member/ic_member_silver.png')} resizeMethod='resize' resizeMode='contain' style={{width: '100%',height: normalize(24)}}/>
                        : status_member === "GOLD MEMBER" ?
                        <Image source={require('assets/images/member/ic_member_gold.png')} resizeMethod='resize' resizeMode='contain' style={{width: '100%',height: normalize(24)}}/>
                        : status_member === "PLATINUM MEMBER" ?
                        <Image source={require('assets/images/member/ic_member_platinum.png')} resizeMethod='resize' resizeMode='contain' style={{width: '100%',height: normalize(24)}}/>
                        :
                        null
                        }
                    </View>
                    {/* <View style={[justifyContent.flex_start, styles.viewCardMember, {alignSelf: 'flex-end', marginRight: normalize(86)}]}>
                        <Text style={[stylesFonts.Overline, {color: 'white'}]}>{status_member}</Text>
                        <Gap marginRight={normalize(4)}/>
                        <View style={[styles.triangle, {zIndex: 0}]}>
                            <View style={[justifyContent.flex_start, {height: normalize(21), transform: [{rotate: '180deg'}], zIndex: 10, marginTop: normalize(-20)}]}>
                                <Image source={require('assets/images/ic_star.png')} style={{width: normalize(16), height: normalize(16), marginRight: normalize(4)}}/>
                                <Text style={[stylesFonts.Subtittle_2_Bold, {color: 'white'}]}>{type_member}</Text>
                            </View>
                        </View>
                    </View> */}
                    <Gap marginBottom={normalize(16)}/>
                    <View style={justifyContent.space_beetwen}>
                        <View>
                            <Text style={[stylesFonts.Subtittle_1_SemiBold]}>{number_member}</Text>
                            <Gap marginBottom={normalize(8)}/>
                            <Text style={[stylesFonts.Body_2_Medium]}>{name_member}</Text>
                        </View>
                        <Image source={{uri: photo_member}} style={{width: normalize(70), height: normalize(70), borderRadius: normalize(44), backgroundColor: colors.grey_2}}/>
                    </View>
                    <Gap marginBottom={normalize(16)}/>
                    <View style={justifyContent.space_beetwen}> 
                        {photo_member !== null ?
                        <>
                            {data?.response === "OK" ?
                            <>
                                {data.TanggalLahir !== null ?
                                <SectionButtonOrder
                                    tittle={tittle}
                                    onPress={onPress}
                                />
                                :
                                <TouchableOpacity onPress={onPress} style={[styles.btn, justifyContent.view_center, {borderColor: 'transparent'}]}>

                                </TouchableOpacity>
                                }
                            </>
                            :
                            <SectionButtonOrder
                                tittle={tittle}
                                onPress={onPress}
                            />
                            }
                        </>
                        :
                        <TouchableOpacity style={[styles.btn, justifyContent.view_center, {borderColor: 'transparent'}]}>

                        </TouchableOpacity>
                        }
                        <Text style={[stylesFonts.Body_2_SemiBold]}>{phone_member}</Text>
                    </View>
                </View>
            </ImageBackground>
        </Pressable>
    )
}

function SectionButtonOrder ({
    onPress,
    tittle
}) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.btn, justifyContent.view_center]}>
            <Text style={[stylesFonts.Body_2_Bold]}>{tittle?.toUpperCase()}</Text>
        </TouchableOpacity>
    )
}

export default CardImage;

const styles = StyleSheet.create({
    viewCardMember: {
        minWidth: normalize(104),
        maxWidth: normalize(134),
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
    btn: {
        width: '100%',
        height: normalize(32),
        borderWidth: 2,
        borderRadius: radius.r_10,
        borderColor: '#475569v',
        paddingHorizontal: normalize(28)
    }
})