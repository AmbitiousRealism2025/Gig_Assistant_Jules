import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import RehearsalCard from '../components/RehearsalCard'; // Adjust path if necessary
import { mockRehearsals } from '../data/mockData';     // Adjust path if necessary

const RehearsalScreen = () => {
  const renderItem = ({ item }) => (
    <RehearsalCard rehearsal={item} />
  );

  return (
    <View style={styles.container}>
      {mockRehearsals.length > 0 ? (
        <FlatList
          data={mockRehearsals}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No rehearsals scheduled yet.</Text>
          <Text style={styles.emptySubText}>Tap the '+' button to add a new rehearsal!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8', // A light background color for the screen
  },
  listContent: {
    paddingVertical: 8, // Add some padding to the top and bottom of the list itself
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  }
});

export default RehearsalScreen;
