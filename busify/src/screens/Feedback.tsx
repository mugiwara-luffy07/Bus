import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Feedback = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>💬 Feedback Screen</Text>
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: '600' },
});
