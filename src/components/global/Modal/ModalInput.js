import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import Modal from "react-native-modal";
import { colors, fonts, justifyContent, radius, responsive, stylesFonts } from 'utils/index';
import { Gap } from '../Gap';
import moment from 'moment';
import { Button } from '../Button';
import { Input } from '../Input';
import { useModal } from 'context/modalContext';

const ModalInput = ({ 
    modalId = "",
    tittle = "",
    inputTitle = "",
    placeholder= "",
    onSwipeComplete, 
    onBackdropPress, 
    onConfrim
}) => {

    const { modals, hideModal } = useModal();
    const modalState = modals[modalId] || { isVisible: false, props: {} };

    const handleBackdropPress = () => {
        onBackdropPress?.()
        hideModal(modalId);
    };

    const handleSwipeComplete = () => {
        onSwipeComplete?.()
        hideModal(modalId);
    };

    const [input, setInput] = useState("")

    return (
        <Modal 
            isVisible={modalState.isVisible} 
            onSwipeComplete={handleSwipeComplete} 
            swipeDirection="down" 
            onBackdropPress={handleBackdropPress}
            style={{
                justifyContent: 'flex-end', 
                margin: 0
            }} 
            avoidKeyboard={true}
        >
            <View style={[styles.contentModal]}>
                <View style={justifyContent.space_beetwen}>
                    <Text style={stylesFonts.Body_1_SemiBold}>{tittle}</Text>
                    <Ionicons name="close" size={responsive(24)} color={colors.grey} onPress={handleBackdropPress}/>
                </View>
                <Gap marginBottom={responsive(16)}/>
                <Input
                    tittle={inputTitle}
                    placeholder={placeholder}
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
                        setInput("")
                        handleBackdropPress()
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
