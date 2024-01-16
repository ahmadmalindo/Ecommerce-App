import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import Modal from "react-native-modal";
import normalize from 'react-native-normalize';
import { colors, fonts, justifyContent, radius, stylesFonts } from 'utils/index';
import { Gap } from '../Gap';
import moment from 'moment';
import { Button } from '../Button';

const ModalToast = ({ 
    isVisible, 
    onSwipeComplete, 
    onBackdropPress, 
    onPress, 
    message
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
            <View style={[styles.contentModal, justifyContent.space_beetwen]}>
                <Ionicons name="checkmark-circle-sharp" size={32} color={colors.green} />
                <Text style={[stylesFonts.Subtittle_2_Regular, {width: '80%'}]}>{message}</Text>
                <Ionicons name="close-circle" size={26} color={colors.grey} onPress={onBackdropPress}/>
            </View>
        </Modal>
    )
} 

export default ModalToast;

const styles = StyleSheet.create({
    containerModal: {
        justifyContent: 'flex-end', 
        margin: normalize(16)
    },
    contentModal: {
        backgroundColor: 'white', 
        minHeight: normalize(68),
        borderRadius: radius.r_12,
        marginBottom: normalize(24),
        paddingHorizontal: normalize(16)
    },
})
