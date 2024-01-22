import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import Modal from "react-native-modal";
import normalize from 'react-native-normalize';
import { colors, fonts, justifyContent, radius, stylesFonts } from 'utils/index';
import { Gap } from '../Gap';
import moment from 'moment';
import { Button } from '../Button';

const ModalBenefitMember = ({ 
    isVisible, 
    onSwipeComplete, 
    onBackdropPress, 
    onPress, 
    distance = '2.5',
    tittle = 'Promo Akhir Tahun 12.12',
    benefits = 'BENEFITS',
    detail_message = 'All benefits of Silver Member PLUS 10%'
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
                    <Text style={stylesFonts.Body_1_Bold}>Detail Benefit Member</Text>
                    <Gap marginBottom={normalize(36)}/>
                    <Ionicons name="close-circle" size={24} color={colors.grey} onPress={onBackdropPress}/>
                </View>
                <Gap marginBottom={normalize(24)}/>
                <Text style={stylesFonts.Subtittle_1_Bold}>{tittle}</Text>
                <Gap marginBottom={normalize(16)}/>
                <Text style={stylesFonts.Subtittle_2_Bold}>{benefits}</Text>
                <Gap marginBottom={normalize(12)}/>
                <Text style={[stylesFonts.Subtittle_2_Regular]}>{detail_message}</Text>
            </View>
        </Modal>
    )
} 

export default ModalBenefitMember;

const styles = StyleSheet.create({
    containerModal: {
        margin: normalize(16)
    },
    contentModal: {
        backgroundColor: 'white', 
        minHeight: normalize(202),
        borderRadius: normalize(32),
        marginBottom: normalize(24),
        padding: normalize(16)
    },
})
