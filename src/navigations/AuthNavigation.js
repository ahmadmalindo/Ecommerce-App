import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "scences/Auth/Login";
import ForgotPassword from "scences/Auth/ForgotPassword";
import FromUser from "scences/Auth/FormUser";

function AuthNavigation() {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
            <Stack.Screen name="FromUser" component={FromUser}/>
        </Stack.Navigator>
    )
}

export default AuthNavigation
