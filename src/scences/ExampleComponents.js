import { Feather, Ionicons } from "@expo/vector-icons"
import { Button, Container, Gap, HeaderBack, HeaderSection, Input, Selection } from "components/global"
import ModalInput from "components/global/Modal/ModalInput"
import ModalSelect from "components/global/Modal/ModalSelect"
import ModalSelectDate from "components/global/Modal/ModalSelectDate"
import ModalSelectSelection from "components/global/Modal/ModalSelectSelection"
import { useModal } from "context/modalContext"
import Calendar from "customLibrary/Calendar"
import { storage } from "helper/storage"
import moment from "moment"
import React, { useEffect, useRef, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import MonthPicker from "react-native-month-year-picker"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "react-native-normalize"
import { colors, responsive } from "utils/index"

function ExampleComponents({ navigation }) {

    return (
        <Container backgroundColor={'white'}>
            <Gap
                paddingHorizontal={responsive(16)}
                paddingTop={responsive(16)}
                paddingBottom={responsive(16)}
            >
                <HeaderBack
                    tittle={"Kembali"}
                    onBack={() => {
                        navigation.goBack()
                    }}
                />
            </Gap>
            <ScrollView
                style={{
                    minHeight: SCREEN_HEIGHT,
                    backgroundColor: colors.white_2
                }}
            >
                <Gap marginBottom={responsive(24)}/>
                <SectionInput/>
                <Gap marginBottom={responsive(24)}/>
                <SectionSelection/>
                <Gap marginBottom={responsive(24)}/>
                <SectionButtonAndModal/>
                <Gap marginBottom={responsive(24)}/>
                <SectionCalendarPicker/>
                <Gap marginBottom={responsive(24)}/>
                <SectionCalendarRange/>
                <Gap marginBottom={responsive(246)}/>
            </ScrollView>
        </Container>
    )
}

export default ExampleComponents;

function SectionInput ({

}) {
    return (
        <Gap paddingHorizontal={responsive(16)}>
            <HeaderSection
                tittle={"Input Components"}
                more=""
            />
            <Gap marginBottom={responsive(16)}/>
            <Input
                tittle={"Input"}
                placeholder={"Input"}
                // value={}
                // onChangeText={(val) => {

                // }}
            />
            <Gap marginBottom={responsive(16)}/>
            <Input
                tittle={"Input Password"}
                placeholder={"Input Password"}
                password
                secureTextEntry={true}
                // value={}
                // onChangeText={(val) => {

                // }}
            />
            <Gap marginBottom={responsive(16)}/>
            <Input
                tittle={"Input Icon Left"}
                placeholder={"Input Icon Left"}
                // value={}
                // onChangeText={(val) => {

                // }}
                customIconLeft={
                    <View style={{
                        width: responsive(36),
                        height: responsive(44),
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Ionicons name="people-circle" size={responsive(24)} color={colors.grey} />
                    </View>
                }
            />
            <Gap marginBottom={responsive(16)}/>
            <Input
                tittle={"Input Icon Right"}
                placeholder={"Input Icon Right"}
                // value={}
                // onChangeText={(val) => {

                // }}
                customIconRight={
                    <View style={{
                        width: responsive(36),
                        height: responsive(44),
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Ionicons name="people-circle" size={responsive(24)} color={colors.grey} />
                    </View>
                }
            />
            <Gap marginBottom={responsive(16)}/>
            <Input
                tittle={"Input Multiline"}
                placeholder={"Input Multiline"}
                multiline
                customMarginTop={responsive(16)}
                customHeight={responsive(126)}
                // value={}
                // onChangeText={(val) => {

                // }}
            />
        </Gap>
    )
}

function SectionSelection ({

}) {
    return (
        <Gap paddingHorizontal={responsive(16)}>
            <HeaderSection
                tittle={"Selection Components"}
                more=""
            />
            <Gap marginBottom={responsive(16)}/>
            <Selection
                tittle={"Selection"}
                placeHolder={"Selection"}
                customTextColor={colors.grey}
                // onPress={() => {

                // }}
            />
            <Gap marginBottom={responsive(16)}/>
            <Selection
                tittle={"Selection Icon Left"}
                placeHolder={"Selection Icon Left"}
                customPaddingHorizontal={responsive(8)}
                customIconLeft={
                    <Gap marginRight={responsive(8)}>
                        <Ionicons name="people-circle" size={responsive(24)} color={colors.grey} />
                    </Gap>
                }
                // onPress={() => {

                // }}
            />
            <Gap marginBottom={responsive(16)}/>
            <Selection
                tittle={"Selection Icon Right"}
                placeHolder={"Selection Icon Right"}
                // value={}
                // onChangeText={(val) => {

                // }}
                customIconRight={
                    <View style={{
                        width: responsive(36),
                        height: responsive(44),
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Ionicons name="people-circle" size={responsive(24)} color={colors.grey} />
                    </View>
                }
            />
        </Gap>
    )
}

function SectionButtonAndModal ({

}) {

    const { showModal, hideModal } = useModal();

    return (
        <Gap paddingHorizontal={responsive(16)}>
            <HeaderSection
                tittle={"Button And Modal Components"}
                more=""
            />
            <Gap marginBottom={responsive(16)}/>
            <Button
                tittle={"Modal Select"}
                onPress={() => {
                    showModal('modalselect')
                }}
            />
            <ModalSelect
                modalId="modalselect"
                tittle="Modal Select"
                data={[
                    {
                        id: 1,
                        name: 'Jogja'
                    },
                    {
                        id: 2,
                        name: 'Makasar'
                    },
                    {
                        id: 3,
                        name: 'Bantul'
                    },
                ]}
                onConfirm={(item) => {
                    alert(JSON.stringify(item))
                }}
            />
            <Gap marginBottom={responsive(16)}/>
            <Button
                cutomBackgroundColor={colors.purple}
                tittle={"Modal Select Search No Confirmation"}
                onPress={() => {
                    showModal('modalselect2')
                }}
            />
            <ModalSelect
                modalId="modalselect2"
                searchable
                isConfirmation
                schemeData={{
                    id: 'id',
                    name: 'city_name'
                }}
                tittle="Modal Select Search No Confirmation"
                data={[
                    {
                        id: 1,
                        city_name: 'Jogja'
                    },
                    {
                        id: 2,
                        city_name: 'Makasar'
                    },
                    {
                        id: 3,
                        city_name: 'Bantul'
                    },
                ]}
                onConfirm={(item) => {
                    alert(JSON.stringify(item))
                }}
            />
            <Gap marginBottom={responsive(16)}/>
            <Button
                customBorderWidth={1}
                customBorderColor={colors.primary}
                cutomBackgroundColor="transparent"
                customColorText={colors.primary}
                customIconRight={
                    <Feather name="plus-circle" size={responsive(20)} color={colors.primary} />
                }
                tittle={"Modal Calendar Picker"}
                onPress={() => {
                    showModal('modalcalendarpicker')
                }}
            />
            <ModalSelectDate
                mode="date-picker"
                modalId="modalcalendarpicker"
                onPress={(date) => {
                    alert(JSON.stringify(date))
                }}
            />
            <Gap marginBottom={responsive(16)}/>
            <Button
                customBorderWidth={1}
                customBorderColor={colors.primary}
                cutomBackgroundColor="transparent"
                customColorText={colors.primary}
                customIconLeft={
                    <Feather name="plus-circle" size={responsive(20)} color={colors.primary} />
                }
                tittle={"Modal Calendar Range"}
                onPress={() => {
                    showModal('modalcalendarrange')
                }}
            />
            <ModalSelectDate
                mode="date-range"
                modalId="modalcalendarrange"
                onPress={(date) => {
                    alert(JSON.stringify(date))
                }}
            />
            <Gap marginBottom={responsive(16)}/>
            <Button
                tittle={"Modal Input"}
                onPress={() => {
                    showModal('modalinput')
                }}
            />
            <ModalInput
                modalId="modalinput"
                tittle="Modal Input"
                inputTitle="Modal Input"
                placeholder="Modal Input"
                onConfrim={(val) => {
                    alert(JSON.stringify(val))
                }}
            />
            <Gap marginBottom={responsive(16)}/>
            <Button
                customBorderWidth={1}
                customBorderColor={colors.primary}
                cutomBackgroundColor="transparent"
                customColorText={colors.primary}
                tittle={"Modal SelectSelection"}
                onPress={() => {
                    showModal('modalselection')
                }}
            />
            <ModalSelectSelection
                tittle={"Modal SelectSelection"}
                modalId="modalselection"
                data={[
                    {
                        tittle: 'Data',
                        data: [
                            {
                                id: 1,
                                name: 'Jakarta'
                            },
                            {
                                id: 2,
                                name: 'Yogyakarta'
                            },
                        ]
                    },
                    {
                        tittle: 'Data 2',
                        data: [
                            {
                                id: 3,
                                name: 'Jakarta'
                            },
                            {
                                id: 4,
                                name: 'Yogyakarta'
                            },
                        ]
                    }
                ]}
            />
        </Gap>
    )
}

function SectionCalendarPicker ({

}) {


    const [select, setSelect] = useState({
        day: "",
        objectDays: {},
        array: []
    })
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [initialDay, setInitialDay] = useState(moment().format('YYYY-MM-DD'));

    return (
        <Gap paddingHorizontal={responsive(16)}>
            <HeaderSection
                tittle={"Calendar Picker"}
                more=""
            />
            <Gap marginBottom={responsive(16)}/>
            <Calendar
                initialDay={initialDay}
                onMonthPicker={() => {
                    setShowMonthPicker(true)
                }}
                onDateChange={(result) => {
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
                }}    
                markedDates={select.objectDays}
                selectDay={select.day}
            />
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
        </Gap>
    )
}

function SectionCalendarRange ({

}) {


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
        <Gap paddingHorizontal={responsive(16)}>
            <HeaderSection
                tittle={"Calendar Range"}
                more=""
            />
            <Gap marginBottom={responsive(16)}/>
            <Calendar
                initialDay={initialDay}
                onMonthPicker={() => {
                    setShowMonthPicker(true)
                }}
                onDateChange={(result) => {
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
                }}    
                markedDates={select.objectDays}
                selectDay={select.day}
            />
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
        </Gap>
    )
}

const styles = StyleSheet.create({
})