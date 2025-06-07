// GigAssistant/components/CalendarPicker.js
import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Dependency installation failed, but code includes it as per spec

const CalendarPicker = ({ onDateChange, initialDate, buttonStyle, buttonTextStyle, displayValue }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    hideDatePicker();
    if (selectedDate) { // Ensure a date was actually selected
        onDateChange(selectedDate);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={showDatePicker}
      >
        <Text style={[styles.buttonText, buttonTextStyle]}>{displayValue || "Select Date"}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={initialDate || new Date()} // Use initialDate or default to now
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        // minimumDate={new Date()} // Optional: prevent past dates
        // display={Platform.OS === 'ios' ? 'inline' : 'default'} // 'spinner' on Android older versions
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: '#ddd', // Style to look like an input field
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    minHeight: 40, // Ensure consistent height
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#333', // Default text color, can be overridden
  },
});

export default CalendarPicker;
