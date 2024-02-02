import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import Modal from "react-native-modal";
import normalize from 'react-native-normalize';
import { colors, fonts, justifyContent, radius, stylesFonts } from 'utils/index';
import { Gap } from '../Gap';
import moment from 'moment';
import { Button } from '../Button';

const ModalCompleteProfile = ({ 
    isVisible, 
    onSwipeComplete, 
    onBackdropPress, 
    onPress, 
    tittle = 'Opps!',
    detail_message = 'Anda belum memperbarui email dan username silahkan lengkapi profil anda'
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
                    <Text style={stylesFonts.Body_1_Bold}></Text>
                    <Gap marginBottom={normalize(36)}/>
                    {/* <Ionicons name="close-circle" size={24} color={colors.grey} onPress={onBackdropPress}/> */}
                </View>
                <Image source={require ('assets/images/ic_complete_profile.png')} resizeMethod='scale' resizeMode='contain' style={{width: '100%', height: normalize(200)}}/>
                <Gap marginBottom={normalize(24)}/>
                <View style={{alignItems: 'center', paddingHorizontal: normalize(32)}}>
                    <Text style={stylesFonts.Subtittle_1_Bold}>{tittle}</Text>
                    <Gap marginBottom={normalize(8)}/>
                    <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey, textAlign: 'center'}]}>{detail_message}</Text>
                </View>
                <Gap marginBottom={normalize(16)}/>
                <Button 
                    tittle={'Lengkapi profil'}
                    onPress={onPress}
                />
                <Gap marginBottom={normalize(8)}/>
            </View>
        </Modal>
    )
} 

export default ModalCompleteProfile;

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
