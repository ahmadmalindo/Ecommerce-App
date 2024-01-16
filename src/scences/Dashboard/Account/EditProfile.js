import { Button, Container, Gap, Header, Input } from "components/global"
import { Nontification } from "helper"
import React, { useState } from "react"
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import normalize from "react-native-normalize"
import { colors, justifyContent, radius, stylesFonts } from "utils/index"

function EditProfile({ navigation }) {

    const [input, setInput] = useState({
        fullname: "",
        numberPhone: ""
    })

    return (
        <Container backgroundColor={'white'}>
            <View style={{paddingTop: normalize(16), paddingHorizontal: normalize(16)}}>
                <Header
                    tittle={'Edit Profil'}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <ScrollView>
                <View style={{paddingTop: normalize(42), paddingHorizontal: normalize(16)}}>
                    <View style={{alignItems: 'center'}}>
                        <SectionProfile
                        />
                    </View>
                    <Gap marginBottom={normalize(24)}/>
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

function SectionProfile ({
    onPress
}){
    return (
        <Pressable style={{alignItems: 'center'}} onPress={onPress}>
            <Image source={require('assets/images/ic_onboard.png')} resizeMethod="scale" resizeMode="cover" style={{width: normalize(80), height: normalize(80), borderRadius: normalize(80)}}/>
            <Image source={require('assets/images/ic_edit.png')} style={styles.icon}/>
        </Pressable>
    )
}

export default EditProfile

function SectionForm ({
    input,
    setInput
}) {
    return (
        <View>
            <Input
                tittle={'Fullname'}
                placeholder={'Ketikan Nama'}
                value={input.fullname}
                onChangeText={(val) => setInput({
                    ...input,
                    fullname: val
                })}
            />
            <Gap marginBottom={normalize(16)}/>
            <Input
                tittle={'No. Telepon'}
                placeholder={'62878123...'}
                left
                costumIcon={<Image source={require('assets/images/ic_electronicdevices.png')} style={styles.icon2}/>}
                keyboardType={'numeric'}
                value={input.numberPhone}
                onChangeText={(val) => setInput({
                    ...input,
                    numberPhone: val
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