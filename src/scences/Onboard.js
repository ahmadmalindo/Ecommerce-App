import { Button, Container, Gap } from "components/global"
import React from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import MMKVStorage from "react-native-mmkv-storage"
import normalize from "react-native-normalize"
import { fonts, stylesFonts } from "utils/fonts"

function Onboard({ navigation }) {

    const storage = new MMKVStorage.Loader().initialize()

    // storage.clearMemoryCache()
    // storage.clearStore()

    const isLogin = storage.getBool("isLogin")

    return (
        <ScrollView>
            <Image source={require ('assets/images/ic_onboard.png')} resizeMethod="scale" resizeMode="contain" style={styles.img}/>
            <View style={{padding: normalize(16)}}>
                <Text style={[stylesFonts.Heading_2, {fontSize: normalize(22), fontFamily: fonts.bold, lineHeight: normalize(40)}]}>Kebutuhan untuk menunjang kecantikanmu, semua tersedia{'\n'}di MySalon 💅🏻</Text>
                <Gap marginBottom={normalize(24)}/>
                <Button
                    border
                    tittle="Masuk Ke Akun Saya"
                    onPress={() => {
                        navigation.navigate("AuthNavigation")
                    }}
                />
            </View>
        </ScrollView>
    )
}

export default Onboard

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: normalize(486),
    }
})