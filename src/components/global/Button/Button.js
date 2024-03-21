import React from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { colors, fonts } from "utils/index";
import normalize from "react-native-normalize";

const grey = colors.grey
const primary = colors.primary
const error = "#F43F5E"
const siluetColor = colors.secondary
const fontFamily = fonts.bold

const Button = ({
    tittle,
    costum_icon_left,
    costum_icon_right,
    children,
    border,
    disabled,
    any_color,
    transparent,
    onPress,
    isLoading,
    customColor = error,
    customColorActivityIndicator = error,
    customColorText = 'white',
    buttonRadius = normalize(10)
}) => {

    const [touch, setTouch] = React.useState(false)

    const animatedSiluet = useAnimatedProps(() => {
        return {
            backgroundColor: touch ? withSpring('transparent', {duration: 1000}) : withSpring(colors.primary)
        };
    }); 

    return (
        <Animated.View style={[styles.siluetButton, animatedSiluet, {borderRadius: buttonRadius}]}>
            <TouchableOpacity 
                onPressIn={() => setTouch(true)}
                onPressOut={() => setTouch(false)}
                disabled={disabled}
                style={[styles.btn, {
                    backgroundColor: transparent ? 'transparent' : border ? 'white' : disabled ? grey : any_color ? customColor : primary,
                    borderWidth: border ? 2 : 0,
                    borderColor: transparent ? 'transparent' : border ? disabled ? grey : any_color ? customColor : primary : 'transparent',
                    borderRadius: buttonRadius
                }]}
                onPress={onPress}

            >   
                {isLoading ?
                <ActivityIndicator color={transparent ? primary : border ? disabled ? grey : any_color ? customColorActivityIndicator :  primary : 'white'}/>
                :
                <>
                    {costum_icon_left &&
                    <View>
                        {costum_icon_left}
                    </View>
                    }
                    <Text 
                        style={[styles.tittle, {
                            color: transparent ? primary : border ? disabled ? grey : any_color ? customColorText :  primary : customColorText,
                            marginHorizontal: normalize(10)
                        }]}
                    >
                        {tittle}
                    </Text>
                    {costum_icon_right &&
                    <View>
                        {costum_icon_right}
                    </View>
                    }
                </>
                }
            </TouchableOpacity>
        </Animated.View>
    )
} 

export default React.memo(Button)

const styles = StyleSheet.create({
    btn: {
        width: '100%',
        height: normalize(44),
        backgroundColor: primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tittle: {
        fontSize: normalize(16),
        color: 'white',
        fontFamily: fontFamily
    },
    siluetButton: {
        backgroundColor:  siluetColor,
    }
})
