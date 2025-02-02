import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons"
import { useFocusEffect } from "@react-navigation/native"
import { Container, Gap } from "components/global"
import HeaderApp from "components/global/Header/HeaderApp"
import { currencyFloat } from "helper"
import { listsStatus } from "helper/FunctionGlobal"
import { Nontification } from "helper"
import { storage } from "helper/storage"
import { supabase } from "helper/supabase"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Image, InteractionManager, RefreshControl, ScrollView, SectionList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "react-native-normalize"
import { colors, justifyContent, responsive, stylesFonts } from "utils/index"

function History({ navigation }) {

    const storageUser = storage.getMap("storageUser")

    const [isLoading, setIsLoading] = useState(false)
    
    const [select, setSelect] = useState({category_id: 1})
    const [listsKategori, setListsKategori] = useState([])

    const [listsHistory, setListsHistory] = useState([])

    const getListsKategori = async () => {
        
        const lists = Object.entries(listsStatus).map((item, index) => {
            return ({
                name: item[0],
                category_id: item[1]
            })
        })

        setSelect(lists[0])
        setListsKategori(lists)
    }

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
            order_status (*),
            payment_status (*)
            `
        )
        .eq('user_id', storageUser?.user_id)
        .eq('order_status', select?.category_id)
        .order('order_id', {ascending: false})

        setIsLoading(false)

        console.log(JSON.stringify(res?.data));
        
    
        if (res.error) {
            Nontification(res?.error?.message)
        }
        else {
            setListsHistory(res.data)
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
        getHistory()
    }, [select.category_id])

    useEffect(() => {
        getListsKategori()
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
                customColorIconBack="white"
                title={"History"}
                onPress={() => {
                    navigation.navigate("Cart")
                }}
            />
            <SectionFilterKategori
                data={listsKategori}
                select={select}
                onSelect={(item) => {
                    setSelect(item)
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
                    <Gap marginBottom={responsive(16)}/>
                    {isLoading &&
                    <>
                        <ActivityIndicator/>
                        <Gap marginBottom={responsive(16)}/>
                    </>
                    }
                    <SectionListsHistory
                        data={listsHistory}
                        onSelect={(item) => {
                            navigation.navigate("DetailHistory", {data: item})
                        }}
                    />
                    <Gap marginBottom={responsive(296)}/>
                </Gap>
            </ScrollView>
        </Container>
    )
}

export default History;

function SectionFilterKategori ({
    data,
    onSelect,
    select
}) {
    return (
        <Gap
            paddingTop={responsive(24)}
            paddingHorizontal={responsive(16)}
            marginBottom={responsive(16)}
        >
            <FlatList
                horizontal
                data={data}
                renderItem={(({item}) => {
                    return (
                        <TouchableOpacity 
                            style={{marginRight: responsive(16), alignItems: 'center'}}
                            onPress={() => {
                                onSelect(item)
                            }}
                        >
                            <Text style={[stylesFonts.Subtittle_2_Regular, {color: select?.category_id == item.category_id ? colors.black : colors.grey}]}>{item?.name}</Text>
                            {item.category_id == select.category_id &&
                            <Image
                                source={require('assets/images/ic_shape.png')}
                                style={{
                                    width: responsive(6),
                                    height: responsive(6)
                                }}
                            />
                            }
                        </TouchableOpacity>
                    )
                })}
            />
        </Gap>
    )
}

function SectionListsHistory ({
    data,
    onSelect,
}) {
    return (
        <View style={justifyContent.space_beetwen}>
            <FlatList
                data={data}
                style={{
                    paddingHorizontal: responsive(16)
                }}
                keyExtractor={(item, index) => item + index}
                renderItem={(({item: section}) => {
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
                        <TouchableOpacity onPress={() => onSelect(section)}>
                            <View style={justifyContent.space_beetwen}>
                                <View style={justifyContent.flex_start}>
                                    <Text style={[stylesFonts.Subtittle_2_SemiBold]}>Payment :</Text>
                                    <Gap marginRight={responsive(8)}/>
                                    <View 
                                        style={{backgroundColor: Status(section?.payment_status?.id).color, padding: responsive(4), borderRadius: responsive(8)}}
                                    >
                                        <Text style={[stylesFonts.Subtittle_2_SemiBold, {color: 'white'}]}>{section?.payment_status?.name}</Text>
                                    </View>
                                </View>
                                <Text style={[stylesFonts.Subtittle_2_Regular, {color: colors.grey}]}>{moment(section?.created_at).format("DD/MM/YYYY HH:mm")}</Text>
                            </View>
                            <Gap marginBottom={responsive(12)}/>
                            {section?.order_items?.map(item => {
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
                        </TouchableOpacity>
                    )
                })}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})