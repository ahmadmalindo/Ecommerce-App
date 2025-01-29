import { useFocusEffect } from "@react-navigation/native"
import { Button, Container, Gap } from "components/global"
import React, { useLayoutEffect } from "react"
import { Image, InteractionManager, ScrollView, StyleSheet, Text, View } from "react-native"
import MMKVStorage from "react-native-mmkv-storage"
import { fonts, stylesFonts } from "utils/fonts"

function SplashScreen({ navigation }) {

    const storage = new MMKVStorage.Loader().initialize()

    const isLogin = storage.getBool("isLogin")

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {
            if (isLogin) {
                navigation.navigate('DashboardNavigation')
            }
            else {
                navigation.navigate("Onboard")
            }
          });
      
          return () => task.cancel();
        }, [navigation])
    );

    return (
        null
    )
}

export default SplashScreen

const styles = StyleSheet.create({
})