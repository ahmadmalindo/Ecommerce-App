import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from "react-native-modal";
import normalize from 'react-native-normalize';
import { colors, fonts, justifyContent, radius, stylesFonts } from 'utils/index';
import { Gap } from '../Gap';

const ModalPickPhoto = ({ 
    isVisible, 
    onSwipeComplete, 
    onBackdropPress, 
    onPress
}) => {

    let data = [
        {
            tittle: 'Ambil Foto',
            ic: require('assets/images/ic_camera.png')
        },
        {
            tittle: 'Pilih Foto',
            ic: require('assets/images/ic_galeri.png')
        }
    ]

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
                <Gap marginBottom={normalize(16)}/>
                <View style={justifyContent.space_beetwen}>
                    <Text style={stylesFonts.Body_1_Bold}>Edit Foto Profil</Text>
                    <Gap marginBottom={normalize(36)}/>
                    <Ionicons name="close-circle" size={24} color={colors.grey} onPress={onBackdropPress}/>
                </View>
                <Gap marginBottom={normalize(16)}/>
                <FlatList
                    data={data}
                    renderItem={(({item, index}) => {
                        return (
                            <TouchableOpacity onPress={() => onPress(index)} style={[justifyContent.space_beetwen, {marginBottom: normalize(16)}]}>
                                <Text style={stylesFonts.Subtittle_2_Regular}>{item.tittle}</Text>
                                <Image source={item.ic} style={{width: normalize(32), height: normalize(32)}}/>
                            </TouchableOpacity>
                        )
                    })}
                />
            </View>
        </Modal>
    )
} 

export default ModalPickPhoto;

const styles = StyleSheet.create({
    containerModal: {
        justifyContent: 'flex-end', 
        margin: 0
    },
    contentModal: {
        backgroundColor: 'white', 
        height: normalize(242),
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
})
