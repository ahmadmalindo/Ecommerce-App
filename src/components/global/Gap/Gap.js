import React from "react";
import { View } from "react-native";

const Gap = ({
    children,
    marginTop,
    marginBottom,
    marginRight,
    marginLeft,
    paddingHorizontal,
    paddingTop,
    customStyle
}) => {
    return (
        <View 
            style={[customStyle, {
                marginBottom: marginBottom, 
                marginTop: marginTop, 
                marginRight: marginRight, 
                marginLeft: marginLeft,
                paddingHorizontal: paddingHorizontal,
                paddingTop: paddingTop,
            }]}
        >
            {children}
        </View>
    )
} 

export default React.memo(Gap)
