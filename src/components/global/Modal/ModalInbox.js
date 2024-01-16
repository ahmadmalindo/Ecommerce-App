import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import Modal from "react-native-modal";
import normalize from 'react-native-normalize';
import { colors, fonts, justifyContent, radius, stylesFonts } from 'utils/index';
import { Gap } from '../Gap';
import moment from 'moment';
import { Button } from '../Button';

const ModalInbox = ({ 
    isVisible, 
    onSwipeComplete, 
    onBackdropPress, 
    onPress, 
    distance = '2.5',
    tittle = 'Promo Akhir Tahun 12.12',
    detail_address = 'Mall Olympic Garden, Lantai 2/SF-26, Malang',
    detail_message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore '
}) => {

    return (
        <Modal 
            isVisible={isVisible} 
            onSwipeComplete={onSwipeComplete} 
            swipeDirection="down" 
            onBackdropPress={onBackdropPress}
            style={styles.containerModal} 
            avoidKeyboard={true}
        >
            <View style={[styles.contentModal]}>
                <View style={justifyContent.space_beetwen}>
                    <Text style={stylesFonts.Body_1_Bold}>Detail Pesan</Text>
                    <Gap marginBottom={normalize(36)}/>
                    <Ionicons name="close-circle" size={24} color={colors.grey} onPress={onBackdropPress}/>
                </View>
                <Gap marginBottom={normalize(24)}/>
                <ImageBackground source={require('assets/images/ic_onboard.png')} borderRadius={normalize(16)} resizeMethod="scale" resizeMode="cover" style={{width: '100%', height: normalize(120)}}>
                    <View style={{width: '100%', height: normalize(120), justifyContent: 'flex-end', padding: normalize(16)}}>
                        <View style={[justifyContent.flex_start,{alignSelf: 'flex-end'}]}>
                            <MaterialIcons name="location-pin" size={16} color="white" style={{marginRight: normalize(4)}} />
                            <Text style={[stylesFonts.Body_2_Regular, {color: 'white'}]}>{distance} Km</Text>
                        </View>
                    </View>
                </ImageBackground>
                <Gap marginBottom={normalize(24)}/>
                <Text style={stylesFonts.Subtittle_1_Bold}>{tittle}</Text>
                <Gap marginBottom={normalize(10)}/>
                <View style={justifyContent.flex_start}>
                    <MaterialIcons name="location-pin" size={18} color={colors.grey} style={{marginRight: normalize(4)}} />
                    <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>{detail_address}</Text>
                </View>
                <Gap marginBottom={normalize(16)}/>
                <Text style={[stylesFonts.Subtittle_2_Regular]}>{detail_message}</Text>
            </View>
        </Modal>
    )
} 

export default ModalInbox;

const styles = StyleSheet.create({
    containerModal: {
        margin: normalize(16)
    },
    contentModal: {
        backgroundColor: 'white', 
        minHeight: normalize(402),
        borderRadius: normalize(32),
        marginBottom: normalize(24),
        padding: normalize(16)
    },
})
