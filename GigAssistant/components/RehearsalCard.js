// GigAssistant/components/RehearsalCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; // Added TouchableOpacity

// Added onPress to props
const RehearsalCard = ({ rehearsal, onPress }) => {
  if (!rehearsal) {
    return <View style={styles.card}><Text>No rehearsal data.</Text></View>;
  }

  // Basic date formatting (can be improved with a library like date-fns later)
  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    // Attempt to create a date object. If dateString is already a Date object, this is fine.
    // If it's a string, it tries to parse it.
    try {
      const date = new Date(dateString);
      // Check if the date is valid. getTime() on an invalid date returns NaN.
      if (isNaN(date.getTime())) {
          // Further attempt to parse if it's a simple YYYY-MM-DD string that might be treated as UTC
          if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
              const parts = dateString.split('-');
              const utcDate = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
              if (!isNaN(utcDate.getTime())) {
                return utcDate.toLocaleDateString(undefined, {
                    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
                });
              }
          }
          return 'Invalid date';
      }
      return date.toLocaleDateString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return 'Invalid date format';
    }
  };

  return (
    // Added TouchableOpacity wrapper
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.eventName}>{rehearsal.eventName || 'Unnamed Rehearsal'}</Text>
      <Text style={styles.detailText}>Date: {formatDate(rehearsal.date)}</Text>
      <Text style={styles.detailText}>Location: {rehearsal.location || 'No location'}</Text>
      {rehearsal.tasks && rehearsal.tasks.length > 0 && (
        <View style={styles.tasksPreviewContainer}>
          <Text style={styles.tasksPreviewTitle}>Tasks ({rehearsal.tasks.filter(t => t.status === 'closed').length}/{rehearsal.tasks.length} done):</Text>
          {rehearsal.tasks.slice(0, 2).map(task => ( // Show first 2 tasks as preview
            <Text key={task.id} style={[styles.taskPreviewText, task.status === 'closed' && styles.taskPreviewTextDone]}>
              - {task.title}
            </Text>
          ))}
          {rehearsal.tasks.length > 2 && <Text style={styles.taskPreviewText}>...</Text>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#222', // Darker event name
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
  tasksPreviewContainer: {
    marginTop: 10, // Increased spacing
    paddingTop: 8,  // Increased spacing
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tasksPreviewTitle: {
    fontSize: 14,
    fontWeight: '600', // Semi-bold
    color: '#444', // Slightly darker
    marginBottom: 4, // Increased spacing
  },
  taskPreviewText: {
    fontSize: 13, // Slightly larger task text
    color: '#666',
    marginLeft: 5,
    fontStyle: 'italic', // Italicize task titles
  },
  taskPreviewTextDone: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  }
});

export default RehearsalCard;
