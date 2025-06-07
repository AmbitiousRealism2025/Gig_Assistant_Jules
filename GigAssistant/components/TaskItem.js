import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TaskItem = () => {
  return (
    <View style={styles.container}>
      <Text>Task Item Component</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Basic styling for a list item, adjust as needed
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default TaskItem;
