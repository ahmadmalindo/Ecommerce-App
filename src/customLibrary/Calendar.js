import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, FlatList, TouchableOpacity, Platform, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import moment from "moment";
import { colors, fonts, justifyContent, responsive, stylesFonts } from "utils/index";
import { Gap } from "components/global";

const Calendar = ({
    initialDay = moment().format('YYYY-MM-DD'),
    onMonthPicker,
    minDate = null,
    maxDate = null,
    customTextWeekStyle = stylesFonts.Body_2_Regular,
    customTextMonthStyle = stylesFonts.Body_1_SemiBold,
    customHeaderViewStyle = styles.headerCalendar,
    markedDates = {},
    onDateChange,
    disableIconLeft = false,
    disableIconRight = false,
}) => {

    const [dates, setDates] = useState([])
    const [monthName, setMonthName] = useState(initialDay)

    const days = moment.weekdaysShort()

    const getDayInMonths = (month) => {

        const monthDate = moment(moment(month).format('YYYY-MM'));

        const daysInMonth = monthDate.daysInMonth();

        const days = monthDate.clone().subtract(1, 'day');

        const findArrayDayOfMonth = monthDate.startOf('months').format('d')
        const findArrayAfterDayOfMonth = monthDate.add(1,'months').endOf('month').format('d')
        const findArrayAfterDayNextMonth = monthDate.add(1,'months').startOf('month').format('d')

        const arrDays = [];
        const arrBeforeDays = [];
        const arrAfterDays = [];
        const arrNextMonth = [];
        
        for(let i = 0; i < daysInMonth; i++){
            let calendar = {
                date: days.add(1, 'day').format("YYYY-MM-DD"), 
            }

            arrDays.push(calendar)   
        }

        for(let i = 0; i < findArrayDayOfMonth; i++){
            let calendar = {
                date: null, 
            }

            arrBeforeDays.push(calendar)   
        }

        for(let i = 0; i < findArrayAfterDayOfMonth; i++){
            let calendar = {
                date: null, 
            }

            arrAfterDays.push(calendar)   
        }

        for(let i = 0; i < findArrayAfterDayNextMonth; i++){
            let calendar = {
                date: null, 
            }

            arrNextMonth.push(calendar)   
        }

        
        let date = [...arrBeforeDays, ...arrDays, ...arrAfterDays, ...arrNextMonth]

        const filteredDates = date.map(item => {
            if (markedDates[item?.date] != undefined) {
                return ({
                    ...item,
                    textStyle: markedDates[item?.date].textStyle,
                    viewStyle: markedDates[item?.date]?.viewStyle,
                    zIndexButton: markedDates[item?.date]?.zIndexButton ?? 0,
                    isDisabled:  markedDates[item?.date]?.isDisabled ?? false
                })
            }
            else {
                if (minDate != null && moment(minDate).isAfter(item.date)) {
                    return ({
                        ...item,
                        textStyle: {
                            color: colors.grey
                        },
                        // viewStyle: markedDates[item?.date]?.viewStyle,
                        // zIndexButton: markedDates[item?.date]?.zIndexButton ?? 0,
                        isDisabled:  true
                    })
                }
                else if (maxDate != null && moment(maxDate).isBefore(item.date)) {
                    return ({
                        ...item,
                        textStyle: {
                            color: colors.grey
                        },
                        // viewStyle: markedDates[item?.date]?.viewStyle,
                        // zIndexButton: markedDates[item?.date]?.zIndexButton ?? 0,
                        isDisabled:  true
                    })
                }
                else {
                    return ({
                        ...item,
                        textStyle: null,
                        viewStyle: null,
                        zIndexButton: 0,
                        isDisabled: false
                    })
                }
            }
        })

        setDates(filteredDates);
    }

    const handleSelection = (item) => {
        onDateChange?.(item.date)
    }

    const getNextMonth = () => {
        const nextMont = moment(monthName).add(1, 'months').format("YYYY-MM-DD")
        
        setMonthName(nextMont)
        getDayInMonths(nextMont)
    }

    const getPreviusMonth = () => {
        const previusMonth = moment(monthName).subtract(1, 'months').format("YYYY-MM-DD")

        setMonthName(previusMonth)
        getDayInMonths(previusMonth)
    }

    useEffect(() => {
        getDayInMonths(monthName)
    }, [markedDates])  

    useEffect(() => {
        setMonthName(initialDay)
    }, [initialDay])

    const ComponentDays = ({item, index} ) => {

        return (
            <TouchableOpacity 
                disabled={item?.isDisabled}
                style={[styles.contentDays, {zIndex: item?.zIndexButton}]} 
                onPress={() => handleSelection?.(item)}
            >
                <View style={item?.viewStyle != null ? item?.viewStyle : justifyContent.center}>
                    <Text 
                        style={item?.textStyle != null ? item?.textStyle : stylesFonts.Subtittle_2_Regular}>
                        {item.date === null ? "" : moment(item.date).format("D")}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <View style={[customHeaderViewStyle]}>
                <TouchableOpacity onPress={() => getPreviusMonth()}>
                    {disableIconLeft ?
                    <Icon name="chevron-left" size={responsive(24)} color={'transparent'}/>
                    :
                    <Icon name="chevron-left" size={responsive(24)} color={colors.primary}/>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={onMonthPicker}>
                    <Text style={[customTextMonthStyle]}>{moment(monthName).format('MMMM YYYY')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => getNextMonth()}>
                    {disableIconRight ?
                    <Icon name="chevron-right" size={responsive(24)} color={'transparent'}/>
                    :
                    <Icon name="chevron-right" size={responsive(24)} color={colors.primary}/>
                    }
                </TouchableOpacity>
            </View>
            <Gap marginBottom={responsive(8)}/>
            <View>
                <FlatList
                    data={days}
                    numColumns={7}
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                    renderItem={(({item, index}) => {
                        return (
                            <View style={styles.contentDays}>
                                <Text style={[customTextWeekStyle]}>{item}</Text>
                            </View>
                        )
                    })}
                />
            </View>
            <View>
                <FlatList
                    scrollEnabled={false}
                    numColumns={7}
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                    data={dates}
                    renderItem={ComponentDays}
                />
            </View>
        </View>
    )
} 

export default Calendar;

const styles = StyleSheet.create({
    headerCalendar: {
        width: '100%',
        height: responsive(48),
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: responsive(12)
    },
    contentDays: {
        width: responsive(34),
        height: responsive(34),
        alignItems: 'center',
        justifyContent: 'center',
    },
})