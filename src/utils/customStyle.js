import { StyleSheet } from "react-native";
import { responsive } from "./responsive";
import { colors } from "./colors";

export const customStyle = StyleSheet.create({
    absolute: {
        position: 'absolute',
        width: '100%',
        bottom: responsive(32),
    },
    box: {
        width: responsive(24),
        height: responsive(24),
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: colors.grey_2,
        borderRadius: responsive(6)
    },
    box2: {
        width: responsive(16),
        height: responsive(16),
        backgroundColor: colors.grey_3,
        borderRadius: responsive(4)
    },
    box3: {
        width: responsive(14),
        height: responsive(14),
        backgroundColor: colors.grey_3,
        borderRadius: responsive(4)
    },
    box4: {
        width: responsive(8),
        height: responsive(8),
        backgroundColor: colors.grey_3,
        borderRadius: responsive(4)
    },
    card: {
        width: '100%',
        minHeight: 48,
        backgroundColor: 'white',
        borderRadius: responsive(16),
        padding: responsive(16)
    },
    line : {
        width: responsive(60),
        height: responsive(5),
        backgroundColor: colors.grey_2,
        alignSelf: 'center',
        borderRadius: responsive(10),
    },
})