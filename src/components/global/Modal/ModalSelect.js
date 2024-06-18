import { Ionicons, Octicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import Modal from "react-native-modal";
import { colors, justifyContent, responsive, stylesFonts } from 'utils/index';
import { Gap } from '../Gap';
import { Button } from '../Button';
import { Nontification } from 'helper';
import { Input } from '../Input';
import { customStyle } from 'utils/customStyle';

const ModalSelect = ({ 
    data = [],
    selectedValue = null,
    isVisible, 
    onSwipeComplete, 
    onBackdropPress, 
    onConfirm,
    tittle,
    desc,
    searchable,
    image,
    customStyleImageItem = {width: responsive(48), height: responsive(48)},
    isConfirmation,
    isMultiSelect,
    onMultiSelect,
}) => {

    const [select, setSelect] = useState(null)
    const [input, setInput] = useState("")

    const filterSearch = data?.filter(item => item?.name?.includes(input))

    useEffect(() => {
        if (selectedValue != null) {
            setSelect(selectedValue)
        }
    }, [isVisible])

    return (
        <Modal 
            isVisible={isVisible} 
            onSwipeComplete={onSwipeComplete} 
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
                    <Gap marginBottom={responsive(36)}/>
                    <Ionicons name="close-circle" size={24} color={colors.grey} onPress={onBackdropPress}/>
                </View>
                {searchable &&
                <>
                    <Gap marginBottom={responsive(16)}/>
                    <Input
                        placeholder={'Search'}
                        value={input}
                        onChangeText={(val) => {
                            setInput(val)
                        }}
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
                                    if (isConfirmation) {
                                        onConfirm(item)
                                    }
                                    if (isMultiSelect) {
                                        onMultiSelect(item)
                                    }
                                    setSelect(item)
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
                                <View 
                                    style={
                                        [
                                            justifyContent.view_center, customStyle.box,
                                            {
                                                borderWidth: isMultiSelect ? item?.isChecked ?  2 : 1 : select?.name == item?.name ? 2 : 1,
                                                borderColor: isMultiSelect ? item?.isChecked ?  colors.primary : colors.grey_3 : select?.name == item?.name ? colors.primary : colors.grey_2,
                                            }
                                        ]
                                    }
                                    >
                                    <View 
                                        style={[
                                            justifyContent.view_center, 
                                            customStyle.box2, 
                                            {
                                                backgroundColor: isMultiSelect ? item?.isChecked ?  colors.primary : colors.grey_3
                                                : select?.name == item?.name ? colors.primary : colors.grey_3
                                            }
                                        ]}
                                    >
                                        {item?.isChecked ?
                                        <Octicons name="check" size={responsive(13)} color={'white'} />
                                        : select?.name == item?.name ?
                                        <Octicons name="check" size={responsive(13)} color={'white'} />
                                        :
                                        null
                                        }
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                />
                <Gap marginBottom={responsive(72)}/>
                {!isConfirmation &&
                <View style={[customStyle.absolute, {paddingHorizontal: responsive(16), bottom: responsive(34)}]}>
                    <Button
                        tittle={'Konfirmasi'}
                        onPress={() => {
                            if (select === null) {
                                Nontification(`Pilih ${tittle}`)
                            }
                            else {
                                onConfirm(select)
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
        borderTopRightRadius: responsive(16),
        borderTopLeftRadius: responsive(16),
        paddingHorizontal: responsive(16),
        paddingTop: responsive(12)
    },
})
