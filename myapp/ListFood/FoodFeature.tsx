import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FoodScreen from './FoodScreen';
import DrinksScreen from './DrinksScreen';
import SnacksScreen from './SnacksScreen';
import SauceScreen from './SauceScreen';

const Stack = createNativeStackNavigator();


const FoodFeature = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Food" component={FoodScreen} />
        <Stack.Screen name="Drinks" component={DrinksScreen} />
        <Stack.Screen name="Snacks" component={SnacksScreen} />
        <Stack.Screen name="Sauce" component={SauceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default FoodFeature;
