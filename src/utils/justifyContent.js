import { StyleSheet } from "react-native";

export const justifyContent = StyleSheet.create({
    space_beetwen: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    flex_start: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    flex_end: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    center: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    view_center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})