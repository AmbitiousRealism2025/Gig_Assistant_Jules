import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RehearsalScreen from '../screens/RehearsalScreen';
import GigsScreen from '../screens/GigsScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Rehearsals" component={RehearsalScreen} />
      <Tab.Screen name="Gigs" component={GigsScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
