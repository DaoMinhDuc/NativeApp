import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../Wellcome/Wellcome";
import SignUpScreen from "../Wellcome/SignUpScreen";
import LoginScreen from "../Wellcome/LoginScreen";
import HomeScreen from "../HomePage/HomeScreen";
import ProfileScreen from "../HomePage/ProfileScreen";
import HistoryScreen from "../HomePage/HistoryScreen";
import FavoriteScreen from "../HomePage/FavoriteScreen";
import CartScreen from "../HomePage/CartScreen"
import HomeTabNavigator from "../Navigation/HomeTabNavigator";
import SearchScreen from "../HomePage/ListFood/SearchScreen";
import DrawerNavigator from "./DrawerNavigator";
import DrawerContent from '../HomePage/ListFood/DrawerContent';
import DetailScreen from "../HomePage/ListFood/DetailScreen";


type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  HomeTabs: undefined;
  Cart: undefined;
  Home: undefined;
  Favorite: undefined;
  Profile: undefined;
  History: undefined;
  Search: undefined;
  Sidebar: undefined;
  Detail: undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();


const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="HomeTabs" component={HomeTabNavigator} />
        {/* <Stack.Screen name="Sidebar" component={DrawerNavigator} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
