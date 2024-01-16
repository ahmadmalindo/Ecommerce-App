import React, { memo, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon2 from "react-native-vector-icons/AntDesign";
import { Gap } from "../Gap";
import { colors, fonts } from "utils/index";
import normalize from "react-native-normalize";
import { Entypo } from "@expo/vector-icons";

//change base color & font
const grey = colors.grey
const grey_2 = colors.grey_2
const black = colors.black
const primary = colors.primary
const secondary = colors.secondary_2
const error = "#F43F5E"
const error_2 = "#FFF1F2"
const fontFamily = fonts.regular

const Selection = ({ 
    tittle,
    placeHolder,
    onPress,
    costumIcon
}) => {

    return (
        <>
            {tittle &&
            <Text style={[styles.tittle, {marginBottom: normalize(10)}]}>{tittle}</Text>
            }
            <TouchableOpacity 
                style={styles.viewInput}
                onPress={onPress}
            >
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    {costumIcon &&
                    <View style={{marginRight: normalize(8)}}>
                        {costumIcon}
                    </View>
                    }
                    {placeHolder &&
                    <Text style={styles.tittle}>{placeHolder}</Text>
                    }
                </View>
                <Entypo name="chevron-small-down" size={24} color="#4F4F4F" />
            </TouchableOpacity>
        </>
    )
}

export default React.memo(Selection)

const styles = StyleSheet.create({
    viewInput: {
      width: '100%',
      height: normalize(49),
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: grey_2,
      borderRadius: normalize(10),
      paddingHorizontal: normalize(10),
      zIndex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    tittle: {
        color: colors.black,
        fontSize: normalize(14),
        fontFamily: fontFamily,
    },
    tittle: {
        fontSize: normalize(14),
        lineHeight: normalize(20),
        fontFamily: fonts.regular,
        color: colors.black
     },
})
