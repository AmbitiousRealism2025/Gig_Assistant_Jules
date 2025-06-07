// GigAssistant/components/FloatingActionButton.js
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const FloatingActionButton = () => { // Removed navigation prop
  const navigation = useNavigation(); // Use the hook

  const showOptions = () => {
    Alert.alert(
      "Add New",
      "What would you like to add?",
      [
        {
          text: "New Rehearsal",
          onPress: () => {
            // TODO: Navigate to AddEditRehearsalScreen
            console.log("New Rehearsal pressed");
            // navigation.navigate('AddEditRehearsalScreen'); // Example navigation
          },
        },
        {
          text: "New Gig",
          onPress: () => {
            // TODO: Navigate to AddEditGigScreen
            console.log("New Gig pressed");
            // navigation.navigate('AddEditGigScreen'); // Example navigation
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity style={styles.fab} onPress={showOptions}>
      <Text style={styles.fabText}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#007bff', // Example color
    borderRadius: 28,
    elevation: 8, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { height: 2, width: 0 },
  },
  fabText: {
    fontSize: 24,
    color: 'white',
  },
});

export default FloatingActionButton;
