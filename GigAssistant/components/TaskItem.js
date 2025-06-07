// GigAssistant/components/TaskItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';

const TaskItem = ({ task, onToggleStatus }) => {
  if (!task) {
    return null; // Or some placeholder if a task object isn't provided
  }

  const isCompleted = task.status === 'closed';

  return (
    <TouchableOpacity onPress={() => onToggleStatus(task.id)} style={styles.taskItemContainer}>
      <Checkbox
        value={isCompleted}
        onValueChange={() => onToggleStatus(task.id)}
        style={styles.checkbox}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.title, isCompleted && styles.completedTitle]}>
          {task.title}
        </Text>
        {task.note ? <Text style={styles.note}>{task.note}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  checkbox: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  note: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default TaskItem;
