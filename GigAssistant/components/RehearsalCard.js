import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RehearsalCard = ({ rehearsal }) => {
  if (!rehearsal) {
    return null; // Or some placeholder if a rehearsal object isn't provided
  }

  // Basic date formatting (can be improved with a library like date-fns or moment.js later)
  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Invalid Date";
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.eventName}>{rehearsal.eventName || 'Unnamed Rehearsal'}</Text>
      <Text style={styles.date}>{formatDate(rehearsal.date)}</Text>
      <Text style={styles.location}>{rehearsal.location || 'No location specified'}</Text>
      {/* We can add a preview of tasks later if needed */}
      {/*
      {rehearsal.tasks && rehearsal.tasks.length > 0 && (
        <View style={styles.tasksPreview}>
          <Text style={styles.tasksTitle}>Tasks:</Text>
          {rehearsal.tasks.slice(0, 2).map(task => ( // Show first 2 tasks as preview
            <Text key={task.id} style={styles.taskItem}>- {task.title}</Text>
          ))}
          {rehearsal.tasks.length > 2 && <Text style={styles.taskItem}>...</Text>}
        </View>
      )}
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // for Android
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  location: {
    fontSize: 14,
    color: '#555',
  },
  // Styles for optional task preview (can be uncommented and refined later)
  /*
  tasksPreview: {
    marginTop: 10,
    borderTopColor: '#eee',
    borderTopWidth: 1,
    paddingTop: 10,
  },
  tasksTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  taskItem: {
    fontSize: 12,
    color: '#333',
  }
  */
});

export default RehearsalCard;
