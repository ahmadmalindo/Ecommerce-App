import { Container, Gap, Input } from "components/global"
import { Nontification, statusDashboard } from "helper/FunctionGlobal"
import { currencyFloat } from "helper"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Image, ImageBackground, InteractionManager, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import normalize from "react-native-normalize"
import kaveMember from "utils/KaveMemberUtils"
import { colors, fonts, justifyContent, radius, stylesFonts } from "utils/index"
import { useFocusEffect } from "@react-navigation/native"
import { storage } from "helper/storage"

function Artwork({ navigation }) {

    const [isLoading, setIsLoading] = useState(false)
    const [inputSearch, setInputSearch] = useState("")

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
            <View style={{paddingTop: normalize(16), paddingHorizontal: normalize(16)}}>
                
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                }
            >
                <View style={{paddingTop: normalize(24), paddingHorizontal: normalize(16)}}>
                    <Input
                        placeholder={'Search'}
                        left={false}
                        costumIcon={<Image source={require('assets/images/ic_search.png')} style={{width: normalize(24), height: normalize(24)}}/>}
                        value={inputSearch}
                        onChangeText={(val) => {
                            setInputSearch(val)
                        }}
                    />
                    <Gap marginBottom={normalize(24)}/>
                </View>
            </ScrollView>
        </Container>
    )
}

export default Artwork

const styles = StyleSheet.create({
    icon: {
        width: normalize(50),
        height: normalize(50)
    }
})