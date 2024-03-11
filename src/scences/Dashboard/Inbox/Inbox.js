import { useFocusEffect } from "@react-navigation/native"
import { Container, Gap, HeaderSection, Input } from "components/global"
import { storage } from "helper/storage"
import React, { useState } from "react"
import { Image, InteractionManager, ScrollView, StyleSheet, View, RefreshControl } from "react-native"
import normalize from "react-native-normalize"
import { colors, fonts, justifyContent, radius, stylesFonts } from "utils/index"

function Inbox({ navigation }) {

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
                        onChangeText={(val) => setInputSearch(val)}
                    />
                    <Gap marginBottom={normalize(24)}/>
                    <HeaderSection tittle={'Pemberitahuan Terbaru'}/>
                    <Gap marginBottom={normalize(24)}/>
                </View>
            </ScrollView>
        </Container>
    )
}

export default Inbox

const styles = StyleSheet.create({
    viewCard: {
        width: '100%',
        height: normalize(70),
        borderRadius: radius.r_16,
        padding: radius.r_16,
        backgroundColor: colors.secondary_2,
        borderWidth: 1,
        borderColor: colors.primary,
        marginBottom: normalize(16),
        paddingHorizontal: normalize(16)
    },
    icon: {
        width: normalize(50),
        height: normalize(50)
    }
})