// GigAssistant/navigation/AppNavigator.js
import React from 'react';
import { View, StyleSheet } from 'react-native'; // Added View and StyleSheet
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RehearsalScreen from '../screens/RehearsalScreen';
import GigsScreen from '../screens/GigsScreen';
import FloatingActionButton from '../components/FloatingActionButton'; // Make sure path is correct

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e', // Example header color
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarActiveTintColor: '#f4511e',
          tabBarInactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen
          name="Rehearsals"
          component={RehearsalScreen}
          options={{ title: 'Rehearsals' }}
        />
        <Tab.Screen
          name="Gigs"
          component={GigsScreen}
          options={{ title: 'Gigs' }}
        />
      </Tab.Navigator>
      <FloatingActionButton />
    </View>
  );
}
