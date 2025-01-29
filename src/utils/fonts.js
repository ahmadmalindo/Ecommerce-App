import { StyleSheet } from "react-native"
import { colors } from "./colors"
import { responsive } from "./responsive"

export const fonts = {
    regular: "Poppins-Regular",
    bold: "Poppins-Bold",
    semi_bold: "Poppins-SemiBold",
    medium: "Poppins-Medium"
}

export const stylesFonts = StyleSheet.create({
    Display_1: {
        fontSize: responsive(48),
        letterSpacing: 0.1,
        lineHeight: responsive(64),
        fontFamily: fonts.semi_bold,
        color: colors.black,
    },
    Display_2: {
        fontSize: responsive(32),
        letterSpacing: 0.1,
        lineHeight: responsive(40),
        fontFamily: fonts.semi_bold,
        color: colors.black,
    },
    Heading_1: {
        fontSize: responsive(24),
        lineHeight: responsive(32),
        fontFamily: fonts.semi_bold,
        color: colors.black,
    },
    Heading_2: {
        fontSize: responsive(20),
        lineHeight: responsive(28),
        fontFamily: fonts.semi_bold,
        color: colors.black,
    },
    Heading_3: {
        fontSize: responsive(22),
        lineHeight: responsive(30),
        fontFamily: fonts.semi_bold,
        color: colors.black,
    },
    Subtittle_1_Regular: {
        fontSize: responsive(18),
        lineHeight: responsive(26),
        fontFamily: fonts.regular,
        color: colors.black,
    },
    Subtittle_1_Medium: {
        fontSize: responsive(18),
        lineHeight: responsive(26),
        fontFamily: fonts.medium,
        color: colors.black,
    },
    Subtittle_1_SemiBold: {
        fontSize: responsive(18),
        lineHeight: responsive(26),
        fontFamily: fonts.semi_bold,
        color: colors.black,
    },
    Subtittle_1_Bold: {
        fontSize: responsive(18),
        lineHeight: responsive(26),
        fontFamily: fonts.bold,
        color: colors.black,
    },
    Subtittle_2_Regular: {
        fontSize: responsive(14),
        lineHeight: responsive(22),
        fontFamily: fonts.regular,
        color: colors.black,
    },
    Subtittle_2_Medium: {
        fontSize: responsive(14),
        lineHeight: responsive(22),
        fontFamily: fonts.medium,
        color: colors.black,
    },
    Subtittle_2_SemiBold: {
        fontSize: responsive(14),
        lineHeight: responsive(22),
        fontFamily: fonts.semi_bold,
        color: colors.black,
    },
    Subtittle_2_Bold: {
        fontSize: responsive(14),
        lineHeight: responsive(22),
        fontFamily: fonts.bold,
        color: colors.black,
    },
    Body_1_Regular: {
        fontSize: responsive(16),
        lineHeight: responsive(24),
        fontFamily: fonts.regular,
        color: colors.black,
    },
    Body_1_Medium: {
        fontSize: responsive(16),
        lineHeight: responsive(24),
        fontFamily: fonts.medium,
        color: colors.black,
    },
    Body_1_SemiBold: {
        fontSize: responsive(16),
        lineHeight: responsive(24),
        fontFamily: fonts.semi_bold,
        color: colors.black,
    },
    Body_1_Bold: {
        fontSize: responsive(16),
        lineHeight: responsive(24),
        fontFamily: fonts.bold,
        color: colors.black,
    },
    Body_2_Regular: {
        fontSize: responsive(12),
        lineHeight: responsive(20),
        fontFamily: fonts.regular,
        color: colors.black,
    },
    Body_2_Medium: {
        fontSize: responsive(12),
        lineHeight: responsive(20),
        fontFamily: fonts.medium,
        color: colors.black,
    },
    Body_2_SemiBold: {
        fontSize: responsive(12),
        lineHeight: responsive(20),
        fontFamily: fonts.semi_bold,
        color: colors.black,
    },
    Body_2_Bold: {
        fontSize: responsive(12),
        lineHeight: responsive(20),
        fontFamily: fonts.bold,
        color: colors.black,
    },
    Button: {
        fontSize: responsive(12),
        lineHeight: responsive(20),
        fontFamily: fonts.semi_bold,
        color: colors.black,
    },
    Caption: {
        fontSize: responsive(12),
        lineHeight: responsive(20),
        fontFamily: fonts.regular,
        color: colors.black,
    },
    Overline: {
        fontSize: responsive(10),
        lineHeight: responsive(18),
        fontFamily: fonts.regular,
        color: colors.black,
    },
})