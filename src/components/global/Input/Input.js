import React, { memo, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon2 from "react-native-vector-icons/AntDesign";
import { Gap } from "../Gap";
import { colors, fonts } from "utils/index";
import normalize from "react-native-normalize";
import { Feather } from "@expo/vector-icons";

//change base color & font
const grey = colors.grey
const grey_2 = colors.grey_2
const black = colors.black
const primary = colors.primary
const secondary = colors.secondary_2
const error = "#F43F5E"
const error_2 = "#FFF1F2"
const fontFamily = fonts.regular

const Input = ({ 
    ref,
    multiline,
    paragraph,
    value,
    onChangeText,
    tittle,
    placeholder,
    secureTextEntry,
    editable,
    autoCapitalize,
    keyboardType,
    maxLength,
    onKeyPress,
    onPress,
    isError,
    errorMessage,
    left,
    costumIcon,
    children,
    password,
    iconPasswordClose = <Feather name="eye-off" size={24} color={colors.grey_2} />,
    iconPasswordOpen = <Feather name="eye" size={24} color={colors.grey_2} />
}) => {

    const [focus, setFocus] = useState(false)

    return (
        <>
            {tittle &&
            <Text style={[styles.tittle, {marginBottom: normalize(10)}]}>{tittle}</Text>
            }
            <View 
                style={[styles.viewInput, {
                    height: paragraph ? normalize(124) : normalize(44),
                    borderColor: focus ? primary : isError ? error : grey_2, 
                    backgroundColor: focus ? secondary : isError ? error_2 : 'white',
                }]}
            >
                <TextInput
                    multiline={multiline}
                    ref={ref}
                    value={value}
                    onChangeText={onChangeText}
                    style={{
                        fontSize: normalize(14), 
                        color: focus ? black : black, 
                        fontFamily: fontFamily,
                        marginLeft: left ? normalize(25) : 0,
                        textAlignVertical: paragraph ? 'top' : 'auto',
                        height: paragraph ? normalize(104) : 'auto',
                    }}
                    placeholder={placeholder}
                    placeholderTextColor={grey}
                    secureTextEntry={secureTextEntry}
                    editable={editable}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    autoCapitalize={autoCapitalize}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    onKeyPress={(e) => onKeyPress?.(e.nativeEvent.key)}
                />
                {password &&
                <TouchableOpacity style={styles.contentIcon} onPress={onPress}>
                    {secureTextEntry ?
                    <View>
                        {iconPasswordClose}
                    </View>
                    :
                    <View>
                        {iconPasswordOpen}
                    </View>
                    }
                </TouchableOpacity>
                }

                {costumIcon &&
                <TouchableOpacity style={left ? styles.contentIconLeft : styles.contentIcon} onPress={onPress}>
                    {costumIcon}
                </TouchableOpacity>
                }
            </View>
            {isError &&
            <Gap marginTop={normalize(10)}>
                <View style={{flexDirection: 'row', justifyContent: "flex-start", alignItems: 'center'}}>
                    <Icon2 name="exclamationcircleo" size={normalize(18)} color={error}/>
                    <Text style={styles.textError}>{errorMessage}</Text>
                </View>
            </Gap>
            }
        </>
    )
}

export default React.memo(Input)

const styles = StyleSheet.create({
    viewInput: {
      width: '100%',
      height: normalize(48),
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: grey_2,
      borderRadius: normalize(10),
      justifyContent: 'center',
      paddingHorizontal: normalize(12),
      zIndex: 1
    },
    tittle: {
        color: colors.black,
        fontSize: normalize(14),
        fontFamily: fontFamily,
    },
    contentIcon: {
        position: 'absolute',
        right: normalize(10),
        top: normalize(10),
    },
    contentIconLeft: {
        position: 'absolute',
        left: normalize(8),
        top: normalize(10)
    },
    textError: {
        fontFamily: 'Inter-Regular',
        color: error,
        fontSize: normalize(11),
        marginLeft: normalize(5)
    },
    viewOpen: {
        width: '100%',
        height: normalize(200),
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: grey_2,
        borderRadius: normalize(10),
        justifyContent: 'center',
        paddingHorizontal: normalize(12),
        marginTop: normalize(-44)
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})
