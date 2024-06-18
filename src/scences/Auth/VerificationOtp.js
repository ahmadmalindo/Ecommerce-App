import { Button, Container, Gap, HeaderBack } from "components/global"
import { Nontification } from "helper"
import { storage } from "helper/storage"
import React, { useEffect, useState } from "react"
import { Alert, Image, InteractionManager, Platform, ScrollView, StyleSheet, Text, View } from "react-native"
import { radius } from "utils/radius"
import eagleVisionPro from "utils/ApiUtils"
import { colors } from "utils/colors"
import { fonts, stylesFonts } from "utils/fonts"
import { justifyContent } from "utils/justifyContent"
import OTPTextView from 'react-native-otp-textinput';
import { useFocusEffect } from "@react-navigation/native"
import BackgroundTimer from 'react-native-background-timer';
import { formatCountDown } from "helper"
import { responsive } from "utils"

function VerificationOtp({ navigation, route }) {

    const { data } = route.params

    const [isLoading, setIsloading] = useState(false)
    const [time, setTime] = useState(60);
    const [otp, setOtp] = useState({
        otp: '',
    })

    const handleVerifyOtp = async () => {
        navigation.navigate("ResetPassword")
    }

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {

          });
      
          return () => task.cancel();
        }, [navigation])
      );

    useEffect(() => {
        let timerId
        let timerIdIOS
        if (Platform.OS === "android") {
            timerId = BackgroundTimer.setInterval(() => {
                if (time > 0) {
                    setTime(time - 1)
                }
    
                if (time == 0) {
                    clearInterval(timerId)
                }
            }, 1000);

        }
        else {
            timerIdIOS = setInterval(() => {
                if (time > 0) {
                    setTime(time - 1)
                }
    
                if (time == 0) {
                    clearInterval(timerIdIOS)
                }
            }, 1000);
        }

        return () => {
            if (Platform.OS == "android") {
                BackgroundTimer.clearInterval(timerId)
            }
            else {
                clearInterval(timerIdIOS)
            }
        };
        
    }, [time])

    return (
        <Container backgroundColor={'white'}>
            <ScrollView>
                <View style={{paddingTop: responsive(24), paddingHorizontal: responsive(16)}}>
                    <HeaderBack onBack={() => navigation.goBack()}/>
                    <Gap marginBottom={responsive(32)}/>
                    <SectionTittle/>
                    <Gap marginBottom={responsive(24)}/>
                    <SectionOtp
                        otp={otp}
                        setOtp={setOtp}
                        time={time}
                    />
                    <Gap marginBottom={responsive(16)}/>
                    <Text onPress={() => {navigation.goBack()}} style={[stylesFonts.Subtittle_2_Regular, {color: colors.grey, textAlign: 'center'}]}>Tidak mendapatkan kode? <Text style={{fontFamily: fonts.medium, color: colors.primary}}>Kirim Ulang</Text></Text>
                    <Gap marginBottom={responsive(32)}/>
                    <SectionButton
                        isLoading={isLoading}
                        onPress={() => {
                            handleVerifyOtp()
                        }}
                    />
                </View>
            </ScrollView>
        </Container>
    )
}

function SectionTittle () {
    return (
        <View style={{alignItems: 'center'}}>
            <Text style={[stylesFonts.Heading_2]}>Silahkan cek email anda</Text>
            <Gap marginBottom={responsive(4)}/>
            <Text style={[stylesFonts.Subtittle_2_Medium, {color: colors.grey, textAlign: 'center'}]}>Kami sudah mengirimkan kode OTP ke email{'\n'}
                <Text style={{fontFamily: fonts.bold, color: colors.black}}>erickbastian@eaglevision.com</Text>
            </Text>
        </View>
    )
}

function SectionOtp ({
    otp,
    setOtp,
    time,
}) {
    return (
        <View>
            <Gap marginBottom={responsive(12)}/>
            <OTPTextView 
                ref={e => ''} 
                inputCount={6}
                handleTextChange={(val) => setOtp({
                    ...otp,
                    otp:val
                })}
                tintColor={colors.primary}
                offTintColor={colors.grey_2}
                textInputStyle={{borderRadius: responsive(12), borderWidth: 1, backgroundColor: 'white', borderColor: colors.grey}}
            />
        </View>
    )
}

function SectionButton({
    onPress,
    isLoading
}) {

    return (
        <>
            <Button
                isLoading={isLoading}
                tittle={"Verifikasi"}
                onPress={onPress}
            />
        </>
    )
}

export default VerificationOtp

const styles = StyleSheet.create({

})