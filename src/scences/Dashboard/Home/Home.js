import { useFocusEffect } from "@react-navigation/native"
import { Container } from "components/global"
import { storage } from "helper/storage"
import React, { useEffect, useRef, useState } from "react"
import { Dimensions, InteractionManager, RefreshControl, ScrollView, StyleSheet, View } from "react-native"
import normalize from "react-native-normalize"
import { colors, radius } from "utils/index"

const { width: SCREEN_WIDTH } = Dimensions.get('window')

function Home({ navigation }) {

    const [isLoading, setIsLoading] = useState(false)

    const storePhoneNumber = storage.getString("storePhoneNumber")

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
            <ScrollView 
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                }
            >
                <View style={{paddingTop: normalize(24), paddingHorizontal: normalize(16)}}>
                   
                    
                </View>
            </ScrollView>
        </Container>
    )
}

export default Home

const styles = StyleSheet.create({
    icBg: {
        width: '100%',
        height: normalize(160),
        borderRadius: radius.r_16
    },
    viewInfo: {
        width: '100%',
        height: normalize(48),
        backgroundColor: colors.orange,
        borderRadius: radius.r_10,
        paddingHorizontal: normalize(34)
    },
    viewOrder: {
        minWidth: normalize(127),
        height: normalize(48),
        backgroundColor: colors.primary,
        borderRadius: normalize(100),
        position: 'absolute',
        right: normalize(16),
        bottom: normalize(25),
        paddingHorizontal: normalize(16)
    },
    btnWa: {
        width: normalize(48),
        height: normalize(48),
        backgroundColor: 'white',
        elevation: 3,
        shadowColor: '#CCE3FF66',
        shadowRadius: 10,
        shadowOpacity: 1,
        shadowOffset: {width: 1, height: 1},
        borderRadius: normalize(48),
        position: 'absolute',
        right: normalize(16),
        bottom: normalize(25),
    }
})