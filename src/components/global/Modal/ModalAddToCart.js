import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from "react-native-modal";
import { colors, fonts, justifyContent, radius, responsive, stylesFonts } from 'utils/index';
import { Gap } from '../Gap';
import moment from 'moment';
import { Button } from '../Button';
import { Input } from '../Input';
import { useModal } from 'context/modalContext';
import { Nontification } from 'helper';

const ModalAddToCart = ({ 
    modalId = "",
    data,
    onBackdropPress, 
    onConfrim
}) => {

    const { modals, hideModal } = useModal();
    const modalState = modals[modalId] || { isVisible: false, props: {} };

    const [select, setSelect] = useState(null)
    const [qty, setQty] = useState(1)

    const handleBackdropPress = () => {
        onBackdropPress?.()
        hideModal(modalId);
    };

    return (
        <Modal 
            isVisible={modalState.isVisible} 
            propagateSwipe
            onBackdropPress={handleBackdropPress}
            style={{
                justifyContent: 'flex-end', 
                margin: 0
            }} 
            avoidKeyboard={true}
        >
            <View style={[styles.contentModal]}>
                <View style={justifyContent.space_beetwen}>
                    <Text style={stylesFonts.Body_1_SemiBold}>{"Variasi Produk"}</Text>
                    <Ionicons name="close" size={responsive(24)} color={colors.grey} onPress={handleBackdropPress}/>
                </View>
                <Gap marginBottom={responsive(16)}/>
                <ScrollView>
                    {data?.map(selection => {
                        return (
                            <View>
                                <Text style={[stylesFonts.Subtittle_1_Regular, {width: responsive(90)}]}>Size <Text style={{fontFamily: fonts.semi_bold}}>{selection?.title}</Text></Text>
                                <Gap marginBottom={responsive(8)}/>
                                <View style={[justifyContent.flex_start, {flexWrap: 'wrap', gap:responsive(12)}]}>
                                    {selection?.data?.map(item => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setSelect(item)
                                                }}
                                                style={[justifyContent.center, {
                                                    width: responsive(36),
                                                    height: responsive(36),
                                                    borderRadius: 100,
                                                    backgroundColor: item?.color,
                                                }]}
                                            >
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                                <Gap marginBottom={responsive(8)}/>
                            </View>
                        )
                    })}
                </ScrollView>
                <Gap marginBottom={responsive(16)}/>
                {select != null &&
                <>
                <View style={justifyContent.space_beetwen}>
                    <View style={justifyContent.flex_start}> 
                        <Text style={[stylesFonts.Subtittle_2_Regular]}>Variasi </Text>
                        <Gap marginRight={responsive(8)}/>
                        <View
                            style={[justifyContent.center, {
                                width: responsive(36),
                                height: responsive(36),
                                borderRadius: 100,
                                backgroundColor:select?.color
                            }]}
                        >
                            <Text style={[stylesFonts.Subtittle_2_SemiBold, {color: 'white'}]}>{select?.size}</Text>
                        </View>
                    </View>
                    <View style={justifyContent.center}>
                        <AntDesign  
                            onPress={() => {
                                if (qty <= 1) {
                                    Nontification("Tidak boleh kurang dari 1")
                                }
                                else {
                                    setQty(qty - 1)
                                }
                            }}
                            name="minuscircle" size={responsive(20)} color={colors.grey} 
                        />
                        <Gap paddingHorizontal={responsive(8)}>
                            <Text style={[stylesFonts.Subtittle_2_SemiBold]}>{qty}</Text>
                        </Gap>
                        <AntDesign 
                            onPress={() => {
                                if (qty >= select?.stock) {
                                    Nontification("Stok tidak cukup")
                                }
                                else {
                                    setQty(qty + 1)
                                }
                            }}
                            name="pluscircle" size={responsive(20)} color={colors.black} 
                        />
                    </View>
                </View>
                <Gap marginBottom={responsive(12)}/>
                </>
                }
                <Button
                    tittle={'Tambah ke keranjang'}
                    onPress={() => {
                        if (select != null) {
                            onConfrim?.({
                                variant_id: select?.variant_id,
                                quantity: qty
                            })
                            handleBackdropPress()
                        }
                        else {
                            Nontification("Wajib memilih salah satu variasi")
                        }
                    }}
                />
                <Gap marginBottom={responsive(32)}/>
            </View>
        </Modal>
    )
} 

export default React.memo(ModalAddToCart);

const styles = StyleSheet.create({
    contentModal: {
        backgroundColor: 'white', 
        minHeight: 100,
        maxHeight: 600,
        borderTopRightRadius: responsive(16),
        borderTopLeftRadius: responsive(16),
        paddingHorizontal: responsive(16),
        paddingTop: responsive(12)
    }
})
