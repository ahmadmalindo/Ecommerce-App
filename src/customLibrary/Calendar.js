import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, FlatList, TouchableOpacity, Platform, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import moment from "moment";
import { colors, fonts, justifyContent, responsive, stylesFonts } from "utils/index";
import { Gap } from "components/global";

const Calendar = ({
    initialDay = moment().format('YYYY-MM-DD'),
    customTextWeekStyle = stylesFonts.Subtittle_2_Regular,
    customTextMonthStyle = stylesFonts.Body_1_SemiBold,
    customHeaderViewStyle = styles.headerCalendar,
    markedDates = [],
    maxDate =  moment().add(1, 'months').format('YYYY-MM-DD'),
    minDate =  moment().format('YYYY-MM-DD'),
    onDateChange,
    disableMonthYearPicker = false,
    disableIconLeft = false,
    disableIconRight = false,
}) => {

    const [dates, setDates] = useState([])
    const [monthName, setMonthName] = useState(initialDay)

    const days = moment.weekdaysShort()

    const getDayInMonths = useCallback((month) => {

        const monthDate = moment(moment(month).format('YYYY-MM'));

        const daysInMonth = monthDate.daysInMonth();

        const days = monthDate.clone().subtract(1, 'day');

        const findArrayDayOfMonth = monthDate.startOf('months').format('d')

        const arrDays = [];
        const arrBeforeDays = [];
        
        for(let i = 0; i < daysInMonth; i++){
            let calendar = {
                date: days.add(1, 'day').format("YYYY-MM-DD"), 
                marked: false
            }

            arrDays.push(calendar)   
        }

        for(let i = 0; i < findArrayDayOfMonth; i++){
            let calendar = {
                date: null, 
                marked: false,
            }

            arrBeforeDays.push(calendar)   
        }

        
        let date = [...arrBeforeDays,...arrDays]

        const filteredMarkedDates = date.map(item => {
            if (markedDates[item?.date] != undefined) {
                return ({
                    ...item,
                    marked: true,
                    color: markedDates[item?.date].color,
                    status: markedDates[item?.date]?.status,
                    customStyleDay: markedDates[item.date].customStyleDay,
                    zIndex: markedDates[item.date].zIndex,
                    textColor: markedDates[item.date].textColor
                })
            }
            else {
                return ({
                    ...item,
                    marked: true,
                    color: colors.black,
                    status: null,
                    customStyleDay: null,
                    zIndex: 0,
                    textColor: colors.black
                })
            }
        })

        setDates(filteredMarkedDates);
    }, [dates, markedDates])

    const handleSingleSelection = (item) => {
        onDateChange({date: item.date})
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

    const getItemLayout = useCallback((data, index) => (
        {length: Platform.OS === "ios" ? 34 : 40, offset: Platform.OS === "ios" ? 34 : 40 * index, index}
    ), [])

    const keyExtractor = useCallback((item) => item.date, [])

    const ComponentDays = ({item, index} ) => {

        return (
            <TouchableOpacity 
                disabled={false}
                style={[styles.contentDays, {
                    zIndex: item?.zIndex
                }]} 
                onPress={() => handleSingleSelection(item)}
            >
                <View style={[justifyContent.view_center, item?.customStyleDay != null ? item?.customStyleDay : {width: responsive(22), height:responsive(22),borderRadius: responsive(60), backgroundColor: item?.status == null ? 'white' : item?.color}]}>
                    <View>
                        <Text 
                            style={[
                                stylesFonts.Subtittle_2_Regular,
                                {
                                color: item?.status == null ? colors.black : item?.textColor
                                }
                            ]}>
                            {item.date === null ? "" : moment(item.date).format("D")}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <View style={[customHeaderViewStyle]}>
                <TouchableOpacity onPress={() => disableIconLeft ? moment(monthName).isAfter(minDate) ? getPreviusMonth() : '' : getPreviusMonth()}>
                    {disableIconLeft ?
                    <Icon name="chevron-left" size={responsive(25)} color={moment(monthName).isAfter(minDate) ? colors.primary : 'transparent'}/>
                    :
                    <Icon name="chevron-left" size={responsive(25)} color={colors.primary}/>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={() => disableMonthYearPicker ? '' : ''}>
                    <Text style={[customTextMonthStyle]}>{moment(monthName).format('MMMM YYYY')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => disableIconRight ? moment(monthName).isBefore(maxDate) ? getNextMonth() : '' : getNextMonth()}>
                    {disableIconRight ?
                    <Icon name="chevron-right" size={responsive(25)} color={moment(monthName).isBefore(maxDate) ? colors.primary : 'transparent'}/>
                    :
                    <Icon name="chevron-right" size={responsive(25)} color={colors.primary}/>
                    }
                </TouchableOpacity>
            </View>
            <Gap marginBottom={responsive(8)}/>
            <View style={styles.headerDay}>
                <FlatList
                    numColumns={7}
                    data={days}
                    renderItem={(({item, index}) => {
                        return (
                            <View style={styles.contentDays}>
                                <Text style={[customTextWeekStyle]}>{item}</Text>
                            </View>
                        )
                    })}
                />
            </View>
            <View style={styles.headerDay}>
                <FlatList
                    legacyImplementation={true}
                    getItemLayout={getItemLayout}
                    keyExtractor={keyExtractor}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={3}
                    windowSize={5}
                    updateCellsBatchingPeriod={3}
                    initialNumToRender={3}
                    scrollEnabled={false}
                    numColumns={7}
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
        height: responsive(52),
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: responsive(15),
        borderRadius: responsive(12)
    },
    textMonth: {
        fontSize: responsive(16),
        fontFamily: fonts.semi_bold,
    },
    headerDay: {
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: fonts.regular
    },
    contentDays: {
        width: responsive(34),
        height: responsive(34),
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: responsive(5)
    },
    selectedDate: {
        width: responsive(25),
        height: responsive(25),
        borderRadius: responsive(25),
        alignItems: 'center',
        justifyContent: 'center',
    },
    textDay: {
        fontSize: responsive(14),
        fontFamily: fonts.regular,
    },
    viewSelectCalendar: {
        width: '80%',
        height: responsive(300),
        backgroundColor: colors.grey,
        position: 'absolute',
        alignSelf: 'center',
        borderRadius: responsive(16),
        justifyContent: 'center',
        alignItems: 'center'
    }
})