import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

const OnboardingScreen = ({ onComplete }) => { // Assume onComplete prop will be passed to handle navigation
  return (
    <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
      <View style={styles.slide}>
        <Text style={styles.title}>Welcome to Gig Assistant!</Text>
        <Text style={styles.text}>Your personal manager for rehearsals and gigs.</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.title}>Rehearsals Tab</Text>
        <Text style={styles.text}>Plan your practice sessions, manage tasks, and keep track of what to work on.</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.title}>Gigs Tab</Text>
        <Text style={styles.text}>All your gig details in one place - venue, call times, pay, and notes.</Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.title}>The '+' Button</Text>
        <Text style={styles.text}>Quickly add new rehearsals or gigs anytime.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log('Onboarding complete! Implement navigation to main app.');
            if (onComplete) onComplete();
          }}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
