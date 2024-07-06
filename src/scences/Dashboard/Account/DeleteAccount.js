import { Container, Gap, HeaderBack } from "components/global"
import React, { useState } from "react"
import { ScrollView, StyleSheet } from "react-native"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "react-native-normalize"
import { responsive } from "utils/index"

function DeleteAccount({ navigation, route }) {

    return (
        <>
        <Container backgroundColor={'white'}>
            <Gap
                paddingHorizontal={responsive(16)}
                paddingTop={responsive(16)}
                marginBottom={responsive(16)}
            >
                <HeaderBack
                    tittle={'Hapus Akun'}
                    onBack={() => navigation.goBack()}
                />
            </Gap>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    minHeight: SCREEN_HEIGHT,
                }}
            >
                <Gap paddingTop={responsive(16)}>
                <Gap>

                    <Gap marginBottom={responsive(296)}/>
                </Gap>
                </Gap>
            </ScrollView>
        </Container>
        </>
    )
}

export default DeleteAccount

const styles = StyleSheet.create({
})