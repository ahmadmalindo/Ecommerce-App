import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import Modal from "react-native-modal";
import normalize from 'react-native-normalize';
import { colors, fonts, justifyContent, radius, responsive, stylesFonts } from 'utils/index';
import { Gap } from '../Gap';
import moment from 'moment';
import { Button } from '../Button';
import Calendar from 'customLibrary/Calendar';

const ModalSelectDate = ({ 
    isVisible, 
    onSwipeComplete, 
    onBackdropPress, 
    onPress, 
}) => {

    const [select, setSelect] = useState({
        day: "",
        objectDays: {}
    })

    return (
        <Modal 
            isVisible={isVisible} 
            onSwipeComplete={onSwipeComplete} 
            swipeDirection="down" 
            onBackdropPress={onBackdropPress}
            style={{
                margin: normalize(16)
            }} 
            avoidKeyboard={true}
        >
            <View style={[styles.contentModal]}>
                <Calendar
                    onDateChange={(result) => {
                        let newDaysObject = {}
                        newDaysObject[result?.date] = {
                            marked: true,
                            status: 'ok',
                            color: colors.primary,
                            customStyleDay: {
                                width: responsive(34),
                                height: responsive(34),
                                borderRadius: 100,
                                backgroundColor: colors.primary,
                            },
                            textColor: 'white'
                        }
                        setSelect({
                            day: result.date,
                            objectDays: newDaysObject
                        })
                    }}    
                    markedDates={select.objectDays}
                    selectDay={select.day}
                />
                <Gap marginBottom={responsive(32)}/>
                <View style={justifyContent.space_beetwen}>
                    <View style={{width: '30%'}}>
                        <Button
                            any_color
                            customColor='white'
                            customColorText={colors.primary}
                            tittle={"Cancel"}
                            onPress={onBackdropPress}
                        />
                    </View>
                    <View style={{width: '30%'}}>
                        <Button
                            tittle={"Save"}
                            onPress={() => {
                                onPress?.(select.day)
                            }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
} 

export default React.memo(ModalSelectDate);

const styles = StyleSheet.create({
    contentModal: {
        backgroundColor: 'white', 
        minHeight: 300,
        borderRadius: normalize(16),
        marginBottom: normalize(24),
        padding: normalize(16)
    },
})
