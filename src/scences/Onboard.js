import { Button, Container, Gap } from "components/global"
import { storage } from "helper/storage"
import React, { useEffect, useRef, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { SCREEN_WIDTH } from "react-native-normalize"
import { responsive } from "utils"
import { colors, justifyContent } from "utils/index"
import { fonts, stylesFonts } from "utils/fonts"
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming, Easing, interpolateColor } from "react-native-reanimated"

function Onboard({ navigation }) {

    const isLogin = storage.getBool("isLogin")

    return (
        <Container>
                <ScrollView>
                    <Gap marginBottom={responsive(56)}/>
                </ScrollView>
        </Container>
    )
}

export default Onboard;

const styles = StyleSheet.create({
})