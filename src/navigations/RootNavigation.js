import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboard from "scences/Onboard";
import AuthNavigation from "./AuthNavigation";
import DashboardNavigation from "./DashboardNavigation";
import { NavigationContainer } from "@react-navigation/native";

function RootNavigation() {

    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Onboard">
                <Stack.Screen name="Onboard" component={Onboard}/>
                <Stack.Screen name="AuthNavigation" component={AuthNavigation}/>
                <Stack.Screen name="DashboardNavigation" component={DashboardNavigation}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation