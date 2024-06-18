import { Button, Container, Gap, HeaderBack, Input } from "components/global"
import { Nontification } from "helper"
import { storage } from "helper/storage"
import React, { useState } from "react"
import { Alert, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { colors, justifyContent, radius, responsive, stylesFonts } from "utils/index"

function EditPassword({ navigation }) {

    const [input, setInput] = useState({
       password: "",
       isOpen: true,
       password2: "",
       isOpen2: true,
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleChangePassword = async () => {
    }

    return (
        <Container backgroundColor={'white'}>
            <View style={{paddingTop: responsive(16), paddingHorizontal: responsive(16)}}>
                <HeaderBack
                    tittle={'Ubah Kata Sandi'}
                    onBack={() => navigation.goBack()}
                />
            </View>
            <ScrollView>
                <View style={{paddingTop: responsive(42), paddingHorizontal: responsive(16)}}>
                    <Text style={stylesFonts.Body_1_Regular}>Silahkan buat kata sandi baru</Text>
                    <Gap marginBottom={responsive(16)}/>
                    <SectionForm
                        input={input}
                        setInput={setInput}
                    />
                    <Gap marginBottom={responsive(24)}/>
                    <Button
                        isLoading={isLoading}
                        tittle={'Simpan'}
                        onPress={() => {
                            if (input.password2 === input.password2) {
                                handleChangePassword()
                            }
                            else {
                                Nontification("Kata Sandi Baru dan Komfirmasi Kata Sandi tidak macth")
                            }
                        }}
                    />
                </View>
            </ScrollView>
        </Container>
    )
}

export default EditPassword

function SectionForm ({
    input,
    setInput
}) {
    return (
        <View>
            <Input
                tittle={'Kata Sandi Baru'}
                placeholder={'Masukkan kata sandi baru'}
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
            <Gap marginBottom={responsive(16)}/>
            <Input
                tittle={'Konfirmasi Sandi Baru'}
                placeholder={'Masukkan konfirmasi sandi baru'}
                password
                secureTextEntry={input.isOpen2}
                onPress={() => setInput({
                    ...input,
                    isOpen2: !input.isOpen2
                })}
                value={input.password2}
                onChangeText={(val) => setInput({
                    ...input,
                    password2: val
                })}
            />
        </View>
    )
}

const styles = StyleSheet.create({
})