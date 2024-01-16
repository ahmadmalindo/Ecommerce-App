import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import Modal from "react-native-modal";
import normalize from 'react-native-normalize';
import { colors, fonts, justifyContent, radius, stylesFonts } from 'utils/index';
import { Gap } from '../Gap';
import moment from 'moment';
import { Button } from '../Button';

const ModalConfirmOrder = ({ 
    isVisible, 
    onSwipeComplete, 
    onBackdropPress, 
    onPress, 
    onClose,
    distance = '2.5 Km',
    outlet = 'Malang Town Square',
    date = '2024-05-21'
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
            <View style={styles.contentModal}>
                <View style={styles.line}/>
                <View style={justifyContent.space_beetwen}>
                    <Text style={stylesFonts.Body_1_Bold}>Konfirmasi</Text>
                    <Gap marginBottom={normalize(36)}/>
                    <Ionicons name="close-circle" size={24} color={colors.grey} onPress={onBackdropPress}/>
                </View>
                <Gap marginBottom={normalize(16)}/>
                <ImageBackground source={require('assets/images/ic_onboard.png')} resizeMethod='scale' borderRadius={radius.r_14} resizeMode='cover' style={{width: '100%', height: normalize(120)}}>
                    <View style={{width: '100%', height: normalize(120), justifyContent: 'flex-end', padding: normalize(16)}}>
                        <View style={[justifyContent.flex_start,{alignSelf: 'flex-end'}]}>
                            <MaterialIcons name="location-pin" size={16} color="white" style={{marginRight: normalize(4)}} />
                            <Text style={[stylesFonts.Body_2_Regular, {color: 'white'}]}>{distance} Km</Text>
                        </View>
                    </View>
                </ImageBackground>
                <Gap marginBottom={normalize(16)}/>
                <Text style={stylesFonts.Subtittle_2_Regular}>
                    Anda akan melakukan order perawatan di outlet <Text style={{fontFamily: fonts.bold}}>{outlet}</Text> pada hari:
                </Text>
                <Gap marginBottom={normalize(8)}/>
                <View style={justifyContent.flex_start}>
                    <Image source={require('assets/images/ic_calendar.png')} style={[styles.icon, {marginRight: normalize(6)}]}/>
                    <Text style={[stylesFonts.Subtittle_2_Regular, {color: colors.grey}]}>{moment(date).format('dddd, DD MMMM YYYY')}</Text>
                </View>
                <Gap marginBottom={normalize(24)}/>
                <Button
                    tittle={'Ya'}
                    onPress={onPress}
                />
                <Gap marginBottom={normalize(16)}/>
                <Button
                    border
                    tittle={'Tidak'}
                    onPress={onBackdropPress}
                />
            </View>
        </Modal>
    )
} 

export default ModalConfirmOrder;

const styles = StyleSheet.create({
    containerModal: {
        justifyContent: 'flex-end', 
        margin: 0
    },
    contentModal: {
        backgroundColor: 'white', 
        height: normalize(450),
        borderTopRightRadius: normalize(30),
        borderTopLeftRadius: normalize(30),
        paddingHorizontal: normalize(16),
        paddingTop: normalize(12)
    },
    line : {
        width: normalize(60),
        height: normalize(5),
        backgroundColor: colors.grey_2,
        alignSelf: 'center',
        borderRadius: normalize(10),
    },
    icon: {
        width: normalize(20),
        height: normalize(20)
    }
})
