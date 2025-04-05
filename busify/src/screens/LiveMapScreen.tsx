import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { ref, get, query, orderByChild, equalTo, onValue } from 'firebase/database';
import { database } from '../firebase/config'; // Adjust the import path as needed

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const LiveMapScreen = () => {
  const [busNumber, setBusNumber] = useState('');
  const [region, setRegion] = useState<Region>({
    latitude: 13.0827,
    longitude: 80.2707,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [buses, setBuses] = useState<
    { latitude: number; longitude: number; busNumber: string }[]
  >([]);

  useEffect(() => {
    const busesRef = ref(database, 'buses');
    const unsubscribe = onValue(busesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedBuses = Object.values(data).map((bus: any) => ({
          latitude: bus.latitude,
          longitude: bus.longitude,
          busNumber: bus.busNumber,
        }));
        setBuses(formattedBuses);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = async () => {
    if (!busNumber) return;

    const busRef = query(ref(database, 'buses'), orderByChild('busNumber'), equalTo(busNumber));
    const snapshot = await get(busRef);
    const data = snapshot.val();

    if (data) {
      const bus = Object.values(data)[0] as {
        latitude: number;
        longitude: number;
        busNumber: string;
      };

      setRegion({
        latitude: bus.latitude,
        longitude: bus.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } else {
      alert('Bus not found!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Bus Tracker</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Bus Number"
        value={busNumber}
        onChangeText={setBusNumber}
      />
      <Button title="Search" onPress={handleSearch} />
      <MapView style={styles.map} region={region}>
        {buses.map((bus, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: bus.latitude, longitude: bus.longitude }}
            title={`Bus ${bus.busNumber}`}
          />
        ))}
      </MapView>
    </View>
  );
};

export default LiveMapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#666',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  map: {
    flex: 1,
    width: screenWidth - 20,
    marginTop: 10,
  },
});
