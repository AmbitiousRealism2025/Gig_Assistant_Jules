// GigAssistant/components/GigCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GigCard = ({ gig, onPress }) => {
  if (!gig) {
    return <View style={styles.card}><Text>No gig data.</Text></View>;
  }

  const formatDate = (dateString, includeTime = false) => {
    if (!dateString) return 'N/A';
    try {
      let dateToParse = dateString;
      // Heuristic for callTime: if it doesn't look like a date and gig.date exists, combine them.
      if (includeTime && typeof dateString === 'string' && !dateString.includes('-') && !dateString.includes('/') && gig.date) {
        // Check if gig.date is a valid date string
        const gigDateObj = new Date(gig.date);
        if (!isNaN(gigDateObj.getTime())) {
            // Use ISO date part from gig.date and append time string
            const isoDatePart = gig.date.split('T')[0];
            dateToParse = `${isoDatePart}T${dateString}`;
        }
      }

      const date = new Date(dateToParse);
      if (isNaN(date.getTime())) {
        // If parsing failed, and it was just a time string, maybe show it directly if that's desired
        if (includeTime && typeof dateString === 'string' && dateString.match(/^\d{2}:\d{2}$/)) {
            return dateString; // e.g. "19:30" if it couldn't be combined with a date
        }
        return 'Invalid Date';
      }

      if (includeTime) {
        return date.toLocaleString(undefined, {
          year: 'numeric', month: 'short', day: 'numeric',
          hour: '2-digit', minute: '2-digit', hour12: true
        });
      }
      // For date only, ensure it's displayed in local time zone correctly, not UTC.
      // new Date() for YYYY-MM-DD strings creates date in UTC. Adjust if necessary.
      if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const parts = dateString.split('-');
        const localDate = new Date(parts[0], parts[1] - 1, parts[2]);
         return localDate.toLocaleDateString(undefined, {
            year: 'numeric', month: 'long', day: 'numeric'
        });
      }
      return date.toLocaleDateString(undefined, {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return 'Error formatting date';
    }
  };

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined || isNaN(Number(amount))) {
        return 'N/A';
    }
    return `$${Number(amount).toFixed(2)}`;
  };

  // Prioritize compensationAmount if it exists (from new save structure)
  const compensationDisplayValue = gig.compensationAmount !== undefined ? gig.compensationAmount : gig.compensation;


  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={styles.venueName}>{gig.venue?.name || 'Unknown Venue'}</Text>
      <Text style={styles.detailText}>Date: {formatDate(gig.date)}</Text>
      <Text style={styles.detailText}>Call Time: {formatDate(gig.callTime, true)}</Text>
      <Text style={styles.detailText}>Compensation: {formatCurrency(compensationDisplayValue)}</Text>
      {gig.venue?.address && <Text style={styles.detailText}>Address: {gig.venue.address}</Text>}
      {gig.notes && gig.notes.trim() !== '' && (
        <View style={styles.notesContainer}>
          <Text style={styles.notesTitle}>Notes:</Text>
          <Text style={styles.notesText} numberOfLines={3} ellipsizeMode="tail">{gig.notes}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  venueName: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#2c3e50',
  },
  detailText: {
    fontSize: 15,
    color: '#34495e',
    marginBottom: 5,
  },
  notesContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  notesTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#7f8c8d',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#95a5a6',
    lineHeight: 20,
  },
});

export default GigCard;
