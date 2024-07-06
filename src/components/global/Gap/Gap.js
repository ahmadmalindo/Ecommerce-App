import React from "react";
import { View } from "react-native";

const Gap = ({
    children,
    marginTop,
    marginBottom,
    marginRight,
    marginLeft,
    paddingHorizontal,
    paddingVertical,
    paddingTop,
    paddingBottom,
    customStyle,
    marginHorizontal,
    marginVertical
}) => {
    return (
        <View 
            style={[customStyle, {
                marginBottom: marginBottom, 
                marginTop: marginTop, 
                marginRight: marginRight, 
                marginLeft: marginLeft,
                paddingHorizontal: paddingHorizontal,
                paddingVertical: paddingVertical,
                paddingTop: paddingTop,
                paddingBottom: paddingBottom,
                marginHorizontal: marginHorizontal,
                marginVertical: marginVertical
            }]}
        >
            {children}
        </View>
    )
} 

export default React.memo(Gap)
