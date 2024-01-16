import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "scences/Dashboard/Home/Home";
import Account from "scences/Dashboard/Account/Account";
import Inbox from "scences/Dashboard/Inbox/Inbox";
import ArtWork from "scences/Dashboard/Artwork/Artwork";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "utils/colors";
import { Image } from "react-native";
import normalize from "react-native-normalize";
import { fonts } from "utils/fonts";
import DetailReceipt from "scences/Dashboard/Home/DetailReceipt";
import Nearest from "scences/Dashboard/Home/Nearest";
import DetailNearest from "scences/Dashboard/Home/DetailNearest";
import EditProfile from "scences/Dashboard/Account/EditProfile";
import EditPassword from "scences/Dashboard/Account/EditPassword";

function DashboardTabs () {
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? require('assets/images/bottomBar/ic_home_fill.png')
                            : require('assets/images/bottomBar/ic_home.png');
                    } 
                    else if (route.name === 'Inbox') {
                    iconName = focused 
                        ? require('assets/images/bottomBar/ic_inbox_fill.png') 
                        : require('assets/images/bottomBar/ic_inbox.png');
                    }
                    else if (route.name === 'ArtWork') {
                        iconName = focused 
                            ? require('assets/images/bottomBar/ic_artwork_fill.png') 
                            : require('assets/images/bottomBar/ic_artwork.png');
                    }
                    else if (route.name === 'Account') {
                        iconName = focused 
                            ? require('assets/images/bottomBar/ic_account_fill.png') 
                            : require('assets/images/bottomBar/ic_account.png');
                    }

                    // You can return any component that you like here!
                    return <Image source={iconName} style={{width: normalize(24), height: normalize(24)}}/>
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.grey,
                headerShown: false,
                tabBarLabelStyle: {fontFamily: fonts.regular, marginTop: normalize(-5), borderTopWidth: 1, borderTopColor: colors.grey},
                tabBarStyle:{height: normalize(84)}
            })}
        >
            <Tab.Screen options={{title: 'Beranda'}} name="Home" component={Home} />
            <Tab.Screen options={{title: 'Pesan'}} name="Inbox" component={Inbox} />
            <Tab.Screen options={{title: 'ArtWorks'}} name="ArtWork" component={ArtWork} />
            <Tab.Screen options={{title: 'Akun'}} name="Account" component={Account} />
        </Tab.Navigator>
    )
}


function DashboardNavigation() {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={DashboardTabs}/>
            <Stack.Screen name="DetailReceipt" component={DetailReceipt}/>
            <Stack.Screen name="Nearest" component={Nearest}/>
            <Stack.Screen name="DetailNearest" component={DetailNearest}/>
            <Stack.Screen name="EditProfile" component={EditProfile}/>
            <Stack.Screen name="EditPassword" component={EditPassword}/>
        </Stack.Navigator>
    )
}

export default DashboardNavigation
