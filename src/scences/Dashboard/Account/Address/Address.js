import { Feather } from "@expo/vector-icons"
import { useFocusEffect } from "@react-navigation/native"
import { Button, Container, Gap, HeaderBack, Input, Selection } from "components/global"
import ModalSelect from "components/global/Modal/ModalSelect"
import { useModal } from "context/modalContext"
import { Nontification } from "helper"
import { storage } from "helper/storage"
import { supabase } from "helper/supabase"
import React, { useState } from "react"
import { Alert, FlatList, Image, InteractionManager, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import apiRajaOngkir from "utils/ApiRajaOngkirUtils"
import { colors, justifyContent, radius, responsive, stylesFonts } from "utils/index"

function Address({ navigation }) {

    const storageUser = storage.getMap("storageUser")

    const [isLoading, setIsLoading] = useState(false)

    const [listsAddress, setListsAddress] = useState([])

    const getAddress = async () => {
        setIsLoading(true)
        
        const res = await supabase
        .from('shipping_address')
        .select()
        .eq('user_id', storageUser?.user_id)
        .eq('is_deleted', false)
        .order('id', {ascending: false})

        setIsLoading(false)

    
        if (res.error) {
            Nontification(res?.error?.message)
        }
        else {
            setListsAddress(res.data)
        }
    }

    const handleDelete = async (item) => {
        setIsLoading(true)

        const res = await supabase
        .from('shipping_address')
        .update({is_deleted: true})
        .eq('id', item?.id)
        .select()

        setIsLoading(false)

    
        if (res.error) {
            Nontification(res?.error?.message)
        }
        else {
            getAddress()
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            const task = InteractionManager.runAfterInteractions(() => {
                getAddress()
            });
        
            return () => task.cancel();
        }, [navigation])
    );
    

    return (
        <Container backgroundColor={'white'}>
            <View style={{paddingTop: responsive(16), paddingHorizontal: responsive(16)}}>
                <HeaderBack
                    tittle={'Alamat'}
                    onBack={() => navigation.goBack()}
                />
            </View>
            <ScrollView>
                <Gap marginBottom={responsive(24)}/>
                <FlatList
                    data={listsAddress}
                    style={{paddingHorizontal: responsive(16)}}
                    renderItem={(({item}) => {
                        return (
                            <View 
                                style={[justifyContent.space_beetwen, {
                                    padding: responsive(16),
                                }]}
                            >
                                <View>
                                    <Text style={[stylesFonts.Body_1_SemiBold]}>{item?.name}</Text>
                                    <Text style={[stylesFonts.Subtittle_2_Regular]}>{item?.address}</Text>
                                </View>
                                <View style={justifyContent.flex_end}>
                                    <Feather 
                                        onPress={() => {
                                            handleDelete(item)
                                        }}
                                        name="trash-2" size={responsive(20)} color={colors.red_2} 
                                    />
                                </View>
                            </View>
                        )
                    })}
                />
            </ScrollView>
        </Container>
    )
}

export default Address

const styles = StyleSheet.create({
})