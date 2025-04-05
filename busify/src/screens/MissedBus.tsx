import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MissedBus = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>❌ Missed Bus Alternatives</Text>
    </View>
  );
};

export default MissedBus;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: '600' },
});
