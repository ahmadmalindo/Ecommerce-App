import { AntDesign, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons"
import { useFocusEffect } from "@react-navigation/native"
import { Button, Container, Gap, Selection } from "components/global"
import HeaderApp from "components/global/Header/HeaderApp"
import { currencyFloat } from "helper"
import { listsStatus } from "helper/FunctionGlobal"
import { Nontification } from "helper"
import { supabase } from "helper/supabase"
import React, { useEffect, useState } from "react"
import { FlatList, Image, InteractionManager, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "react-native-normalize"
import { colors, justifyContent, responsive, stylesFonts } from "utils/index"
import { storage } from "helper/storage"
import { useModal } from "context/modalContext"
import ModalSelect from "components/global/Modal/ModalSelect"
import ModalListsAddress from "components/global/Modal/ModalListsAddress"

function Checkout({ navigation, route }) {

    const {data} = route?.params

    const storageUser = storage.getMap("storageUser")

    const [isLoading, setIsLoading] = useState(false) 
    const [selectAddress, setSelectAddress] = useState(null)  

    const createOrder = async () => {
        setIsLoading(true)
        let paramsOrder = {
            total_amount: data?.total_amount,
            shipping_address: selectAddress?.id,
            order_status: listsStatus['pending'],
            payment_status: listsStatus['unpaid'],
            user_id: storageUser?.user_id
        }


        const { data: orders, error } = await supabase
        .from('orders')
        .insert([
            paramsOrder,
        ])
        .select()
        .single()
        
        if (error) {
            Nontification(error.message)
        }
        else {
            const paramsOrderItems = data?.data?.map(item => {
                return ({
                    order_id: orders?.order_id,
                    product_id: item?.product_id,
                    variant_id: item?.variant_id,
                    quantity: item?.quantity,
                    price: parseInt(item?.quantity) * parseFloat(item?.products?.price)
                })
            })


            const { data: order_items, error } = await supabase
            .from('order_items')
            .insert(paramsOrderItems)
            .select()

            setIsLoading(false)
            
            if (error) {
                Nontification(error.message)
            }
            else {
                const listsCart = data?.data?.map(item => item?.cart_id)
                const {error} = await supabase
                .from('cart')
                .delete()
                .in('cart_id', listsCart)

                if (error) {
                    Nontification(error.message)
                }
                else {
                    Nontification("Order berhasil dibuat terimakasih", [
                        {
                            text: 'Oke',
                            onPress: () => {
                                navigation.replace("Home")
                            }
                        }
                    ])
                }
            }
        }
    }

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {
          });
      
          return () => task.cancel();
        }, [navigation])
    );

    useEffect(() => {

    }, [])

    const onRefresh = React.useCallback(() => {
        setIsLoading(true);
        
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
      }, []);

    return (
        <Container backgroundColor={'white'}>
            <HeaderApp
                title={"Checkout"}
                onBack={() => {
                    navigation.goBack()
                }}
                customViewStyle={<View></View>}
            />
            <ScrollView 
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                }
                style={{
                    minHeight: SCREEN_HEIGHT,
                }}
            >
                <Gap>
                    <Gap marginBottom={responsive(16)}/>
                    <SectionListsCart
                        data={data?.data}
                    />
                    <Gap marginBottom={responsive(16)}/>
                    <SectionForm
                        selectAddress={selectAddress}
                        setSelectAddress={setSelectAddress}
                    />
                    <Gap marginBottom={responsive(296)}/>
                </Gap>
            </ScrollView>
            <View style={[{position: 'absolute', bottom: responsive(0), paddingHorizontal: responsive(16), minHeight: 1, paddingBottom: 0, padding: responsive(16), backgroundColor: 'white', width: '100%'}]}>
                <View style={justifyContent.space_beetwen}>
                    <Text style={[stylesFonts.Subtittle_2_Regular]}>Admin</Text>
                    <Text style={[stylesFonts.Subtittle_2_SemiBold]}>{currencyFloat(0)}</Text>
                </View>
                <Gap marginBottom={responsive(4)}/>
                <View style={justifyContent.space_beetwen}>
                    <Text style={[stylesFonts.Subtittle_2_Regular]}>Total Pembayaran</Text>
                    <Text style={[stylesFonts.Subtittle_2_SemiBold]}>{currencyFloat(data?.total_amount)}</Text>
                </View>
                <Gap marginBottom={responsive(12)}/>
                <Button
                    isLoading={isLoading}
                    tittle={"Bayar"}
                    onPress={() => {
                        if (selectAddress != null) {
                            if (!isLoading) {
                                createOrder()
                            }
                        }
                        else {
                            Nontification("Pilih alamat dahulu")
                        }
                    }}
                />
                <Gap marginBottom={responsive(24)}/>
            </View>
        </Container>
    )
}

