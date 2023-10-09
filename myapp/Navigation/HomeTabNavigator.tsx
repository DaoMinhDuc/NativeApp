import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../HomePage/HomeScreen";
import ProfileScreen from "../HomePage/ProfileScreen";
import HistoryScreen from "../HomePage/HistoryScreen";
import FavoriteScreen from "../HomePage/FavoriteScreen";
import Icon from 'react-native-vector-icons/FontAwesome5';
const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
  
        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Favorite') {
          iconName = 'heart';
        } else if (route.name === 'Profile') {
          iconName = 'user';
        } else if (route.name === 'History') {
          iconName = 'history';
        }
  
        return <Icon name={iconName} color={color} size={size} />;
      },
      tabBarLabel: () => null,
      headerShown: false,
    })}
    tabBarOptions={{
      activeTintColor: '#FA4A0C',
      inactiveTintColor: '#ADADAF',
      style: {
        backgroundColor: '#FFFFFF',
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

export default HomeTabNavigator;