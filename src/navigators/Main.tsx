import React from 'react';
import { Example } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';
import ProductsListScreen from '../screens/product/ProductsListScreen';

const Stack = createStackNavigator();

// @refresh reset
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Home" component={Example} /> */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductsListScreen" component={ProductsListScreen} />

    </Stack.Navigator>
  );
};

export default MainNavigator;
