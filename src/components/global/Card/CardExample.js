import React from "react";
import { View, Text } from "react-native";
import { customStyle, stylesFonts } from "utils/index";

const CardExample = ({

}) => {
    return (
        <View style={customStyle.card}>
            <Text style={stylesFonts.Body_1_SemiBold}>Example Card</Text>
        </View>
    )
}

export default React.memo(CardExample)