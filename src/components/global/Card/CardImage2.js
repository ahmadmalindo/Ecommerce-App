import React from 'react';
import { Image, ImageBackground, Text, View, StyleSheet, Pressable } from 'react-native';
import { Gap } from '../Gap';
import { justifyContent, stylesFonts, colors } from 'utils/index';
import normalize from 'react-native-normalize';

function CardImage2 ({
    source = require('assets/images/ic_content_card_1.png'),
    status_member = '',
    type_member = '',
    number_member = '',
    name_member = '',
    phone_member = '',
    onPress,
    index,
    item
}) {
    return (
        <Pressable onPress={onPress}>
            <ImageBackground source={source} borderRadius={normalize(16)} style={styles.icBg}>
                <View style={{width: '100%', height: normalize(120), padding: normalize(12)}}>
                    <View>
                        <Text style={[stylesFonts.Body_2_SemiBold]}>{item.id_type === 1 ? 'Silver Member' : item.id_type === 2 ? 'Gold Member' : 'Platinum Member' }</Text>
                        <Gap marginBottom={normalize(6)}/>
                        <Text style={[stylesFonts.Body_2_SemiBold]}>{name_member}</Text>
                        <Gap marginBottom={normalize(6)}/>
                        <Text style={[stylesFonts.Body_2_SemiBold]}>You Save Rp {phone_member}</Text>
                    </View>
                </View>
            </ImageBackground>
        </Pressable>
    )
}

export default CardImage2;

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
        // borderTopColor: colors.grey_2,
        borderTopLeftRadius: normalize(4),
        borderBottomLeftRadius: normalize(4),
        transform: [{rotate: '180deg'}],
    },
})