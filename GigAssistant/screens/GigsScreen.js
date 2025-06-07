import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import GigCard from '../../components/GigCard'; // Assuming this path is correct
import { gigs } from '../../data/mockData'; // Assuming this path is correct

const GigsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={gigs}
        renderItem={({ item }) => <GigCard gig={item} />}
        keyExtractor={item => item.id.toString()} // Ensure id is a string
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});

export default GigsScreen;
