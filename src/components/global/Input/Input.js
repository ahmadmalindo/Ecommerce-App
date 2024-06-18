import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, fonts, responsive, stylesFonts } from "utils/index";
import { Feather } from "@expo/vector-icons";

const Input = ({ 
    tittle,
    fontFamilyTittle = fonts.regular,
    customHeight = responsive(44),
    customBackgroundColor = 'white',
    customBorderColor = colors.grey_2,
    customBorderRadius = responsive(10),
    customPaddingHorizontal = responsive(12),
    ref,
    multiline,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    editable,
    autoCapitalize,
    keyboardType,
    maxLength,
    onKeyPress,
    onPress,
    customIconLeft,
    customIconRight,
    password,
    iconPasswordClose = <Feather name="eye-off" size={24} color={colors.grey_2} />,
    iconPasswordOpen = <Feather name="eye" size={24} color={colors.grey_2} />,
    onSubmitEditing
}) => {

    const [focus, setFocus] = useState(false)

    return (
        <>
            {tittle &&
            <Text style={[stylesFonts.Subtittle_2_Medium, {marginBottom: responsive(10), fontFamily: fontFamilyTittle}]}>{tittle}</Text>
            }
            <View 
                style={[{
                    width: '100%',
                    height: customHeight,
                    borderWidth: 1,
                    backgroundColor: focus ? colors.primary_2 : customBackgroundColor,
                    borderColor: focus ? colors.primary : customBorderColor,
                    borderRadius: customBorderRadius,
                    justifyContent: 'center',
                    paddingHorizontal: customPaddingHorizontal,
                    zIndex: 1
                }]}
            >
                <TextInput
                    ref={ref}
                    value={value}
                    onChangeText={onChangeText}
                    style={{
                        fontSize: responsive(14), 
                        color: colors.black, 
                        fontFamily: fonts.regular,
                        marginLeft: customIconLeft ? responsive(24) : 0,
                        textAlignVertical: multiline ? 'top' : 'auto',
                        height: multiline ? customHeight : 'auto',
                    }}
                    multiline={multiline}
                    placeholder={placeholder}
                    placeholderTextColor={colors.grey}
                    secureTextEntry={secureTextEntry}
                    editable={editable}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    autoCapitalize={autoCapitalize}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    onKeyPress={(e) => onKeyPress?.(e.nativeEvent.key)}
                    onSubmitEditing={onSubmitEditing}
                />
                {password &&
                <TouchableOpacity 
                    style={{
                        position: 'absolute',
                        right: responsive(8),
                        top: responsive(10)
                    }} 
                    onPress={onPress}
                >
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

                {customIconLeft &&
                <View 
                    style={{
                        position: 'absolute',
                        left: responsive(8),
                        top: responsive(10)
                    }}
                >
                    {customIconLeft}
                </View> 
                }

                {customIconRight &&
                <View 
                    style={{
                        position: 'absolute',
                        right: responsive(8),
                        top: responsive(10)
                    }}
                >
                    {customIconRight}
                </View> 
                }
            </View>
        </>
    )
}

export default React.memo(Input)

const styles = StyleSheet.create({
})
