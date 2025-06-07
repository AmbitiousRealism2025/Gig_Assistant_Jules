// GigAssistant/screens/AddEditGigScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';

const GIGS_STORAGE_KEY = '@GigAssistant:gigs';

const AddEditGigScreen = ({ navigation, route }) => {
  const [gigDate, setGigDate] = useState(''); // Should be YYYY-MM-DD
  const [callTime, setCallTime] = useState(''); // Should be HH:MM or parsable time string
  const [venueName, setVenueName] = useState('');
  const [venueAddress, setVenueAddress] = useState('');
  const [venueContact, setVenueContact] = useState('');
  const [compensation, setCompensation] = useState(''); // Store as string, parse to float on save
  const [notes, setNotes] = useState('');

  const existingGig = route.params?.gig;

  useEffect(() => {
    if (existingGig) {
      navigation.setOptions({ title: 'Edit Gig' });
      setGigDate(existingGig.date || '');
      setCallTime(existingGig.callTime || '');
      setVenueName(existingGig.venue?.name || '');
      setVenueAddress(existingGig.venue?.address || '');
      setVenueContact(existingGig.venue?.contact || '');
      // Use compensationAmount if available, otherwise fall back to compensation, then ensure it's a string for input
      const compValue = existingGig.compensationAmount !== undefined ? existingGig.compensationAmount : existingGig.compensation;
      setCompensation(compValue !== null && compValue !== undefined ? String(compValue) : '');
      setNotes(existingGig.notes || '');
    } else {
      navigation.setOptions({ title: 'Add New Gig' });
    }
  }, [existingGig, navigation]);

  const handleSave = async () => {
    if (!venueName.trim() || !gigDate.trim()) {
      Alert.alert("Missing Info", "Venue Name and Gig Date are required.");
      return;
    }
    // Basic date validation (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(gigDate.trim())) {
        Alert.alert("Invalid Date", "Please enter the Gig Date in YYYY-MM-DD format.");
        return;
    }
    // Basic time validation (HH:MM) for callTime if not empty
    if (callTime.trim() && !/^\d{2}:\d{2}(:\d{2})?$/.test(callTime.trim()) && !isNaN(new Date(callTime.trim()).getTime()) === false ) {
        // Allow full date-time strings too, but if it's just time, it should be HH:MM
        // This regex is basic. A more robust solution might be needed if various time inputs are expected.
        // The check `!isNaN(new Date(callTime.trim()).getTime()) === false` is to see if it's NOT a valid full date string
        // This logic is a bit complex, simplifying for now: if it's not empty, it should be somewhat valid.
        // GigCard's formatDate will try its best.
    }

    const gigData = {
      id: existingGig?.id || Date.now().toString(),
      date: gigDate.trim(), // Expect YYYY-MM-DD
      callTime: callTime.trim(), // Expect HH:MM or a string GigCard can parse
      venue: {
        name: venueName.trim(),
        address: venueAddress.trim(),
        contact: venueContact.trim(),
      },
      compensationAmount: parseFloat(compensation) || 0, // Save as number
      notes: notes.trim(),
    };

    try {
      const storedGigs = await AsyncStorage.getItem(GIGS_STORAGE_KEY);
      let gigsArray = storedGigs ? JSON.parse(storedGigs) : [];
      if (existingGig) {
        const index = gigsArray.findIndex(g => g.id === existingGig.id);
        if (index > -1) {
            gigsArray[index] = gigData;
        } else { // Fallback if existingGig ID not found (should ideally not happen)
            Alert.alert("Update Error", "Original gig not found for update, saving as new.");
            gigsArray.push(gigData);
        }
      } else {
        gigsArray.push(gigData);
      }
      await AsyncStorage.setItem(GIGS_STORAGE_KEY, JSON.stringify(gigsArray));
      Alert.alert("Success", existingGig ? "Gig updated successfully!" : "Gig saved successfully!");
      navigation.goBack();
    } catch (e) {
      console.error("Failed to save gig to AsyncStorage", e);
      Alert.alert("Save Error", "Could not save gig data. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!existingGig) return;
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this gig? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const storedGigs = await AsyncStorage.getItem(GIGS_STORAGE_KEY);
              let gigsArray = storedGigs ? JSON.parse(storedGigs) : [];
              gigsArray = gigsArray.filter(g => g.id !== existingGig.id);
              await AsyncStorage.setItem(GIGS_STORAGE_KEY, JSON.stringify(gigsArray));
              Alert.alert("Gig Deleted", "The gig has been successfully deleted.");
              navigation.goBack();
            } catch (e) {
              console.error("Failed to delete gig from AsyncStorage", e);
              Alert.alert("Delete Error", "Could not delete gig. Please try again.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.label}>Date (YYYY-MM-DD):</Text>
        <TextInput style={styles.input} value={gigDate} onChangeText={setGigDate} placeholder="e.g., 2024-12-31"/>

        <Text style={styles.label}>Call Time (HH:MM):</Text>
        <TextInput style={styles.input} value={callTime} onChangeText={setCallTime} placeholder="e.g., 19:30"/>

        <Text style={styles.label}>Venue Name:</Text>
        <TextInput style={styles.input} value={venueName} onChangeText={setVenueName} placeholder="e.g., The Grand Hall"/>

        <Text style={styles.label}>Venue Address:</Text>
        <TextInput style={styles.input} value={venueAddress} onChangeText={setVenueAddress} placeholder="e.g., 123 Main St, Anytown"/>

        <Text style={styles.label}>Venue Contact (Email/Phone):</Text>
        <TextInput style={styles.input} value={venueContact} onChangeText={setVenueContact} placeholder="e.g., booking@venue.com or 555-1234"/>

        <Text style={styles.label}>Compensation ($):</Text>
        <TextInput style={styles.input} value={compensation} onChangeText={setCompensation} placeholder="e.g., 150" keyboardType="numeric"/>

        <Text style={styles.label}>Notes:</Text>
        <TextInput style={[styles.input, styles.multilineInput]} value={notes} onChangeText={setNotes} placeholder="e.g., Bring own mic, 2 sets" multiline={true} numberOfLines={4}/>

        <CustomButton title={existingGig ? "Update Gig" : "Save Gig"} onPress={handleSave} />
        {existingGig && (
          <CustomButton title="Delete Gig" onPress={handleDelete} style={styles.deleteButton} textStyle={styles.deleteButtonText} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#495057',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
    color: '#495057',
  },
  multilineInput: {
    minHeight: 100, // Changed from height to minHeight
    textAlignVertical: 'top',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    marginTop: 15,
  },
  deleteButtonText: { // This style might not be directly supported by CustomButton if it doesn't merge text styles deeply.
                      // Assuming CustomButton's textStyle prop overrides default text styles.
    color: '#ffffff',
  }
});

export default AddEditGigScreen;
