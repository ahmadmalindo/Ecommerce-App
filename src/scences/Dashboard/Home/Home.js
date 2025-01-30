import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons"
import { useFocusEffect } from "@react-navigation/native"
import { Container, Gap } from "components/global"
import HeaderApp from "components/global/Header/HeaderApp"
import { currencyFloat } from "helper"
import { Nontification } from "helper"
import { supabase } from "helper/supabase"
import React, { useEffect, useState } from "react"
import { FlatList, Image, InteractionManager, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "react-native-normalize"
import { colors, justifyContent, responsive, stylesFonts } from "utils/index"

function Home({ navigation }) {

    const [isLoading, setIsLoading] = useState(false)
    
    const [select, setSelect] = useState({category_id: -1})
    const [listsKategori, setListsKategori] = useState([])

    const [listsProduk, setListsProduk] = useState([])

    const getListsKategori = async () => {
        
        let { data: categories, error } = await supabase
        .from('categories')
        .select('*')

        if (error) {
            Nontification(error.message)
        }

        if (categories) {
            const data = [{category_id: -1, name: "All"}, ...categories]
            setListsKategori(data)
        }
                
    }

    const getListsProduk = async () => {
        
        let { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq(select?.category_id == -1 ? "" : "category_id", select?.category_id)
    
        
        if (error) {
            Nontification(error.message)
        }

        if (products) {
            setListsProduk(products)
        }
                
    }

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {
            getListsKategori()
          });
      
          return () => task.cancel();
        }, [navigation])
    );

    useEffect(() => {
        getListsProduk()
    }, [select?.category_id])

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
                title={"New Product"}
                onPress={() => {

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
                    <SectionListsProduk
                        data={listsProduk}
                        onSelect={(item) => {
                            alert(JSON.stringify(item))
                        }}
                    />
                    <Gap marginBottom={responsive(296)}/>
                </Gap>
            </ScrollView>
        </Container>
    )
}

export default Home;

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

function SectionListsProduk ({
    data,
    onSelect
}) {
    return (
        <>
            <FlatList
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: 'space-between'
                }}
                style={{
                    paddingHorizontal: responsive(16)
                }}
                data={data}
                renderItem={(({item, index}) => {
                    return (
                        <TouchableOpacity 
                            onPress={() => onSelect?.(item)}
                            style={{width: SCREEN_WIDTH / 2.3, marginBottom: responsive(16), alignItems: 'center'}}
                        >
                            <Image
                                source={{uri: item?.image_url}}
                                style={{
                                    width: '100%',
                                    height: responsive(200),
                                    backgroundColor: colors.grey_2
                                }}
                                resizeMethod="resize"
                                resizeMode="cover"
                                borderRadius={responsive(14)}
                            />
                            <Gap marginBottom={responsive(4)}/>
                            <Text style={[stylesFonts.Subtittle_2_Medium,{textAlign: 'center'}]} numberOfLines={2}>{item?.name}</Text>
                            <Gap marginBottom={responsive(2)}/>
                            <Text style={[stylesFonts.Subtittle_1_SemiBold]}>{currencyFloat(parseFloat(item?.price))}</Text>
                        </TouchableOpacity>
                    )
                })}
            />
        </>
    )
}

const styles = StyleSheet.create({

})