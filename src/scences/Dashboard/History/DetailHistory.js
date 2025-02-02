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
import moment from "moment"

function DetailHistory({ navigation, route }) {

    const {data} = route?.params

    const storageUser = storage.getMap("storageUser")

    const [isLoading, setIsLoading] = useState(false) 
    const [detail, setDetail] = useState(null)

    const getHistory = async () => {
        setIsLoading(true)
        
        const res = await supabase
        .from('orders')
        .select(
            `*,
            order_items (
                *,
                products (*),
                product_variants (*)
            ),
            shipping_address (*),
            order_status (*),
            payment_status (*)
            `
        )
        .eq('user_id', storageUser?.user_id)
        .eq('order_id', data?.order_id)
        .single()

        setIsLoading(false)

    
        if (res.error) {
            Nontification(res?.error?.message)
        }
        else {
            setDetail(res.data)
        }
                
    }

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {
            getHistory()
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
                title={"Detail History"}
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
                    <SectionListsHistory data={detail}/>
                    <Gap marginBottom={responsive(16)}/>
                    <SectionForm
                        selectAddress={detail?.shipping_address}
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
                    <Text style={[stylesFonts.Subtittle_2_SemiBold]}>{currencyFloat(detail?.total_amount)}</Text>
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

export default DetailHistory;

function SectionListsHistory ({
    data,
}) {

    const Status = (sts) => {
        let s 

        if (sts == listsStatus.unpaid) {
            s = {
                color: colors.orange
            }
        }
        else if (sts == listsStatus.paid) {
            s = {
                color: colors.green
            }
        }
        else {
            s = {
                color: colors.red_2
            }
        }

        return s
    }

    return (
        <View style={{paddingHorizontal: responsive(16)}}>
            <View>
                <View style={justifyContent.space_beetwen}>
                    <View style={justifyContent.flex_start}>
                        <Text style={[stylesFonts.Subtittle_2_SemiBold]}>Payment :</Text>
                        <Gap marginRight={responsive(8)}/>
                        <View 
                            style={{backgroundColor: Status(data?.payment_status?.id).color, padding: responsive(4), borderRadius: responsive(8)}}
                        >
                            <Text style={[stylesFonts.Subtittle_2_SemiBold, {color: 'white'}]}>{data?.payment_status?.name}</Text>
                        </View>
                    </View>
                    <Text style={[stylesFonts.Subtittle_2_Regular, {color: colors.grey}]}>{moment(data?.created_at).format("DD/MM/YYYY HH:mm")}</Text>
                </View>
                <Gap marginBottom={responsive(12)}/>
                {data?.order_items?.map(item => {
                    return (
                        <View 
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
            </View>
        </View>
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
                    // getAddress()
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
                    // setSelectAddress(item)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})