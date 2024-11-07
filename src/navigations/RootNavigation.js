import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboard from "scences/Onboard";
import AuthNavigation from "./AuthNavigation";
import DashboardNavigation from "./DashboardNavigation";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "scences/SplashScreen";
import { ActivityIndicator } from "react-native";
import ExampleComponents from "scences/ExampleComponents";

const linking = {
    prefixes: ['kavemember://'],
    config: {
        initialRouteName: 'SplashScreen',
        screens: {
            DashboardNavigation: {
                screens: {
                    EditPassword: 'forget-password/:id'
                }
            }
        }
    }
};

function RootNavigation() {

    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer linking={linking} fallback={<ActivityIndicator/>}>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="SplashScreen">
                <Stack.Screen name="SplashScreen" component={SplashScreen}/>
                <Stack.Screen name="Onboard" component={Onboard}/>
                <Stack.Screen name="AuthNavigation" component={AuthNavigation}/>
                <Stack.Screen name="DashboardNavigation" component={DashboardNavigation}/>
                <Stack.Screen name="ExampleComponents" component={ExampleComponents}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation