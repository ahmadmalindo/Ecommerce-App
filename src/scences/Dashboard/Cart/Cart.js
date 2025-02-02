import { AntDesign, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons"
import { useFocusEffect } from "@react-navigation/native"
import { Button, Container, Gap } from "components/global"
import HeaderApp from "components/global/Header/HeaderApp"
import { currencyFloat } from "helper"
import { Nontification } from "helper"
import { storage } from "helper/storage"
import { supabase } from "helper/supabase"
import React, { useEffect, useState } from "react"
import { FlatList, Image, InteractionManager, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "react-native-normalize"
import { colors, justifyContent, responsive, stylesFonts } from "utils/index"

function Cart({ navigation }) {

    const storageUser = storage.getMap("storageUser")

    const [isLoading, setIsLoading] = useState(false)
    
    const [listsCart, setListsCart] = useState([])

    const getListsCart = async () => {
        
        let { data: cart, error } = await supabase
        .from('cart')
        .select(
            `*,
            products (*),
            product_variants (*)
            `
        )
        .order('cart_id', {ascending: false})
        .eq('user_id', storageUser?.user_id)

        if (error) {
            Nontification(error.message)
        }

        if (cart) {
            console.log(cart?.map(item => item?.cart_id));
            
            setListsCart(cart)
        }
                
    }

    const handleUpdateQty = async (type, item) => {
        const newQuantity = type === 'min' ? item.quantity - 1 : item.quantity + 1

        const { error } = await supabase
        .from('cart')
        .update({ quantity: newQuantity })
        .eq('cart_id', item?.cart_id)

        if (error) {
            Nontification(error.message)
        }
        else {
            getListsCart()
        }
    }

    const handleDeleteCart = async (item) => {
        const { data: CART, error } = await supabase
        .from('cart')
        .delete()
        .eq('cart_id', item?.cart_id)
        
        if (error) {
            Nontification(error.message)
        }
        else {
            getListsCart()
        }
    }

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {
            getListsCart()
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

    const total_amount = listsCart?.reduce((acc, obj) => acc + parseFloat(obj?.quantity) * parseFloat(obj?.products?.price), 0)

    return (
        <Container backgroundColor={'white'}>
            <HeaderApp
                customColorIconBack="white"
                title={"Keranjang"}
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
                        data={listsCart}
                        onMin={(item) => {
                            if (item?.quantity <= 1) {
                                Nontification("Apakah anda yakin ingin menghapus produk ini?", [
                                    {
                                        text: 'OK',
                                        onPress: () => {
                                            handleDeleteCart(item)
                                        }
                                    },
                                    {
                                        text:'Tidak'
                                    }
                                ])
                            }
                            else {
                                handleUpdateQty('min', item)
                            }
                        }}
                        onAdd={(item) => {
                            if (item?.quantity >= item?.product_variants?.stock) {
                                Nontification("Tidak bisa menambahkan produk stok tidak cukup")
                            }
                            else {
                                handleUpdateQty('add', item)
                            }
                        }}
                    />
                    <Gap marginBottom={responsive(296)}/>
                </Gap>
            </ScrollView>
            <View style={[{position: 'absolute', bottom: responsive(86), paddingHorizontal: responsive(16), minHeight: 1, paddingBottom: 0, padding: responsive(16), backgroundColor: 'white', width: '100%'}]}>
                <View style={justifyContent.space_beetwen}>
                    <Text style={[stylesFonts.Subtittle_2_Regular]}>Total Pembayaran</Text>
                    <Text style={[stylesFonts.Subtittle_2_SemiBold]}>{currencyFloat(total_amount)}</Text>
                </View>
                <Gap marginBottom={responsive(12)}/>
                <Button
                    tittle={"Checkout"}
                    onPress={() => {
                        let data = {
                            data: listsCart,
                            total_amount: total_amount
                        }
                        navigation?.navigate("Checkout", {data: data})
                    }}
                />
                <Gap marginBottom={responsive(12)}/>
            </View>
        </Container>
    )
}

export default Cart;

function SectionListsCart ({
    data,
    onAdd,
    onMin,
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
                                <AntDesign  
                                    onPress={() => {
                                        onMin(item)
                                    }}
                                    name="minuscircle" size={responsive(20)} color={colors.grey} 
                                />
                                <Gap paddingHorizontal={responsive(8)}>
                                    <Text style={[stylesFonts.Subtittle_2_SemiBold]}>{item?.quantity}</Text>
                                </Gap>
                                <AntDesign 
                                    onPress={() => {
                                        onAdd(item)
                                    }}
                                    name="pluscircle" size={responsive(20)} color={colors.black} 
                                />
                            </View>
                        </View>
                    )
                })}
            />
        </>
    )
}

const styles = StyleSheet.create({

})