// GigAssistant/navigation/AppNavigator.js
import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // NEW

import RehearsalScreen from '../screens/RehearsalScreen';
import GigsScreen from '../screens/GigsScreen';
import AddEditRehearsalScreen from '../screens/AddEditRehearsalScreen';
import AddEditGigScreen from '../screens/AddEditGigScreen';
import FloatingActionButton from '../components/FloatingActionButton';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // NEW

// This function defines your Bottom Tab Navigator
function MainTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#f4511e' }, // Example header color for tabs
        headerTintColor: '#fff', // White text for tab headers
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarActiveTintColor: '#f4511e', // Color for active tab icon and label
        tabBarInactiveTintColor: 'gray', // Color for inactive tab icon and label
        // tabBarShowLabel: false, // Optionally hide tab labels
        // tabBarStyle: { backgroundColor: '#fff' }, // Style for the tab bar itself
      }}
    >
      <Tab.Screen
        name="Rehearsals"
        component={RehearsalScreen}
        options={{ title: 'Rehearsals' /*, tabBarIcon: ({ color, size }) => ( ... ) */ }}
      />
      <Tab.Screen
        name="Gigs"
        component={GigsScreen}
        options={{ title: 'Gigs' /*, tabBarIcon: ({ color, size }) => ( ... ) */ }}
      />
    </Tab.Navigator>
  );
}

// This is the main navigator exported, now a Stack Navigator
export default function AppNavigator() {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        // Default screen options for the stack (e.g., header styles for modal screens)
        // screenOptions={{
        //   headerStyle: { backgroundColor: '#007bff' }, // Blue header for stack screens
        //   headerTintColor: '#ffffff', // White text for stack screen headers
        //   headerTitleStyle: { fontWeight: 'bold' },
        // }}
      >
        <Stack.Screen
          name="MainTabs"
          component={MainTabsNavigator}
          options={{ headerShown: false }} // No header for the screen that contains the tabs
        />
        <Stack.Screen
          name="AddEditRehearsalScreen"
          component={AddEditRehearsalScreen}
          // options={{ title: 'Add/Edit Rehearsal' }} // Title is set dynamically in the screen itself
        />
        <Stack.Screen
          name="AddEditGigScreen"
          component={AddEditGigScreen}
          // options={{ title: 'Add/Edit Gig' }} // Title is set dynamically in the screen itself
        />
      </Stack.Navigator>
      <FloatingActionButton />
    </View>
  );
}
