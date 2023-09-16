import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../HomePage/HomeScreen";
import ProfileScreen from "../HomePage/ProfileScreen";
import HistoryScreen from "../HomePage/HistoryScreen";
import FavoriteScreen from "../HomePage/FavoriteScreen";
import Icon from 'react-native-vector-icons/FontAwesome5';
const Tab = createBottomTabNavigator();

const Navigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: () => {
            return '';
          },
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Favorite" component={FavoriteScreen}
       options={{
        tabBarLabel: () => {
          return '';
        },
        tabBarIcon: ({ color, size }) => (
          <Icon name="heart" color={color} size={size} />
        ),
      }} />
      
      <Tab.Screen name="Tôi" component={ProfileScreen}
      options={{
        tabBarLabel: () => {
          return '';
        },
        tabBarIcon: ({ color, size }) => (
          <Icon name="user" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="Lịch sử" component={HistoryScreen}
      options={{
        tabBarLabel: () => {
          return '';
        },
        tabBarIcon: ({ color, size }) => (
          <Icon name="history" color={color} size={size} />
        ),
      }} />
    </Tab.Navigator>
  );
};

export default Navigator;