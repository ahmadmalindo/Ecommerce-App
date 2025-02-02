import { Ionicons, Octicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import Modal from "react-native-modal";
import { colors, justifyContent, responsive, stylesFonts } from 'utils/index';
import { Gap } from '../Gap';
import { Button, ButtonDots } from '../Button';
import { Nontification } from 'helper';
import { Input } from '../Input';
import { customStyle } from 'utils/customStyle';
import { useModal } from 'context/modalContext';

const ModalSelect = ({ 
    isLoading,
    modalId = "",
    data = [],
    schemeData = {
        id: 'id',
        image: null,
        name: 'name',
        desc: null
    },
    onBackdropPress,
    onSwipeComplete,
    selectedValue = null,
    onConfirm,
    tittle = "",
    placeholder = 'Search',
    searchable,
    customStyleImageItem = {width: responsive(48), height: responsive(48)},
    customBorderCircle = true,
    customBorderDots,
    customEmptyComponent = <Gap marginBottom={responsive(16)}>
        <Text style={[stylesFonts.Subtittle_2_Medium, {textAlign: 'center'}]}>No Data</Text>
    </Gap>,
    isMultiSelect = false,
    onMultiSelect = {},
    isConfirmation,
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

    const filterSearch = data?.filter(item => item[schemeData.name]?.toLowerCase()?.includes(input?.toLocaleLowerCase()))

    useEffect(() => {
        if (selectedValue != null) {
            setSelect(selectedValue)
        }
        setSelect({id: null})
    }, [modalState.isVisible])


    return (
        <Modal 
            isVisible={modalState.isVisible} 
            swipeDirection="down" 
            onSwipeComplete={handleSwipeComplete} 
            onBackdropPress={handleBackdropPress}
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
                    <Gap marginBottom={responsive(36)}/>
                    <Ionicons name="close-circle" size={responsive(24)} color={colors.grey} onPress={handleBackdropPress}/>
                </View>
                {searchable &&
                <>
                    <Gap marginBottom={responsive(16)}/>
                    <Input
                        placeholder={placeholder}
                        value={input}
                        onChangeText={(val) => {
                            setInput(val)
                        }}
                        customIconRight={
                            <View style={{
                                width: responsive(36),
                                height: responsive(44),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Ionicons name="search" size={responsive(24)} color={colors.grey} />
                            </View>
                        }
                    />
                </>
                }
                <Gap marginBottom={responsive(16)}/>
                <FlatList
                    data={searchable ? filterSearch : data}
                    renderItem={(({item}) => {
                        return (
                            <TouchableOpacity 
                                onPress={() => {
                                    setSelect(item)
                                    if (isConfirmation) {
                                        handleBackdropPress?.()
                                        onConfirm?.(item)
                                    }
                                    if (isMultiSelect) {
                                        onMultiSelect?.(item)
                                    }
                                }} 
                                style={[justifyContent.space_beetwen, {marginBottom: responsive(16)}]}
                            >
                                <View style={justifyContent.flex_start}>
                                    {item[schemeData?.image] != null &&
                                    <Gap marginRight={responsive(16)}>
                                        <Image source={{uri: item[schemeData?.image]}} resizeMethod='scale' resizeMode='contain' style={customStyleImageItem}/>
                                    </Gap>
                                    }
                                    <View>
                                        <Text style={[stylesFonts.Subtittle_2_SemiBold]}>{item[schemeData?.name]}</Text>
                                        {item[schemeData?.desc != null] &&
                                        <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>{item[schemeData?.desc]}</Text>
                                        }
                                    </View>
                                </View>
                                <ButtonDots
                                    circle={customBorderCircle}
                                    borderRadius={customBorderDots}
                                    isChecked={isMultiSelect ? item?.isChecked ? true : false :  select[schemeData.id] == item[schemeData.id] ? true : false}
                                />
                            </TouchableOpacity>
                        )
                    })}
                    ListEmptyComponent={
                        isLoading ? <ActivityIndicator/> : customEmptyComponent
                    }
                />
                <Gap marginBottom={isConfirmation ? responsive(24) : responsive(72)}/>
                {!isConfirmation &&
                <View style={[customStyle.absolute, {bottom: responsive(30), alignSelf: 'center'}]}>
                    <Button
                        tittle={'Konfirmasi'}
                        onPress={() => {
                            if (select.id == null) {
                                Nontification("Wajib Memilih Salah Satu")
                            }
                            else {
                                handleBackdropPress?.()
                                onConfirm?.(select)
                            }
                        }}
                    />
                </View>
                }
            </View>
        </Modal>
    )
} 

export default React.memo(ModalSelect);

const styles = StyleSheet.create({
    contentModal: {
        backgroundColor: 'white', 
        minHeight: 100,
        maxHeight: 500,
        borderTopRightRadius: responsive(16),
        borderTopLeftRadius: responsive(16),
        paddingHorizontal: responsive(16),
        paddingTop: responsive(12)
    },
})
