import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Welcome from "./Wellcome";
import SignUpScreen from "./SignUpScreen";
import LoginScreen from "./LoginScreen";
import HomeScreen from "../HomePage/HomeScreen";
import ProfileScreen from "../HomePage/ProfileScreen";
import HistoryScreen from "../HomePage/HistoryScreen";
import FavoriteScreen from "../HomePage/FavoriteScreen";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { RouteProp } from "@react-navigation/native";
import { ParamListBase } from "@react-navigation/routers";

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  HomeTabs: undefined;
};

type HomeTabParamList = {
  Home: undefined;
  Favorite: undefined;
  Tôi: undefined;
  "Lịch sử": undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<HomeTabParamList>();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Favorite") {
            iconName = "heart";
          } else if (route.name === "Tôi") {
            iconName = "user";
          } else if (route.name === "Lịch sử") {
            iconName = "history";
          }

          return <Icon name={iconName} color={color} size={size} />;
        },
        tabBarLabel: () => null,
        headerShown: false,
      })}
      tabBarOptions={{
        activeTintColor: "#FA4A0C",
        inactiveTintColor: "#ADADAF",
        style: {
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: () => {
            return '';
          },
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          headerShown: false,
          tabBarLabel: () => {
            return '';
          },
        }}
      />
      <Tab.Screen
        name="Tôi"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: () => {
            return '';
          },
        }}
      />
      <Tab.Screen
        name="Lịch sử"
        component={HistoryScreen}
        options={{
          headerShown: false,
          tabBarLabel: () => {
            return '';
          },
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="HomeTabs" component={HomeTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
