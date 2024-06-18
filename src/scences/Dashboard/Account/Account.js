import { Feather } from "@expo/vector-icons"
import { useFocusEffect } from "@react-navigation/native"
import { Container, Gap } from "components/global"
import { storage } from "helper/storage"
import React, { useState } from "react"
import { FlatList, Image, InteractionManager, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import normalize from "react-native-normalize"
import { colors, justifyContent, radius, responsive, stylesFonts } from "utils/index"

function Account({ navigation }) {

    const [isLoading, setIsLoading] = useState(false)

    let profile_menu = [
        {
            tittle: 'Ubah Profil',
            ic: '',
            navigation: 'EditProfile'
        },
        {
            tittle: 'Ganti Password',
            ic: '',
            navigation: 'EditPassword'
        },
        {
            tittle: 'Hapus Akun',
            ic: '',
            navigation: 'DeleteAccount'
        },
        {
            tittle: 'Logout',
            ic: '',
            navigation: 'logout'
        }
    ]

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {

          });
      
          return () => task.cancel();
        }, [navigation])
    );

    const onRefresh = React.useCallback(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <Container backgroundColor={'white'}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                }
            >
                <View style={{paddingTop: normalize(24), paddingHorizontal: normalize(16), alignItems: 'center'}}>
                    <FlatList
                        style={{width: '100%'}}
                        data={profile_menu}
                        renderItem={(({item, index}) => {
                            return (
                                <SectionListMenu
                                    item={item}
                                    index={index}
                                    onPress={() => {
                                        navigation.navigate(item.navigation)
                                    }}
                                />
                            )
                        })}
                    />
                </View>
                <Gap marginBottom={normalize(296)}/>
            </ScrollView>
        </Container>
    )
}

function SectionListMenu ({item, index, onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.card, justifyContent.space_beetwen]} >
            <View style={justifyContent.flex_start}>
                <Image source={item.ic} style={{width: normalize(32), height: normalize(32), marginRight: normalize(12)}}/>
                <Text style={[stylesFonts.Subtittle_2_Regular, {color: colors.black}]}>{item.tittle}</Text>
            </View>
            <Feather name="chevron-right" size={responsive(20)} color={colors.black} />
        </TouchableOpacity>
    )
}

export default Account

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: normalize(48),
        borderRadius: radius.r_16,
        backgroundColor: colors.grey_3,
        paddingHorizontal: normalize(8),
        marginBottom: normalize(12)
    },
})