import { useFocusEffect } from "@react-navigation/native"
import { Button, Container, Gap, Header, Input } from "components/global"
import { storage } from "helper"
import React, { useState } from "react"
import { InteractionManager, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { colors } from "utils/colors"
import { stylesFonts } from "utils/fonts"
import { responsive } from "utils"

function Login({ navigation }) {

    const [isLoading, setIsloading] = useState(false)
    const [input, setInput] = useState({
        username: __DEV__ ? "storemanager" : "",
        password: __DEV__ ? "storemanager" : "",
        isOpen: true
    })

    const handleLogin = async () => {
        navigation.navigate("DashboardNavigation")
    }

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {
            
          });
      
          return () => task.cancel();
        }, [navigation])
      );

    return (
        <Container backgroundColor={'#F8FAFC'}>
            <ScrollView>
                <View style={{paddingTop: responsive(24), paddingHorizontal: responsive(16)}}>
                    <Gap marginBottom={responsive(32)}/>
                    <SectionTittle/>
                    <Gap marginBottom={responsive(56)}/>
                    <SectionFormInput
                        input={input}
                        setInput={setInput}
                    />
                    <Gap marginBottom={responsive(8)}/>
                    <Text 
                        style={[stylesFonts.Subtittle_2_Regular, {color: colors.primary, textAlign: 'right'}]}
                        onPress={() => {
                            navigation.navigate("ForgotPassword")
                        }}
                    >
                        Lupa Kata Sandi?
                    </Text>
                    <Gap marginBottom={responsive(24)}/>
                    <SectionButton
                        isLoading={isLoading}
                        onPressLogin={() => handleLogin()}
                    />
                </View>
            </ScrollView>
        </Container>
    )
}

function SectionTittle () {
    return (
        <View style={{alignItems: 'center'}}>
            <Text style={stylesFonts.Subtittle_1_SemiBold}>Masuk Akun</Text>
            <Text style={[stylesFonts.Body_2_Regular, {color: colors.grey}]}>Silahkan masuk dengan username</Text>
        </View>
    )
}

function SectionFormInput ({
    input,
    setInput
}) {
    return (
        <>
            <Input
                tittle={'Username'}
                placeholder={'Masukkan username anda'}
                value={input.username}
                onChangeText={(val) => setInput({
                    ...input,
                    username: val
                })}
            />
            <Gap marginBottom={responsive(16)}/>
            <Input
                tittle={'Kata Sandi'}
                placeholder={'Masukkan kata sandi'}
                password
                secureTextEntry={input.isOpen}
                onPress={() => setInput({
                    ...input,
                    isOpen: !input.isOpen
                })}
                value={input.password}
                onChangeText={(val) => setInput({
                    ...input,
                    password: val
                })}
            />
        </>
    )
}

function SectionButton({
    onPressLogin,
    isLoading
}) {

    return (
        <>
            <Button
                isLoading={isLoading}
                tittle={"Masuk"}
                onPress={() => onPressLogin()}
            />
        </>
    )
}

export default Login

const styles = StyleSheet.create({
})