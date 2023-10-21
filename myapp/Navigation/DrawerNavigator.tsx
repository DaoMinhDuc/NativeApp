import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../HomePage/HomeScreen';
import DrawerContent from '../ListFood/DrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
      <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="SideBar" component={DrawerContent} />
      {/* Thêm các màn hình khác vào đây */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
