import { Entypo, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons"
import { useFocusEffect } from "@react-navigation/native"
import { Container, Gap } from "components/global"
import HeaderApp from "components/global/Header/HeaderApp"
import ModalAddToCart from "components/global/Modal/ModalAddToCart"
import { useModal } from "context/modalContext"
import { currencyFloat } from "helper"
import { Nontification } from "helper"
import { storage } from "helper/storage"
import { supabase } from "helper/supabase"
import React, { useEffect, useRef, useState } from "react"
import { FlatList, Image, InteractionManager, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "react-native-normalize"
import { colors, customStyle, fonts, justifyContent, responsive, stylesFonts } from "utils/index"

function DetailProduct({ navigation, route }) {

    const { data } = route.params

    const storageUser = storage.getMap("storageUser")

    const { showModal, hideModal } = useModal();

    const [isLoading, setIsLoading] = useState(false)
    const [detail, setDetail] = useState(null)

    const getDetailProduct = async () => {
        
        let { data: products, error } = await supabase
        .from('products')
        .select(`
            *,
            product_images (
              image_url
            ),
            categories (
                category_id,
                name
            ),
            product_variants (*)
        `)
        .eq("product_id", data?.product_id)
        .single()

        if (error) {
            Nontification(error.message)
        }

        if (products) {
            const product_images = [{image_url: products?.image_url}, ...products?.product_images]
            setDetail({
                ...products,
                product_images: product_images
            })
        }
    }

    const handleAddToCart = async (val) => {
        
        let params = {
            product_id: data?.product_id,
            variant_id: val?.variant_id,
            quantity: val?.quantity,
            user_id: storageUser?.user_id
        }

        const { data : products, error } = await supabase
        .from('cart')
        .insert([
            params
        ])
        .select()

        if (error) {
            Nontification(error.message)
        }
        else {
            Nontification("Sukses Menambahkan ke keranjang", [
                {
                    text: "Ok",
                    onPress: () => {
                        navigation.navigate("Cart")
                    }
                }
            ])
        }
                
    }

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {
            getDetailProduct()
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

    const listsVariant = detail != null ? Object.keys(detail?.product_variants)?.map(item => {
        return ({
            title: detail?.product_variants[item]?.size,
            data: detail?.product_variants?.filter(i => i.size == detail?.product_variants[item]?.size)
        })
    }) : []

    const filterListsVarian = [...new Set(listsVariant?.map(o => JSON.stringify(o)))].map(i => JSON.parse(i))

    return (
        <Container backgroundColor={'white'}>
            <HeaderApp
                title={"Detail Product"}
                onPress={() => {
                    navigation.navigate("Cart")
                }}
                onBack={() => {
                    navigation.goBack()
                }}
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
                    <SectionListsImage 
                        data={detail?.product_images}
                        onAdd={() => {
                            showModal("modalCart")
                        }}
                    />
                    <ModalAddToCart
                        modalId="modalCart"
                        data={filterListsVarian}
                        onConfrim={(val) => {
                            handleAddToCart(val)
                        }}
                    />
                    <Gap marginBottom={responsive(16)}/>
                    <SectionInfo
                        categories={detail?.categories?.name}
                        name={detail?.name}
                        price={detail?.price}
                        description={detail?.description}

                    />
                    <Gap marginBottom={responsive(296)}/>
                </Gap>
            </ScrollView>
        </Container>
    )
}

export default DetailProduct;

function SectionListsImage ({
    data,
    onAdd
}) {
    const flatlistsRef = useRef(null)

    const [indexPage, setIndexPage] = useState(0)

    return (
        <View>
            <FlatList
                ref={flatlistsRef}
                horizontal
                pagingEnabled
                data={data}
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={(info) => {
                    if (info.viewableItems.length > 0) {
                        setIndexPage(info?.viewableItems[0].index)
                    }
                }}
                renderItem={(({item, index}) => {
                    return (
                        <View style={{width: SCREEN_WIDTH}}>
                            <Image
                                source={{uri: item?.image_url}}
                                style={{
                                    width: '100%',
                                    height: responsive(438),
                                    backgroundColor: colors.grey_2
                                }}
                            />
                        </View>
                    )
                })}
            />
            <View style={[justifyContent.center, {position: 'absolute', bottom: 0, marginLeft: responsive(16), marginBottom: responsive(20)}]}>
                <Entypo 
                    onPress={() => {
                        setIndexPage(indexPage > 0 ? indexPage - 1 : 0)
                        flatlistsRef.current.scrollToIndex({index: indexPage > 0 ? indexPage - 1 : 0})
                    }} 
                    name="chevron-left" 
                    size={responsive(30)} 
                    color={colors.black} 
                />
                <Gap marginHorizontal={responsive(4)}/>
                <Entypo 
                    onPress={() => {
                        setIndexPage(indexPage < data?.length - 1 ? indexPage + 1 : data?.length - 1)
                        flatlistsRef.current.scrollToIndex({index: indexPage < data?.length - 1 ? indexPage + 1 : data?.length - 1})
                    }} 
                    name="chevron-right" 
                    size={responsive(30)} 
                    color={colors.black} 
                />
            </View>
            <TouchableOpacity onPress={onAdd} style={[justifyContent.center, {position: 'absolute', right:0, bottom: 0, marginRight: responsive(16), marginBottom: responsive(4)}]}>
                <Image
                    source={require('assets/images/ic_btn_add.png')}
                    style={{
                        width: responsive(50),
                        height: responsive(50)
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}

function SectionInfo ({
    categories,
    name,
    price,
    description
}) {
    return (
        <View style={{paddingHorizontal: responsive(16)}}>
            <Text style={[stylesFonts.Subtittle_2_Regular]}>{categories}</Text>
            <Gap marginBottom={responsive(6)}/>
            <Text style={[stylesFonts.Display_2, {fontSize: responsive(24)}]}>{name}</Text>
            <Gap marginBottom={responsive(4)}/>
            <Text style={[stylesFonts.Subtittle_1_Regular]}>{currencyFloat(price)}</Text>
            <Gap marginBottom={responsive(16)}/>
            <Text style={[stylesFonts.Subtittle_2_Regular]}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})