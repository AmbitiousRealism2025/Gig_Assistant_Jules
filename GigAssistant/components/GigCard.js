import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GigCard = ({ gig }) => {
  if (!gig) {
    return null; // Or some placeholder if a gig object isn't provided
  }

  const formatDate = (dateString, includeTime = true) => {
    if (!dateString) return 'No date';
    try {
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      };
      if (includeTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
        options.hour12 = true; // Use AM/PM
      }
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Invalid Date";
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.venueName}>{gig.venue?.name || 'Unnamed Venue'}</Text>
      <Text style={styles.dateTime}>Date: {formatDate(gig.date, true)}</Text>
      {gig.callTime && <Text style={styles.dateTime}>Call Time: {formatDate(gig.callTime, true)}</Text>}

      {gig.compensation !== undefined && gig.compensation !== null && (
        <Text style={styles.compensation}>
          Pay: ${typeof gig.compensation === 'number' ? gig.compensation.toFixed(2) : gig.compensation}
        </Text>
      )}

      {gig.venue?.address && <Text style={styles.detailText}>Address: {gig.venue.address}</Text>}
      {/* We can add more details like notes or contact later if needed */}
      {/*
      {gig.notes && <Text style={styles.notes}>Notes: {gig.notes}</Text>}
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
  venueName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateTime: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  compensation: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 3,
  },
  detailText: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  // Style for optional notes (can be uncommented and refined later)
  /*
  notes: {
    fontSize: 13,
    color: '#444',
    marginTop: 8,
    fontStyle: 'italic',
    borderTopColor: '#eee',
    borderTopWidth: 1,
    paddingTop: 8,
  }
  */
});

export default GigCard;
