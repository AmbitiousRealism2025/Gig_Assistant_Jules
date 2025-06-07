// GigAssistant/screens/AddEditGigScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Platform } from 'react-native';

const AddEditGigScreen = ({ navigation, route }) => {
  const [gigDate, setGigDate] = useState('');
  const [callTime, setCallTime] = useState('');
  const [venueName, setVenueName] = useState('');
  const [venueAddress, setVenueAddress] = useState('');
  const [venueContact, setVenueContact] = useState('');
  const [compensation, setCompensation] = useState('');
  const [notes, setNotes] = useState('');

  // For editing existing items later
  // const existingGig = route.params?.gig;
  // useEffect(() => {
  //   if (existingGig) {
  //     setGigDate(existingGig.date); // Ensure format compatibility
  //     setCallTime(existingGig.callTime); // Ensure format compatibility
  //     setVenueName(existingGig.venue?.name);
  //     setVenueAddress(existingGig.venue?.address);
  //     setVenueContact(existingGig.venue?.contact);
  //     setCompensation(String(existingGig.compensationAmount)); // Ensure 'compensationAmount' matches data model
  //     setNotes(existingGig.notes);
  //     navigation.setOptions({ title: 'Edit Gig' });
  //   } else {
  //     navigation.setOptions({ title: 'Add New Gig' });
  //   }
  // }, [existingGig, navigation]);

  const handleSave = () => {
    const gigData = {
      date: gigDate, // Matched to GigCard prop
      callTime,
      venue: {
        name: venueName,
        address: venueAddress,
        contact: venueContact,
      },
      compensationAmount: parseFloat(compensation) || 0, // Matched to GigCard prop
      notes,
      // id: existingGig ? existingGig.id : Date.now().toString() // For saving
    };
    console.log('Saving Gig:', gigData);
    // TODO: Implement save logic (AsyncStorage)
    // TODO: Navigate back or to the gigs list
    // navigation.goBack();
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.label}>Date (YYYY-MM-DD):</Text>
        <TextInput
          style={styles.input}
          value={gigDate}
          onChangeText={setGigDate}
          placeholder="e.g., 2024-12-31"
        />

        <Text style={styles.label}>Call Time (HH:MM, 24hr format):</Text>
        <TextInput
          style={styles.input}
          value={callTime}
          onChangeText={setCallTime}
          placeholder="e.g., 19:30"
        />

        <Text style={styles.label}>Venue Name:</Text>
        <TextInput
          style={styles.input}
          value={venueName}
          onChangeText={setVenueName}
          placeholder="e.g., The Grand Hall"
        />

        <Text style={styles.label}>Venue Address:</Text>
        <TextInput
          style={styles.input}
          value={venueAddress}
          onChangeText={setVenueAddress}
          placeholder="e.g., 123 Main St, Anytown"
        />

        <Text style={styles.label}>Venue Contact (Email/Phone):</Text>
        <TextInput
          style={styles.input}
          value={venueContact}
          onChangeText={setVenueContact}
          placeholder="e.g., booking@venue.com or 555-1234"
        />

        <Text style={styles.label}>Compensation ($):</Text>
        <TextInput
          style={styles.input}
          value={compensation}
          onChangeText={setCompensation}
          placeholder="e.g., 150"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Notes:</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={notes}
          onChangeText={setNotes}
          placeholder="e.g., Bring own mic, 2 sets"
          multiline={true}
          numberOfLines={4}
        />

        <Button title="Save Gig" onPress={handleSave} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
  },
  multilineInput: {
    minHeight: 80, // Use minHeight for multiline
    textAlignVertical: 'top', // Android specific
  },
});

export default AddEditGigScreen;
