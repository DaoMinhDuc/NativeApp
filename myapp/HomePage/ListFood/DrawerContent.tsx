// DrawerContent.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const DrawerContent: React.FC = ({ navigation }: any) => {
  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (
    <DrawerContentScrollView>
      <View>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Profile')}>
          <View style={styles.drawerItem}>
            <Icon name="account" size={24} color="black" />
            <Text style={styles.drawerItemText}>Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Order')}>
          <View style={styles.drawerItem}>
            <Icon name="cart" size={24} color="black" />
            <Text style={styles.drawerItemText}>Order</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Security')}>
          <View style={styles.drawerItem}>
            <Icon name="shield-lock" size={24} color="black" />
            <Text style={styles.drawerItemText}>Security</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Logout')}>
          <View style={styles.drawerItem}>
            <Icon name="logout" size={24} color="black" />
            <Text style={styles.drawerItemText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 20,
  },
  drawerItemText: {
    fontSize: 18,
    marginLeft: 10,
  },
});
export default DrawerContent;
