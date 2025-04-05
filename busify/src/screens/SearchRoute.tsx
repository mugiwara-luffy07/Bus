import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { database } from '../firebase/config';
import { ref, onValue } from 'firebase/database';

const SearchRoute: React.FC = () => {
  const [buses, setBuses] = useState<any[]>([]);
  const [selectedStop, setSelectedStop] = useState('');
  const [matchingBuses, setMatchingBuses] = useState<any[]>([]);

  useEffect(() => {
    const busesRef = ref(database, 'buses');
    const unsubscribe = onValue(busesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const busList = Object.values(data);
        setBuses(busList);
      }
    });

    return () => unsubscribe();
  }, []);

  const getAllStops = (): string[] => {
    const stopSet = new Set<string>();

    buses.forEach((bus: any) => {
      bus.route?.morning?.forEach((stop: any) => stopSet.add(stop.stop));
      bus.route?.evening?.forEach((stop: any) => stopSet.add(stop.stop));
    });

    return Array.from(stopSet);
  };

  const searchBuses = () => {
    const matches = buses.filter((bus: any) => {
      const morningStops = bus.route?.morning?.map((r: any) => r.stop) || [];
      const eveningStops = bus.route?.evening?.map((r: any) => r.stop) || [];
      return morningStops.includes(selectedStop) || eveningStops.includes(selectedStop);
    });
    setMatchingBuses(matches);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Search Buses by Stop</Text>

      <Picker
        selectedValue={selectedStop}
        onValueChange={(itemValue) => setSelectedStop(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select a Stop" value="" />
        {getAllStops().map((stop, index) => (
          <Picker.Item key={index} label={stop} value={stop} />
        ))}
      </Picker>

      <Button title="Search" onPress={searchBuses} disabled={!selectedStop} />

      {matchingBuses.length > 0 && (
        <View style={styles.results}>
          <Text style={styles.subtitle}>Matching Buses:</Text>
          {matchingBuses.map((bus: any, index: number) => (
            <View key={index} style={styles.busBox}>
              <Text style={styles.busText}>{bus.busNumber}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default SearchRoute;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  picker: {
    marginVertical: 16,
    backgroundColor: '#f0f0f0',
  },
  results: {
    marginTop: 24,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  busBox: {
    backgroundColor: '#d9f2ff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
  },
  busText: {
    fontSize: 16,
  },
});
