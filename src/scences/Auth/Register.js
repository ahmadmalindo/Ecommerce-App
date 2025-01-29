import { useFocusEffect } from "@react-navigation/native"
import { Button, Container, Gap, Header, HeaderBack, Input } from "components/global"
import { storage } from "helper"
import React, { useState } from "react"
import { InteractionManager, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { colors } from "utils/colors"
import { stylesFonts } from "utils/fonts"
import { responsive } from "utils"
import { supabase } from "helper/supabase"
import { Nontification } from "helper"

function Register({ navigation }) {

    const [isLoading, setIsloading] = useState(false)
    const [input, setInput] = useState({
        fullname: __DEV__ ? "INDO" : "",
        email: __DEV__ ? "ahmadmalindo05@gmail.com" : "",
        password: __DEV__ ? "123456" : "",
        isOpen: true
    })

    const handleRegister = async () => {
        setIsloading(true)
        let params = {
            fullname: input?.fullname,
            email: input?.email,
            password: input?.password,
        }

        let { data, error } = await supabase.auth.signUp(params)

        if (error) {
            Nontification(error.message)
        }

        let { data : users, error: error_users } = await supabase
        .from('users')
        .insert([
            {...params, user_id: data.user.id}
        ])
        .select()

        setIsloading(false)
              
        if (error_users) {
            Nontification(error_users.message)
        }
        
        if (users) {
            Nontification("Register anda berhasil, silahkan cek email anda", [
                {
                    text: 'Ok',
                    onPress: () => {
                        navigation.goBack()
                    }
                }
            ])
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
            <Gap paddingHorizontal={responsive(16)} paddingTop={responsive(16)}>
                <HeaderBack onBack={() => navigation.goBack()}/>
            </Gap>
            <ScrollView>
                <View style={{paddingTop: responsive(8), paddingHorizontal: responsive(16)}}>
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
                        onPressRegister={() => handleRegister()}
                    />
                </View>
            </ScrollView>
        </Container>
    )
}

function SectionTittle () {
    return (
        <View style={{alignItems: 'center'}}>
            <Text style={stylesFonts.Display_2}>Register</Text>
            <Text style={[stylesFonts.Subtittle_2_Regular]}>Create Your Account Now</Text>
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
                tittle={'Fullname'}
                placeholder={'Masukkan fullname anda'}
                value={input.fullname}
                onChangeText={(val) => setInput({
                    ...input,
                    fullname: val
                })}
            />
            <Gap marginBottom={responsive(16)}/>
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
    onPressRegister,
    isLoading
}) {

    return (
        <>
            <Button
                isLoading={isLoading}
                tittle={"Register"}
                onPress={() => onPressRegister()}
            />
        </>
    )
}

export default Register

const styles = StyleSheet.create({
})