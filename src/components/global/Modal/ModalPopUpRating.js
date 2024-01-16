import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import Modal from "react-native-modal";
import normalize from 'react-native-normalize';
import { colors, fonts, justifyContent, radius, stylesFonts } from 'utils/index';
import { Gap } from '../Gap';
import moment from 'moment';
import { Button } from '../Button';

const ModalPopUpRating = ({ 
    isVisible, 
    onSwipeComplete, 
    onBackdropPress, 
    onPress, 
    placename = 'Malang Town Square',
    date = 'February 20, 2023 | 08:59:45'
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
                <Text style={[stylesFonts.Subtittle_2_Bold, {width: '90%'}]}>Bagaimana pengalaman Anda dengan layanan kami?</Text>
                <Gap marginBottom={normalize(10)}/>
                <View style={{width: '100%',height: 0.2, backgroundColor: colors.grey_2}}/>
                <Gap marginBottom={normalize(10)}/>
                <View style={justifyContent.flex_start}>
                    <Image source={require('assets/images/ic_onboard.png')} style={{width: normalize(50), height: normalize(50), borderRadius: radius.r_12, marginRight: normalize(12)}}/>
                    <View>
                        <Text style={stylesFonts.Body_1_Bold}>{placename}</Text>
                        <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>{date}</Text>
                    </View>
                </View>
                <Gap marginBottom={normalize(16)}/>
                <Button
                    tittle={'Beri Penilaian'}
                    onPress={onPress}
                />
            </View>
        </Modal>
    )
} 

export default ModalPopUpRating;

const styles = StyleSheet.create({
    containerModal: {
        justifyContent: 'flex-end', 
        margin: normalize(16)
    },
    contentModal: {
        backgroundColor: 'white', 
        minHeight: normalize(191),
        borderRadius: radius.r_12,
        marginBottom: normalize(24),
        padding: normalize(16)
    },
})
