import { StyleSheet } from "react-native"
import normalize from "react-native-normalize"
import { colors } from "./colors"

export const fonts = {
    regular: "PlusJakartaSans-Regular",
    bold: "PlusJakartaSans-Bold",
    semi_bold: "PlusJakartaSans-SemiBold",
    medium: "PlusJakartaSans-Medium"
}

export const stylesFonts = StyleSheet.create({
    Display_1: {
        fontSize: normalize(48),
        letterSpacing: 0.1,
        lineHeight: normalize(64),
        fontFamily: fonts.semi_bold,
        color: colors.black,
    },
    Display_2: {
        fontSize: normalize(32),
        letterSpacing: 0.1,
        lineHeight: normalize(40),
        fontFamily: fonts.semi_bold,
        color: colors.black,
    },
    Heading_1: {
        fontSize: normalize(24),
        lineHeight: normalize(32),
        fontFamily: fonts.semi_bold,
        color: colors.black,
    },
    Heading_2: {
        fontSize: normalize(20),
        lineHeight: normalize(28),
        fontFamily: fonts.semi_bold,
        color: colors.black,
    },
    Heading_3: {
        fontSize: normalize(22),
        lineHeight: normalize(30),
        fontFamily: fonts.semi_bold,
        color: colors.black,
    },
    Subtittle_1_Regular: {
        fontSize: normalize(18),
        lineHeight: normalize(26),
        fontFamily: fonts.regular,
        color: colors.black,
    },
    Subtittle_1_Medium: {
        fontSize: normalize(18),
        lineHeight: normalize(26),
        fontFamily: fonts.medium,
        color: colors.black,
    },
    Subtittle_1_SemiBold: {
        fontSize: normalize(18),
        lineHeight: normalize(26),
        fontFamily: fonts.semi_bold,
        color: colors.black,
    },
    Subtittle_1_Bold: {
        fontSize: normalize(18),
        lineHeight: normalize(26),
        fontFamily: fonts.bold,
        color: colors.black,
    },
    Subtittle_2_Regular: {
        fontSize: normalize(14),
        lineHeight: normalize(22),
        fontFamily: fonts.regular,
        color: colors.black,
    },
    Subtittle_2_Medium: {
        fontSize: normalize(14),
        lineHeight: normalize(22),
        fontFamily: fonts.medium,
        color: colors.black,
    },
    Subtittle_2_SemiBold: {
        fontSize: normalize(14),
        lineHeight: normalize(22),
        fontFamily: fonts.semi_bold,
        color: colors.black,
    },
    Subtittle_2_Bold: {
        fontSize: normalize(14),
        lineHeight: normalize(22),
        fontFamily: fonts.bold,
        color: colors.black,
    },
    Body_1_Regular: {
        fontSize: normalize(16),
        lineHeight: normalize(24),
        fontFamily: fonts.regular,
        color: colors.black,
    },
    Body_1_Medium: {
        fontSize: normalize(16),
        lineHeight: normalize(24),
        fontFamily: fonts.medium,
        color: colors.black,
    },
    Body_1_SemiBold: {
        fontSize: normalize(16),
        lineHeight: normalize(24),
        fontFamily: fonts.semi_bold,
        color: colors.black,
    },
    Body_1_Bold: {
        fontSize: normalize(16),
        lineHeight: normalize(24),
        fontFamily: fonts.bold,
        color: colors.black,
    },
    Body_2_Regular: {
        fontSize: normalize(12),
        lineHeight: normalize(20),
        fontFamily: fonts.regular,
        color: colors.black,
    },
    Body_2_Medium: {
        fontSize: normalize(12),
        lineHeight: normalize(20),
        fontFamily: fonts.medium,
        color: colors.black,
    },
    Body_2_SemiBold: {
        fontSize: normalize(12),
        lineHeight: normalize(20),
        fontFamily: fonts.semi_bold,
        color: colors.black,
    },
    Body_2_Bold: {
        fontSize: normalize(12),
        lineHeight: normalize(20),
        fontFamily: fonts.bold,
        color: colors.black,
    },
    Button: {
        fontSize: normalize(12),
        lineHeight: normalize(20),
        fontFamily: fonts.semi_bold,
        color: colors.black,
    },
    Caption: {
        fontSize: normalize(12),
        lineHeight: normalize(20),
        fontFamily: fonts.regular,
        color: colors.black,
    },
    Overline: {
        fontSize: normalize(10),
        lineHeight: normalize(18),
        fontFamily: fonts.regular,
        color: colors.black,
    },
})