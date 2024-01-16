import { Button, Container, Gap, Header, Input } from "components/global"
import { Nontification } from "helper"
import React, { useState } from "react"
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import normalize from "react-native-normalize"
import { colors, justifyContent, radius, stylesFonts } from "utils/index"

function EditPassword({ navigation }) {

    const [input, setInput] = useState({
        password: "",
        isOpen: true,
        password2: "",
        isOpen2: true,
        password3: "",
        isOpen3: true,
    })

    return (
        <Container backgroundColor={'white'}>
            <View style={{paddingTop: normalize(16), paddingHorizontal: normalize(16)}}>
                <Header
                    tittle={'Ubah Kata Sandi'}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <ScrollView>
                <View style={{paddingTop: normalize(42), paddingHorizontal: normalize(16)}}>
                    <Text style={stylesFonts.Body_1_Regular}>Silahkan buat kata sandi baru</Text>
                    <Gap marginBottom={normalize(16)}/>
                    <SectionForm
                        input={input}
                        setInput={setInput}
                    />
                    <Gap marginBottom={normalize(24)}/>
                    <Button
                        tittle={'Simpan'}
                        onPress={() => Nontification('Simpan')}
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
                tittle={'Kata Sandi Lama'}
                placeholder={'Masukkan kata sandi lama'}
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
            <Gap marginBottom={normalize(16)}/>
            <Input
                tittle={'Kata Sandi Baru'}
                placeholder={'Masukkan kata sandi baru'}
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
            <Gap marginBottom={normalize(16)}/>
            <Input
                tittle={'Konfirmasi Sandi Baru'}
                placeholder={'Masukkan konfirmasi sandi baru'}
                password
                secureTextEntry={input.isOpen3}
                onPress={() => setInput({
                    ...input,
                    isOpen3: !input.isOpen3
                })}
                value={input.password3}
                onChangeText={(val) => setInput({
                    ...input,
                    password3: val
                })}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        width: normalize(32),
        height: normalize(32),
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    icon2: {
        width: normalize(24),
        height: normalize(24)
    }
})