export default Checkout;

function SectionListsCart ({
    data,
}) {
    return (
        <>
            <FlatList
                style={{
                    paddingHorizontal: responsive(16)
                }}
                data={data}
                renderItem={(({item, index}) => {
                    return (
                        <View 
                            onPress={() => {

                            }}
                            style={[justifyContent.space_beetwen, {marginBottom: responsive(16)}]}
                        >
                            <View style={[justifyContent.flex_start]}>
                                <Image
                                    source={{uri: item?.products?.image_url}}
                                    style={{
                                        width: responsive(86),
                                        height: responsive(86),
                                        backgroundColor: colors.grey_2
                                    }}
                                    resizeMethod="resize"
                                    resizeMode="cover"
                                    borderRadius={responsive(14)}
                                />
                                <Gap marginRight={responsive(16)}/>
                                <View>
                                    <Text style={[stylesFonts.Subtittle_2_SemiBold,{width: responsive(166)}]} numberOfLines={2}>{item?.products.name}</Text>
                                    <View style={justifyContent.flex_start}>
                                        <Text style={[stylesFonts.Subtittle_1_SemiBold]}>{currencyFloat(parseFloat(item?.products?.price))}</Text>
                                        <Gap marginRight={responsive(8)}/>
                                        <View
                                            style={[justifyContent.center, {
                                                width: responsive(28),
                                                height: responsive(28),
                                                backgroundColor: item?.product_variants?.color,
                                                borderRadius: 100
                                            }]}
                                        >
                                            <Text style={[stylesFonts.Body_2_Medium, {color: 'white'}]}>{item?.product_variants?.size}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={justifyContent.center}>
                                <Text style={[stylesFonts.Subtittle_2_SemiBold]}>{item?.quantity}</Text>
                            </View>
                        </View>
                    )
                })}
            />
        </>
    )
}

function SectionForm ({
    selectAddress,
    setSelectAddress
}) {

    const storageUser = storage.getMap("storageUser")

    const { showModal, hideModal } = useModal();

    const [isLoading, setIsLoading] = useState(false)
    const [listsAddress, setListsAddress] = useState([])

    const getAddress = async () => {
        showModal("modalPilihAlamat")
        setIsLoading(true)

        let { data: shipping_address, error } = await supabase
        .from('shipping_address')
        .select('*')
        .eq('user_id', storageUser?.user_id)

        setIsLoading(false)

        if (error) {
            Nontification(error.message)
        }
        else {
            setListsAddress(shipping_address)
        }
    }

    return (
        <View style={{paddingHorizontal: responsive(16)}}>
            <Selection
                tittle={"Pilih Alamat"}
                placeHolder={selectAddress != null ? selectAddress?.name : "Pilih Alamat"}
                customTextColor={selectAddress != null ? colors.black : colors.grey}
                onPress={() => {
                    getAddress()
                }}
            />
            <ModalListsAddress
                isConfirmation
                tittle="Pilih Alamat"
                isLoading={isLoading}
                modalId="modalPilihAlamat"
                data={listsAddress}
                schemeData={{
                    id: 'id',
                    name: 'name',
                    desc: 'address'
                }}
                onConfirm={(item) => {
                    setSelectAddress(item)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})