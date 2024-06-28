import { Entypo, Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity, FlatList, SectionList } from 'react-native'
import Modal from "react-native-modal";
import { colors, fonts, justifyContent, radius, responsive, stylesFonts } from 'utils/index';
import { Gap } from '../Gap';

const ModalSelectSelection = ({ 
    data,
    tittle,
    isConfirmation,
    isVisible, 
    onSwipeComplete, 
    onBackdropPress, 
    onConfirm,
    image,
    customStyleImageItem = {width: responsive(48), height: responsive(48)},
    desc
}) => {

    const [select, setSelect] = useState(null)
    const [input, setInput] = useState("")

    return (
        <Modal 
            isVisible={isVisible} 
            onSwipeComplete={() => {
                onSwipeComplete?.()
                setSelect(null)
            }} 
            swipeDirection="down" 
            onBackdropPress={() => {
                onBackdropPress?.()
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
                    <Ionicons name="close-circle" size={responsive(24)} color={colors.grey} onPress={onBackdropPress}/>
                </View>
                <Gap marginBottom={responsive(16)}/>
                <SectionList
                    sections={data}
                    renderItem={(({item}) => {
                        return (
                            <TouchableOpacity 
                                onPress={() => {
                                    setSelect(item)
                                    if (isConfirmation) {
                                        onConfirm?.(item)
                                    }
                                }} 
                                style={[justifyContent.space_beetwen, {marginBottom: responsive(16)}]}
                            >
                                <View style={justifyContent.flex_start}>
                                    {image &&
                                    <Gap marginRight={responsive(16)}>
                                        <Image source={{uri: item?.image}} resizeMethod='scale' resizeMode='contain' style={customStyleImageItem}/>
                                    </Gap>
                                    }
                                    <View>
                                        <Text style={[stylesFonts.Subtittle_2_SemiBold]}>{item.name}</Text>
                                        {desc &&
                                        <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>{item.desc}</Text>
                                        }
                                    </View>
                                </View>
                                {select == item ?
                                <Octicons name="check-circle-fill" size={responsive(16)} color={colors.primary} />
                                :
                                <Entypo name="chevron-small-right" size={responsive(16)} color={colors.black} />
                                }
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
