import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import Modal from "react-native-modal";
import { colors, fonts, justifyContent, radius, responsive, stylesFonts } from 'utils/index';
import { Gap } from '../Gap';
import moment from 'moment';
import { Button } from '../Button';
import { Input } from '../Input';

const ModalInput = ({ 
    tittle,
    inputTitle,
    isVisible, 
    onSwipeComplete, 
    onBackdropPress, 
    onConfrim
}) => {

    const [input, setInput] = useState("")

    return (
        <Modal 
            isVisible={isVisible} 
            onSwipeComplete={onSwipeComplete} 
            swipeDirection="down" 
            onBackdropPress={onBackdropPress}
            style={{
                justifyContent: 'flex-end', 
                margin: 0
            }} 
            avoidKeyboard={true}
        >
            <View style={[styles.contentModal]}>
                <View style={justifyContent.space_beetwen}>
                    <Text style={stylesFonts.Body_1_SemiBold}>{tittle}</Text>
                    <Ionicons name="close" size={responsive(24)} color={colors.grey} onPress={onBackdropPress}/>
                </View>
                <Gap marginBottom={responsive(16)}/>
                <Input
                    tittle={inputTitle}
                    placeholder={`Masukkan ${tittle}`}
                    value={input}
                    onChangeText={(val) => {
                        setInput(val)
                    }}
                />
                <Gap marginBottom={responsive(16)}/>
                <Button
                    tittle={'Simpan'}
                    onPress={() => {
                        onConfrim?.(input)
                    }}
                />
                <Gap marginBottom={responsive(32)}/>
            </View>
        </Modal>
    )
} 

export default React.memo(ModalInput);

const styles = StyleSheet.create({
    contentModal: {
        backgroundColor: 'white', 
        minHeight: 100,
        borderTopRightRadius: responsive(16),
        borderTopLeftRadius: responsive(16),
        paddingHorizontal: responsive(16),
        paddingTop: responsive(12)
    }
})
