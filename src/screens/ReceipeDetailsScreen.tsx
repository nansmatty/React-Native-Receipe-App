import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ReceipeDetailsScreen: React.FC = () => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Receipe Details</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ReceipeDetailsScreen;
