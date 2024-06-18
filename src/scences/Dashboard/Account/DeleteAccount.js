import { Container, HeaderBack } from "components/global"
import { Nontification } from "helper"
import React, { useState } from "react"
import { ActivityIndicator, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { colors, justifyContent, radius, responsive, stylesFonts } from "utils/index"

function DeleteAccount({ navigation, route }) {

    return (
        <Container backgroundColor={'white'}>
            <View style={{paddingTop: responsive(16), paddingHorizontal: responsive(16)}}>
                <HeaderBack
                    tittle={'Hapus Akun'}
                    onBack={() => navigation.goBack()}
                />
            </View>
            <ScrollView>
                <View style={{paddingTop: responsive(42), paddingHorizontal: responsive(16)}}>

                </View>
            </ScrollView>
        </Container>
    )
}

export default DeleteAccount

const styles = StyleSheet.create({
})