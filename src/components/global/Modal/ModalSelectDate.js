import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import Modal from "react-native-modal";
import normalize, { SCREEN_WIDTH } from 'react-native-normalize';
import { colors, fonts, justifyContent, radius, responsive, stylesFonts } from 'utils/index';
import { Gap } from '../Gap';
import moment from 'moment';
import { Button } from '../Button';
import Calendar from 'customLibrary/Calendar';
import { useModal } from 'context/modalContext';
import MonthPicker from "react-native-month-year-picker";

const ModalSelectDate = ({ 
    mode = 'date-picker',
    modalId = "",
    onSwipeComplete, 
    onBackdropPress, 
    onPress, 
}) => {

    const { modals, hideModal } = useModal();
    const modalState = modals[modalId] || { isVisible: false, props: {} };

    const handleBackdropPress = () => {
        onBackdropPress?.()
        hideModal(modalId);
    };

    const handleSwipeComplete = () => {
        onSwipeComplete?.()
        hideModal(modalId);
    };

    const [select, setSelect] = useState({
        day: "",
        objectDays: {},
        array: []
    })
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [initialDay, setInitialDay] = useState(moment().format('YYYY-MM-DD'));

    useEffect(() => {
        let endDate = select.array.length > 1 ? select.array[select.array.length - 1] : select.array[0]

        if (endDate != undefined) {
            let date = []
            if (moment(select.array[0]).isSameOrBefore(endDate)) {
                let now = moment(select.array[0]).clone()
                while (now.isSameOrBefore(endDate)) {
                    date.push(now.format('YYYY-MM-DD'));
                    now.add(1, 'days');
                }
            }
            else {
                let now = moment(endDate).clone()
                while (now.isSameOrBefore(select.array[0])) {
                    date.push(now.format('YYYY-MM-DD'));
                    now.add(1, 'days');
                }
            }
            let newDaysObject = {};
    
            date.forEach((day, index) => {
                newDaysObject[day] = {
                    viewStyle: {
                        width: select.array.includes(day) ? responsive(34) : responsive(74),
                        height: responsive(34),
                        borderRadius: select.array.includes(day) ? 100 : 0,
                        backgroundColor: select.array.includes(day) ? colors.primary : "#E9F5FE",
                        justifyContent: 'center',
                        alignItems: 'center'
                    },
                    textStyle: {
                        color: select.array.includes(day) ? 'white' : colors.black,
                    },
                    zIndexButton: select.array.includes(day) ? 10 : 0,
                };
            });
    
            setSelect({
                ...select,
                objectDays: newDaysObject
            })

        }
        else {
            setSelect({
                ...select,
                objectDays: {}
            })
        }
    }, [select?.array])

    return (
        <>
        <Modal 
            isVisible={modalState?.isVisible} 
            onSwipeComplete={handleSwipeComplete} 
            swipeDirection="down" 
            onBackdropPress={handleBackdropPress}
            style={{
                margin: 0
            }} 
            avoidKeyboard={true}
        >
            <View style={[styles.contentModal]}>
                <Calendar
                    initialDay={initialDay}
                    onMonthPicker={() => {
                        setShowMonthPicker(true)
                    }}
                    onDateChange={(result) => {
                        if (mode == 'date-picker') {
                            let newDaysObject = {}
                            newDaysObject[result] = {
                                marked: true,
                                viewStyle: {
                                    width: responsive(34),
                                    height: responsive(34),
                                    borderRadius: 100,
                                    backgroundColor: colors.primary,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                },
                                textStyle: {
                                    color: 'white'
                                }
                            }
    
                            setSelect({
                                ...select,
                                day: result,
                                objectDays: newDaysObject
                            })
                        }
                        else if (mode == 'date-range') {
                            let listDate = []
                                
                            if (select.array.length > 1) {
                                setSelect({
                                    ...select,
                                    array: []
                                })
                                return ;
                            } 
                            
                            if (select.array.includes(result)) {
                                let index = select.array.indexOf(result)
                                if (index !== -1) {
                                    select.array.splice(index, 1);
                                    listDate = select.array
                                }
                            }
                            else {
                                if (select.array.length > 0) {
                                    listDate = [select.array[0], result]
                                }
                                else {
                                    listDate.push(result)
                                }
                            }

                            setSelect({
                                ...select,
                                array: listDate
                            })
                        }
                    }}    
                    markedDates={select.objectDays}
                    selectDay={select.day}
                />
                <View style={justifyContent.space_beetwen}>
                    <View style={{width: '30%'}}>
                        <Button
                            any_color
                            customBorderWidth={1}
                            customBorderColor={colors.primary}
                            cutomBackgroundColor='white'
                            customColorText={colors.primary}
                            tittle={"Cancel"}
                            onPress={() => {
                                handleBackdropPress?.()
                                setSelect({
                                    ...select,
                                    day: "",
                                    objectDays: {}
                                })
                            }}
                        />
                    </View>
                    <View style={{width: '30%'}}>
                        <Button
                            tittle={"Save"}
                            onPress={() => {
                                onPress?.(mode == 'date-picker' ? select.day : select.array?.sort((a, b) => new Date(a) - new Date(b)))
                                handleBackdropPress?.()
                            }}
                        />
                    </View>
                </View>
            </View>
            {showMonthPicker && 
            <MonthPicker
                onChange={(event, date) => {
                    setInitialDay(moment(date).format('YYYY-MM-DD'))
                    setShowMonthPicker(false)
                    setSelect({
                        ...select,
                        day: "",
                        objectDays: {},
                        array: []
                    })
                }}
                value={new Date()}
            />
            }
        </Modal>
        </>
    )
} 

export default React.memo(ModalSelectDate);

const styles = StyleSheet.create({
    contentModal: {
        width: SCREEN_WIDTH / 1.1,
        alignSelf: 'center',
        backgroundColor: 'white', 
        minHeight: 300,
        borderRadius: normalize(16),
        marginBottom: normalize(24),
        padding: normalize(16)
    },
})
