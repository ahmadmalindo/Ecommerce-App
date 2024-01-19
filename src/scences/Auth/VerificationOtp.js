import { Button, Container, Gap, Header, Input, ModalToast } from "components/global"
import { Nontification } from "helper"
import { storage } from "helper/storage"
import React, { useEffect, useState } from "react"
import { Alert, Image, InteractionManager, Platform, ScrollView, StyleSheet, Text, View } from "react-native"
import normalize from "react-native-normalize"
import { radius } from "utils/radius"
import mySalon from "utils/MySalonUtils"
import { colors } from "utils/colors"
import { stylesFonts } from "utils/fonts"
import { justifyContent } from "utils/justifyContent"
import OTPTextView from 'react-native-otp-textinput';
import { useFocusEffect } from "@react-navigation/native"
import BackgroundTimer from 'react-native-background-timer';
import { formatCountDown } from "helper"

function VerificationOtp({ navigation, route }) {

    const { 
        NoHP,
        Nama,
        Email,
        nPIN,
    } = route.params

    const [isLoading, setIsloading] = useState(false)
    const [modal, setModal] = useState(false)
    const [time, setTime] = useState(60);
    const [otp, setOtp] = useState({
        otp: '',
        otpFromApi: ''
    })

    const getOtp = async () => {
        const res = await mySalon.Otp({NoHP})
        
        if (res.status === 200) {
            setOtp({
                ...otp,
                otpFromApi: res.responseOTP
            })
        }
        else {
            Nontification(res.response)
        }
    }

    const handleVerificationOtp = async () => {
        if (otp.otp === otp.otpFromApi) {
            handleRegister()
        }
        else {
            Nontification('Kode Otp Tidak Valid')
        }
    }

    const handleRegister = async () => {
        setIsloading(true)

        let params = {
            NoHP,
            Nama,
            Email,
            nPIN
        }

        const res = await mySalon.SiginUp(params)

        setIsloading(false)

        if (res.status === 200) {
            setModal(true)
            setTimeout(() => {
                setModal(false)
                navigation.navigate('Login')
            }, 2500)
        }
        else {
            Nontification(res.response)
        }
    }

    useFocusEffect(
        React.useCallback(() => {
          const task = InteractionManager.runAfterInteractions(() => {
            getOtp()
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
                <View style={{paddingTop: normalize(24), paddingHorizontal: normalize(16)}}>
                    <Header onPress={() => navigation.goBack()}/>
                    <Gap marginBottom={normalize(32)}/>
                    <SectionTittle/>
                    <Gap marginBottom={normalize(24)}/>
                    <SectionOtp
                        otp={otp}
                        setOtp={setOtp}
                        time={time}
                    />
                    <Gap marginBottom={normalize(24)}/>
                    <SectionButton
                        isLoading={isLoading}
                        onPress={() => handleVerificationOtp()}
                        onConfirm={() => {
                            if (time === 0) {
                                getOtp()
                            }
                            else {
                                Nontification("Tunggu waktu countdown untuk mengirim kembali")
                            }
                        }}
                    />
                </View>
            </ScrollView>
            <ModalToast
                message={'Kode OTP berhasil dikonfirmasi, Silahkan Login'}
                isVisible={modal}
                onSwipeComplete={() => setModal(false)}
            />
        </Container>
    )
}

function SectionTittle () {
    return (
        <>
            <Text style={stylesFonts.Body_1_Regular}>Silahkan masukkan kode OTP yang dikirimkan melalui WhatsApp ke nomor yang telah didaftarkan</Text>
        </>
    )
}

function SectionOtp ({
    otp,
    setOtp,
    time,
}) {
    return (
        <View style={styles.card}>
            <View style={justifyContent.space_beetwen}>
                <Text style={stylesFonts.Subtittle_2_Regular}>Waktu Tersisa</Text>
                <Text style={[stylesFonts.Subtittle_1_Bold, {color: colors.primary}]}>{formatCountDown(time)}</Text>
            </View>
            <Gap marginBottom={normalize(12)}/>
            <OTPTextView 
                ref={e => ''} 
                inputCount={6}
                handleTextChange={(val) => setOtp({
                    ...otp,
                    otp:val
                })}
                tintColor={colors.primary}
                offTintColor={colors.grey_2}
                textInputStyle={{borderRadius: normalize(12), borderWidth: 2, backgroundColor: 'white', borderColor: colors.grey}}
                containerStyle={{marginLeft: normalize(-8)}}
            />
        </View>
    )
}

function SectionButton({
    onPress,
    onConfirm,
    isLoading
}) {

    return (
        <>
            <Button
                isLoading={isLoading}
                tittle={"Konfirmasi"}
                onPress={onPress}
            />
            <Gap marginBottom={normalize(16)}/>
            <Button
                border
                tittle={"Kirim Ulang Kode"}
                onPress={onConfirm}
            />
        </>
    )
}

export default VerificationOtp

const styles = StyleSheet.create({
    icon: {
        width: normalize(24),
        height: normalize(24)
    },
    card: {
        width: '100%',
        height: normalize(123),
        backgroundColor: colors.grey_3,
        borderRadius: radius.r_16,
        padding: radius.r_16
    }
})