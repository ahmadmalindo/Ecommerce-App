import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import Modal from "react-native-modal";
import normalize from 'react-native-normalize';
import { colors, fonts, justifyContent, radius, stylesFonts } from 'utils/index';
import { Gap } from '../Gap';
import moment from 'moment';
import { Button } from '../Button';

const ModalPromoBirthday = ({ 
    isVisible, 
    onSwipeComplete, 
    onBackdropPress, 
    onPress, 
    username = '',
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
                    <Ionicons name="close-circle" size={24} color={colors.grey} onPress={onBackdropPress}/>
                </View>
                <Image source={require ('assets/images/ic_logo.png')} resizeMethod='scale' resizeMode='contain' style={{width: '100%', height: normalize(38.74)}}/>
                <Gap marginBottom={normalize(8)}/>
                <Image source={require ('assets/images/ic_people.png')} resizeMethod='scale' resizeMode='contain' style={{width: '100%', height: normalize(200)}}/>
                <Gap marginBottom={normalize(24)}/>
                <View style={{alignItems: 'center', paddingHorizontal: normalize(32)}}>
                    <Text style={[stylesFonts.Body_1_Bold, {color: colors.grey}]}>SELAMAT ULANG TAHUN</Text>
                    <Text style={stylesFonts.Heading_3}>{username}</Text>
                    <Gap marginBottom={normalize(8)}/>
                    <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey, textAlign: 'center', lineHeight: normalize(16)}]}>Selamat ulang tahun, kami memiliki hadiah voucher khusus untuk anda silahkan klaim voucher anda sekarang.</Text>
                </View>
                <Gap marginBottom={normalize(24)}/>
                <Button 
                    tittle={'Claim voucher sekarang'}
                    onPress={onPress}
                />
                <Gap marginBottom={normalize(8)}/>
            </View>
        </Modal>
    )
} 

export default ModalPromoBirthday;

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
