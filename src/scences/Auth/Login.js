import { useFocusEffect } from "@react-navigation/native"
import { Button, Container, Gap, Header, Input } from "components/global"
import { storage } from "helper/storage"
import React, { use, useState } from "react"
import { InteractionManager, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { colors } from "utils/colors"
import { stylesFonts } from "utils/fonts"
import { responsive } from "utils"
import { supabase } from "helper/supabase"
import { Nontification } from "helper"

function Login({ navigation }) {

    const [isLoading, setIsloading] = useState(false)
    const [input, setInput] = useState({
        email: __DEV__ ? "ahmadmalindo05@gmail.com" : "",
        password: __DEV__ ? "123456" : "",
        isOpen: true
    })

    const handleLogin = async () => {
        setIsloading(true)

        let params = {
            email: input?.email,
            password: input?.password,
        }

        let { error } = await supabase.auth.signInWithPassword(params)

        setIsloading(false)

        if (error) {
            Nontification(error.message)
        }
        else {
            let { data: { user } } = await supabase.auth.getUser()
            
            let { data, error: error_users } = await supabase
            .from("users")
            .select("*")
            .eq("user_id", user.id)
            .limit(1)
            .single()
    
            if (error_users) {
                Nontification(error_users.message)
            }
    
            if (data) {
                storage.setBool("isLogin", true)
                storage.setMap("storageUser", data)   
                navigation.navigate("DashboardNavigation")
            }
        }
    }

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {
            
          });
      
          return () => task.cancel();
        }, [navigation])
      );

    return (
        <Container backgroundColor={'white'}>
            <ScrollView>
                <View style={{paddingTop: responsive(24), paddingHorizontal: responsive(16)}}>
                    <Gap marginBottom={responsive(66)}/>
                    <SectionTittle/>
                    <Gap marginBottom={responsive(56)}/>
                    <SectionFormInput
                        input={input}
                        setInput={setInput}
                    />
                    <Gap marginBottom={responsive(16)}/>
                    <Text 
                        style={[stylesFonts.Subtittle_2_Regular, {color: colors.black, textAlign: 'right'}]}
                        onPress={() => {
                            navigation.navigate("ForgotPassword")
                        }}
                    >
                        Lupa Kata Sandi?
                    </Text>
                    <Gap marginBottom={responsive(36)}/>
                    <SectionButton
                        isLoading={isLoading}
                        onPressLogin={() => handleLogin()}
                        onPressRegister={() => navigation.navigate("Register")}
                    />
                </View>
            </ScrollView>
        </Container>
    )
}

function SectionTittle () {
    return (
        <View style={{alignItems: 'center'}}>
            <Text style={stylesFonts.Display_2}>Login</Text>
            <Text style={[stylesFonts.Subtittle_2_Regular]}>Welcome Back Shoppers!</Text>
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
                tittle={'Email'}
                placeholder={'Masukkan email anda'}
                value={input.email}
                onChangeText={(val) => setInput({
                    ...input,
                    email: val
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
    onPressRegister,
    isLoading
}) {

    return (
        <>
            <Button
                isLoading={isLoading}
                tittle={"Masuk"}
                onPress={() => onPressLogin()}
            />
            <Gap marginBottom={responsive(16)}/>
            <Button
                tittle={"Register"}
                cutomBackgroundColor="white"
                customBorderColor={colors.primary}
                customBorderWidth={1.5}
                customColorText={colors.primary}
                onPress={onPressRegister}
            />
        </>
    )
}

export default Login

const styles = StyleSheet.create({
})