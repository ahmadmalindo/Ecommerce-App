import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "scences/Dashboard/Home/Home";
import Account from "scences/Dashboard/Account/Account";
import { colors } from "utils/colors";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { fonts } from "utils/fonts";
import EditProfile from "scences/Dashboard/Account/EditProfile";
import EditPassword from "scences/Dashboard/Account/EditPassword";
import { Gap } from "components/global";
import DeleteAccount from "scences/Dashboard/Account/DeleteAccount";
import Notifications from "scences/Dashboard/Notifications";
import { responsive } from "utils";
import DetailProduct from "scences/Dashboard/Home/DetailProduct";
import Cart from "scences/Dashboard/Cart/Cart";
import Checkout from "scences/Dashboard/Cart/Checkout";
import AddAddress from "scences/Dashboard/Account/Address/AddAddress";
import History from "scences/Dashboard/History/History";
import DetailHistory from "scences/Dashboard/History/DetailHistory";
import Address from "scences/Dashboard/Account/Address/Address";
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

function MyTabBar({ state, descriptors, navigation }) {
    return (
      <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, backgroundColor: 'white'}}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

  
          const isFocused = state.index === index;

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
              style={{ flex: 1, height: responsive(84), alignItems: 'center', justifyContent: 'center', backgroundColor: 'white',  borderTopWidth: 0.2, borderTopColor: colors.grey_2 }}
            >
                {route?.name == "Home" ?
                <Entypo name="home" size={responsive(28)} color={isFocused ? colors.primary : colors.grey} />
                : route?.name == "Cart" ?
                <FontAwesome5 name="shopping-bag" size={responsive(28)} color={isFocused ? colors.primary : colors.grey} />
                : route?.name == "History" ?
                <MaterialIcons name="history" size={responsive(34)} color={isFocused ? colors.primary : colors.grey} />
                : route?.name == "Account" ?
                <MaterialIcons name="account-circle" size={responsive(34)} color={isFocused ? colors.primary : colors.grey} />
                :
                null
                }
                <Gap marginBottom={responsive(12)}/>
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
            <Tab.Screen options={{title: 'Keranjang'}} name="Cart" component={Cart} />
            <Tab.Screen options={{title: 'History'}} name="History" component={History} />
            <Tab.Screen options={{title: 'Akun'}} name="Account" component={Account} />
        </Tab.Navigator>
    )
}


function DashboardNavigation() {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={DashboardTabs}/>

            <Stack.Screen name="DetailProduct" component={DetailProduct}/>

            <Stack.Screen name="Checkout" component={Checkout}/>

            <Stack.Screen name="DetailHistory" component={DetailHistory}/>

            <Stack.Screen name="Address" component={Address}/>
            <Stack.Screen name="AddAddress" component={AddAddress}/>

            <Stack.Screen name="EditProfile" component={EditProfile}/>
            <Stack.Screen name="DeleteAccount" component={DeleteAccount}/>
            <Stack.Screen name="EditPassword" component={EditPassword}/>

            <Stack.Screen name="Notifications" component={Notifications}/>
        </Stack.Navigator>
    )
}

export default DashboardNavigation
