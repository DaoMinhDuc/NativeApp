import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../Wellcome/Wellcome";
import SignUpScreen from "../Wellcome/SignUpScreen";
import LoginScreen from "../Wellcome/LoginScreen";
import HomeScreen from "../HomePage/HomeScreen";
import CartScreen from "../HomePage/CartScreen"
import HomeTabNavigator from "../Navigation/HomeTabNavigator";
import SearchScreen from "../ListFood/SearchScreen";
import DetailScreen from "../ListFood/DetailScreen";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DetailHistoryScreen from "../HomePage/DetailHistoryScreen";
import HistoryScreen from "../HomePage/HistoryScreen";

const Stack = createNativeStackNavigator();


const AppNavigator = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="HomeTabs" component={HomeTabNavigator} />
        <Stack.Screen name="DetailHistory" component={DetailHistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default AppNavigator;
