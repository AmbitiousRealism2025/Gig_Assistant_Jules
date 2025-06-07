// GigAssistant/screens/RehearsalScreen.js
import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, Alert } from 'react-native'; // Added Alert
import RehearsalCard from '../components/RehearsalCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import CustomButton from '../../components/CustomButton'; // Only if using extra buttons like "Clear All"

const REHEARSALS_STORAGE_KEY = '@GigAssistant:rehearsals';

const RehearsalScreen = () => {
  const [rehearsals, setRehearsals] = useState([]);
  const navigation = useNavigation();

  const loadRehearsals = async () => {
    try {
      const storedRehearsals = await AsyncStorage.getItem(REHEARSALS_STORAGE_KEY);
      if (storedRehearsals !== null) {
        // Optional: Add sorting, e.g., by date
        const parsedRehearsals = JSON.parse(storedRehearsals);
        // Example sort: newest first if date is stored in a sortable format (e.g. ISO string)
        // Or sort by eventName, etc.
        // parsedRehearsals.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRehearsals(parsedRehearsals);
      } else {
        setRehearsals([]);
      }
    } catch (e) {
      console.error('Failed to load rehearsals from AsyncStorage.', e);
      Alert.alert("Load Error", "Could not load rehearsal data.");
      setRehearsals([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadRehearsals();
      // No cleanup needed for simple load
      return () => {};
    }, [])
  );

  // Example: Developer function to clear rehearsals (keep commented out or use for dev builds)
  // const clearAllRehearsals = async () => {
  //   Alert.alert("Confirm Clear", "Are you sure you want to delete ALL rehearsals? This is for development purposes.", [
  //     { text: "Cancel", style: "cancel"},
  //     { text: "Yes, Clear All", style: "destructive", onPress: async () => {
  //       try {
  //         await AsyncStorage.removeItem(REHEARSALS_STORAGE_KEY);
  //         setRehearsals([]);
  //         Alert.alert("Cleared", "All rehearsals have been cleared from AsyncStorage.");
  //       } catch (e) {
  //         console.error('Failed to clear rehearsals from AsyncStorage.', e);
  //         Alert.alert("Clear Error", "Could not clear rehearsal data.");
  //       }
  //     }}
  //   ]);
  // };

  return (
    <View style={styles.container}>
      {/* <CustomButton title="DEV: Clear All Rehearsals" onPress={clearAllRehearsals} style={{ backgroundColor: 'darkred', marginHorizontal: 16 }} /> */}
      <FlatList
        data={rehearsals}
        renderItem={({ item }) => (
          <RehearsalCard
            rehearsal={item}
            // Navigate to AddEditRehearsalScreen, passing the rehearsal item as a parameter
            // This allows AddEditRehearsalScreen to populate fields for editing
            onPress={() => navigation.navigate('AddEditRehearsalScreen', { rehearsal: item })}
          />
        )}
        keyExtractor={item => item.id.toString()} // Ensure key is a string
        ListEmptyComponent={
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyListText}>No rehearsals scheduled yet.</Text>
                <Text style={styles.emptyListSubText}>Use the '+' button below to add a new rehearsal.</Text>
            </View>
        }
        contentContainerStyle={rehearsals.length === 0 ? styles.emptyFlatListContainer : {}}
      />
      {/* The FAB is expected to be globally available for adding new items */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Light grey background for the screen
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyFlatListContainer: { // Ensures empty component takes full space if needed
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20, // Adjusted from 50
    fontSize: 18,
    color: '#555', // Darker grey
  },
  emptyListSubText: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    color: '#777',
  },
});

export default RehearsalScreen;
