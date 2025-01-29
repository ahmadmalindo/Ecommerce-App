import { Button, Container, Gap } from "components/global"
import { storage } from "helper/storage"
import React, { useEffect, useRef, useState } from "react"
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native"
import { BlurView } from 'expo-blur';
import { SCREEN_HEIGHT } from "react-native-normalize";
import { colors, responsive, stylesFonts } from "utils/index";
import { AntDesign } from "@expo/vector-icons";

function Onboard({ navigation }) {

    return (
        <ImageBackground
            source={require('assets/images/ic_bg_onboard.png')}
            style={StyleSheet.absoluteFill}
        >
            <BlurView intensity={40} style={{width: '50%', height: SCREEN_HEIGHT, alignItems: 'center'}}>
                <Container >
                    <ScrollView>
                        <Gap marginBottom={responsive(16)}/>
                        <Text style={[stylesFonts.Subtittle_2_Medium]}>OUR FASHION</Text>
                        <Gap marginBottom={responsive(200)}/>
                        <Text style={[stylesFonts.Heading_1]}>shop the{'\n'}most{'\n'}modern{'\n'}essensials</Text>
                        <Gap marginBottom={responsive(10)}/>
                        <AntDesign name="arrowright" size={responsive(20)} color={colors.black} />
                        <Gap marginBottom={responsive(24)}/>
                        <View style={{width: '100%'}}>
                            <Button
                                tittle={"Get Started"}
                                cutomBackgroundColor={colors.black}
                                onPress={() => {
                                    navigation.navigate("AuthNavigation")
                                }}
                            />
                        </View>
                    </ScrollView>
                </Container>
            </BlurView>
        </ImageBackground>
    )
}

export default Onboard;

const styles = StyleSheet.create({
})