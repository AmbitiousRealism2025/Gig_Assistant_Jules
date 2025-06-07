import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GigsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Gigs Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GigsScreen;
