import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SearchRoute = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🔍 Search Route Screen</Text>
    </View>
  );
};

export default SearchRoute;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: '600' },
});
