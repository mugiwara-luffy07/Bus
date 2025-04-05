import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BusRoutes = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📅 Bus Route Info Screen</Text>
    </View>
  );
};

export default BusRoutes;

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  text: {
    fontSize: 20, fontWeight: '600',
  },
});
