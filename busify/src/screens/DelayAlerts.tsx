import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DelayAlerts = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🔔 Delay Alerts Screen</Text>
    </View>
  );
};

export default DelayAlerts;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: '600' },
});
