// GigAssistant/screens/GigsScreen.js
import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import GigCard from '../components/GigCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const GIGS_STORAGE_KEY = '@GigAssistant:gigs';

const GigsScreen = () => {
  const [gigs, setGigs] = useState([]);
  const navigation = useNavigation();

  const loadGigs = async () => {
    try {
      const storedGigs = await AsyncStorage.getItem(GIGS_STORAGE_KEY);
      if (storedGigs !== null) {
        const parsedGigs = JSON.parse(storedGigs);
        // Sort gigs by date: upcoming first. If dates are same, sort by callTime if available.
        parsedGigs.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          if (dateA.getTime() !== dateB.getTime()) {
            return dateA - dateB; // Sorts oldest to newest, for upcoming, reverse logic or use .reverse()
          }
          // If dates are the same, try to sort by callTime
          // This assumes callTime is 'HH:MM' or a string that can be appended to date for comparison
          if (a.callTime && b.callTime) {
            // Create full datetime strings for comparison if callTime is just time
            const dateTimeA = new Date(`${a.date.split('T')[0]}T${a.callTime}`);
            const dateTimeB = new Date(`${b.date.split('T')[0]}T${b.callTime}`);
            if (!isNaN(dateTimeA.getTime()) && !isNaN(dateTimeB.getTime())) {
              return dateTimeA - dateTimeB;
            }
          }
          return 0; // Keep order if callTimes are not comparable
        });
        // To show upcoming gigs first (most recent date first, or future dates first)
        // If sorting by date a - b gives past to future, then reverse for future to past.
        // For "upcoming first", it means future dates should come before past dates,
        // and among future dates, nearer ones first.
        // The current sort `dateA - dateB` is oldest to newest.
        // For "upcoming", we might want newest dates (closest to today, future) first.
        // Or simply reverse the sort to get newest date first:
        setGigs(parsedGigs.reverse()); // Newest date first
      } else {
        setGigs([]);
      }
    } catch (e) {
      console.error('Failed to load gigs from AsyncStorage.', e);
      setGigs([]);
      Alert.alert("Loading Error", "Could not load gigs data. Please try restarting the app.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadGigs();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={gigs}
        renderItem={({ item }) => (
          <GigCard
            gig={item}
            onPress={() => navigation.navigate('AddEditGigScreen', { gig: item })}
          />
        )}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyListText}>No gigs scheduled yet.</Text>
                <Text style={styles.emptyListSubText}>Tap the '+' button to add your first gig!</Text>
            </View>
        }
        contentContainerStyle={gigs.length === 0 ? styles.emptyFlatListContainer : styles.listContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContentContainer: {
    paddingVertical: 8,
  },
  emptyFlatListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyContainer: {
    alignItems: 'center',
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: '#868e96',
    marginBottom: 8,
  },
  emptyListSubText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#adb5bd',
  }
});

export default GigsScreen;
