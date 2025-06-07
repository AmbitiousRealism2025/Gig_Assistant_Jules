// GigAssistant/screens/AddEditRehearsalScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button as NativeButton, StyleSheet, Platform, FlatList, ScrollView, Alert } from 'react-native';
import TaskItem from '../components/TaskItem';
import CustomButton from '../components/CustomButton'; // Using CustomButton
import AsyncStorage from '@react-native-async-storage/async-storage';

const REHEARSALS_STORAGE_KEY = '@GigAssistant:rehearsals';

const AddEditRehearsalScreen = ({ navigation, route }) => {
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const existingRehearsal = route.params?.rehearsal;

  useEffect(() => {
    if (existingRehearsal) {
      setEventName(existingRehearsal.eventName || '');
      setDate(existingRehearsal.date || '');
      setLocation(existingRehearsal.location || '');
      setTasks(existingRehearsal.tasks || []);
      navigation.setOptions({ title: 'Edit Rehearsal' });
    } else {
      navigation.setOptions({ title: 'Add New Rehearsal' });
    }
  }, [existingRehearsal, navigation]);

  const handleAddTask = () => {
    if (newTaskTitle.trim() === '') {
      Alert.alert("Empty Task", "Task title cannot be empty.");
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      note: '',
      status: 'open',
      order: tasks.length,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    setNewTaskTitle('');
  };

  const handleToggleTaskStatus = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, status: task.status === 'open' ? 'closed' : 'open' }
          : task
      )
    );
  };

  const handleSave = async () => {
    if (eventName.trim() === '') {
        Alert.alert("Missing Name", "Event name is required.");
        return;
    }
    const rehearsalData = {
      id: existingRehearsal?.id || Date.now().toString(),
      eventName,
      date,
      location,
      tasks,
    };

    try {
      const storedRehearsals = await AsyncStorage.getItem(REHEARSALS_STORAGE_KEY);
      let rehearsalsArray = storedRehearsals ? JSON.parse(storedRehearsals) : [];

      if (existingRehearsal) {
        const index = rehearsalsArray.findIndex(r => r.id === existingRehearsal.id);
        if (index > -1) {
          rehearsalsArray[index] = rehearsalData;
        } else {
          // This case (editing an item not found in storage) is unlikely if data flow is correct
          // but as a fallback, add it. Or Alert an error.
          Alert.alert("Error", "Could not find the rehearsal to update. Saving as new.");
          rehearsalsArray.push(rehearsalData);
        }
      } else {
        rehearsalsArray.push(rehearsalData);
      }
      await AsyncStorage.setItem(REHEARSALS_STORAGE_KEY, JSON.stringify(rehearsalsArray));
      console.log('Rehearsal saved successfully to AsyncStorage');
      navigation.goBack();
    } catch (e) {
      console.error('Failed to save rehearsal to AsyncStorage.', e);
      Alert.alert("Save Error", "Could not save rehearsal data. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!existingRehearsal) return;

    Alert.alert(
      "Delete Rehearsal",
      "Are you sure you want to delete this rehearsal? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const storedRehearsals = await AsyncStorage.getItem(REHEARSALS_STORAGE_KEY);
              let rehearsalsArray = storedRehearsals ? JSON.parse(storedRehearsals) : [];
              rehearsalsArray = rehearsalsArray.filter(r => r.id !== existingRehearsal.id);
              await AsyncStorage.setItem(REHEARSALS_STORAGE_KEY, JSON.stringify(rehearsalsArray));
              console.log('Rehearsal deleted successfully from AsyncStorage');
              navigation.goBack();
            } catch (e) {
              console.error('Failed to delete rehearsal from AsyncStorage.', e);
              Alert.alert("Delete Error", "Could not delete rehearsal data. Please try again.");
            }
          },
        },
      ]
    );
  };


  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.label}>Event Name:</Text>
        <TextInput
          style={styles.input}
          value={eventName}
          onChangeText={setEventName}
          placeholder="e.g., Band Practice"
        />

        <Text style={styles.label}>Date (YYYY-MM-DD):</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="2024-12-31"
          keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'default'}
        />
        {/* CalendarPicker integration will replace this TextInput later */}

        <Text style={styles.label}>Location:</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="e.g., Studio A"
        />

        <View style={styles.taskSection}>
          <Text style={styles.label}>Tasks:</Text>
          <View style={styles.addTaskContainer}>
            <TextInput
              style={styles.taskInput}
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
              placeholder="Enter new task title"
            />
            {/* Using NativeButton here as CustomButton might have default margins not ideal for inline use */}
            <NativeButton title="Add Task" onPress={handleAddTask} color="#007bff" />
          </View>
          <FlatList
            data={tasks}
            renderItem={({ item }) => (
              <TaskItem task={item} onToggleStatus={handleToggleTaskStatus} />
            )}
            keyExtractor={item => item.id}
            ListEmptyComponent={<Text style={styles.emptyTasksText}>No tasks added yet.</Text>}
          />
        </View>

        <CustomButton
          title={existingRehearsal ? "Update Rehearsal" : "Save Rehearsal"}
          onPress={handleSave}
        />
        {existingRehearsal && (
          <CustomButton
            title="Delete Rehearsal"
            onPress={handleDelete}
            style={{ backgroundColor: 'red', marginTop: 10 }}
            textStyle={{ color: 'white'}}
          />
        )}
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
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
  },
  taskSection: {
    marginTop: 10,
    marginBottom: 20,
    paddingBottom: 10, // Add padding to avoid save button collision
    borderTopWidth: 1, // Visual separation for task section
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  addTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: Platform.OS === 'ios' ? 10 : 8,
    marginRight: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  emptyTasksText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 10,
    fontStyle: 'italic',
  }
});

export default AddEditRehearsalScreen;
