import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "scences/Dashboard/Home/Home";
import Account from "scences/Dashboard/Account/Account";
import Inbox from "scences/Dashboard/Inbox/Inbox";
import ArtWork from "scences/Dashboard/Artwork/Artwork";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "utils/colors";
import { Image, Text, TouchableOpacity, View } from "react-native";
import normalize from "react-native-normalize";
import { fonts } from "utils/fonts";
import DetailReceipt from "scences/Dashboard/Home/DetailReceipt";
import Nearest from "scences/Dashboard/Home/Nearest";
import DetailNearest from "scences/Dashboard/Home/DetailNearest";
import EditProfile from "scences/Dashboard/Account/EditProfile";
import EditPassword from "scences/Dashboard/Account/EditPassword";
import Rating from "scences/Dashboard/Home/Rating";
import DetailArtwork from "scences/Dashboard/Artwork/DetailArtwork";
import DetailHairStyler from "scences/Dashboard/Artwork/DetailHairStyler";
import DetailHasil from "scences/Dashboard/Artwork/DetailHasil";
import { Gap } from "components/global";

function MyTabBar({ state, descriptors, navigation }) {
    return (
      <View style={{ flexDirection: 'row' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

  
          const isFocused = state.index === index;

            let iconName;

            if (route.name === 'Home') {
                iconName = isFocused
                    ? require('assets/images/bottomBar/ic_home_fill.png')
                    : require('assets/images/bottomBar/ic_home.png');
            } 
            else if (route.name === 'Inbox') {
            iconName = isFocused 
                ? require('assets/images/bottomBar/ic_inbox_fill.png') 
                : require('assets/images/bottomBar/ic_inbox.png');
            }
            else if (route.name === 'ArtWork') {
                iconName = isFocused 
                    ? require('assets/images/bottomBar/ic_artwork_fill.png') 
                    : require('assets/images/bottomBar/ic_artwork.png');
            }
            else if (route.name === 'Account') {
                iconName = isFocused 
                    ? require('assets/images/bottomBar/ic_account_fill.png') 
                    : require('assets/images/bottomBar/ic_account.png');
            }
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, height: normalize(84), alignItems: 'center', justifyContent: 'center', backgroundColor: 'white',  borderTopWidth: 0.2, borderTopColor: colors.grey_2 }}
            >
                <Image source={iconName} style={{width: normalize(24), height: normalize(24)}}/>
                <Gap marginBottom={normalize(6)}/>
                <Text style={{ color: isFocused ? colors.primary : colors.grey, fontFamily: fonts.regular, fontSize: normalize(12) }}>
                    {label}
                </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
}

function DashboardTabs () {
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />} screenOptions={{headerShown: false}}>
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
            <Stack.Screen name="Rating" component={Rating}/>
            <Stack.Screen name="DetailArtwork" component={DetailArtwork}/>
            <Stack.Screen name="DetailHairStyler" component={DetailHairStyler}/>
            <Stack.Screen name="DetailHasil" component={DetailHasil}/>
        </Stack.Navigator>
    )
}

export default DashboardNavigation
