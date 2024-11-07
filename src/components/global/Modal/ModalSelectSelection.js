import { Entypo, Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity, FlatList, SectionList } from 'react-native'
import Modal from "react-native-modal";
import { colors, fonts, justifyContent, radius, responsive, stylesFonts } from 'utils/index';
import { Gap } from '../Gap';
import { useModal } from 'context/modalContext';
import { ButtonDots } from '../Button';

const ModalSelectSelection = ({ 
    modalId,
    schemeData = {
        id: 'id',
        image: null,
        name: 'name',
        desc: null
    },
    data,
    tittle,
    onSwipeComplete, 
    onBackdropPress, 
    onConfirm,
    customStyleImageItem = {width: responsive(48), height: responsive(48)},
    customBorderCircle = 100,
    customBorderDots
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

    const [select, setSelect] = useState({id: null})
    const [input, setInput] = useState("")

    return (
        <Modal 
            isVisible={modalState.isVisible} 
            onSwipeComplete={() => {
                handleSwipeComplete?.()
                setSelect(null)
            }} 
            swipeDirection="down" 
            onBackdropPress={() => {
                handleBackdropPress?.()
                setSelect(null)
            }}
            style={{
                justifyContent: 'flex-end', 
                margin: 0
            }} 
            avoidKeyboard={true}
            propagateSwipe
        >
            <View style={styles.contentModal}>
                <View style={justifyContent.space_beetwen}>
                    <Text style={stylesFonts.Body_1_SemiBold}>{tittle}</Text>
                    <Ionicons name="close-circle" size={responsive(24)} color={colors.grey} onPress={handleBackdropPress}/>
                </View>
                <Gap marginBottom={responsive(16)}/>
                <SectionList
                    sections={data}
                    renderItem={(({item}) => {
                        return (
                            <TouchableOpacity 
                                onPress={() => {
                                    setSelect(item)
                                    onConfirm?.(item)
                                    handleBackdropPress?.()
                                }} 
                                style={[justifyContent.space_beetwen, {marginBottom: responsive(16)}]}
                            >
                                <View style={justifyContent.flex_start}>
                                    {item[schemeData.image] != null &&
                                    <Gap marginRight={responsive(16)}>
                                        <Image source={{uri: item[schemeData.image]}} resizeMethod='scale' resizeMode='contain' style={customStyleImageItem}/>
                                    </Gap>
                                    }
                                    <View>
                                        <Text style={[stylesFonts.Subtittle_2_SemiBold]}>{item[schemeData.name]}</Text>
                                        {item[schemeData.desc] != null &&
                                        <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>{item[schemeData.desc]}</Text>
                                        }
                                    </View>
                                </View>
                                <ButtonDots
                                    circle={customBorderCircle}
                                    borderRadius={customBorderDots}
                                    isChecked={select[schemeData.id] == item[schemeData.id] ? true : false}
                                />
                            </TouchableOpacity>
                        )
                    })}
                    renderSectionHeader={({section: {tittle}}) => (
                        <Gap marginBottom={responsive(8)}>
                            <Text style={stylesFonts.Body_1_SemiBold}>{tittle}</Text>
                        </Gap>
                    )}
                />
                <Gap marginBottom={responsive(36)}/>
            </View>
        </Modal>
    )
} 

export default ModalSelectSelection;

const styles = StyleSheet.create({
    contentModal: {
        backgroundColor: 'white', 
        minHeight: 100,
        borderTopRightRadius: responsive(16),
        borderTopLeftRadius: responsive(16),
        paddingHorizontal: responsive(16),
        paddingTop: responsive(12)
    },
})
