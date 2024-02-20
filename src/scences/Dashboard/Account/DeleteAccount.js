import { Button, Container, Gap, Header, Input, ModalPickPhoto } from "components/global"
import { Nontification } from "helper"
import React, { useState } from "react"
import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import normalize from "react-native-normalize"
import { colors, justifyContent, radius, stylesFonts } from "utils/index"
import { storage } from "helper/storage"
import { base_uri } from "constants/BASE_URL"
import mySalon from "utils/MySalonUtils"

function DeleteAccount({ navigation, route }) {

    return (
        <Container backgroundColor={'white'}>
            <View style={{paddingTop: normalize(16), paddingHorizontal: normalize(16)}}>
                <Header
                    tittle={'Hapus Akun'}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <ScrollView>
                <View style={{paddingTop: normalize(42), paddingHorizontal: normalize(16)}}>

                </View>
            </ScrollView>
        </Container>
    )
}

export default DeleteAccount

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