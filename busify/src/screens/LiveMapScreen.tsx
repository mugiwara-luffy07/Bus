import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import {
  getDatabase,
  ref,
  onValue,
  query,
  orderByChild,
  equalTo,
  get,
} from 'firebase/database';
import { database } from '../firebase/config'; // Adjust path as needed

const screenWidth = Dimensions.get('window').width;

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
  const [filteredBuses, setFilteredBuses] = useState<
    { latitude: number; longitude: number; busNumber: string }[]
  >([]);
  const [selectedBus, setSelectedBus] = useState<{
    latitude: number;
    longitude: number;
    busNumber: string;
  } | null>(null);
  const [showDropdown, setShowDropdown] = useState(true);

  useEffect(() => {
    const busesRef = ref(database, 'buses');
    const unsubscribe = onValue(busesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedBuses = Object.values(data).map((bus: any) => ({
          latitude: Number(bus.latitude),
          longitude: Number(bus.longitude),
          busNumber: bus.busNumber,
        }));
        setBuses(formattedBuses);
        setFilteredBuses(formattedBuses);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = async () => {
    if (!busNumber) return;

    const busRef = query(
      ref(database, 'buses'),
      orderByChild('busNumber'),
      equalTo(busNumber)
    );
    const snapshot = await get(busRef);
    const data = snapshot.val();

    if (data) {
      const bus = Object.values(data)[0] as {
        latitude: number;
        longitude: number;
        busNumber: string;
      };

      const latitude = Number(bus.latitude);
      const longitude = Number(bus.longitude);

      if (!isNaN(latitude) && !isNaN(longitude)) {
        setSelectedBus({ ...bus, latitude, longitude });
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setShowDropdown(false);
      } else {
        alert('Invalid bus coordinates!');
      }
    } else {
      alert('Bus not found!');
    }
  };

  const handleInputChange = (text: string) => {
    setBusNumber(text);

    const filtered = buses.filter((bus) =>
      bus.busNumber.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredBuses(filtered);
    setShowDropdown(true);
  };

  const handleBusSelect = (bus: {
    latitude: number;
    longitude: number;
    busNumber: string;
  }) => {
    const latitude = Number(bus.latitude);
    const longitude = Number(bus.longitude);

    if (!isNaN(latitude) && !isNaN(longitude)) {
      setBusNumber(bus.busNumber);
      setSelectedBus({ ...bus, latitude, longitude });
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setShowDropdown(false);
    } else {
      alert('Invalid coordinates!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Bus Tracker</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Bus Number"
        value={busNumber}
        onChangeText={handleInputChange}
      />

      <Button title="Search" onPress={handleSearch} />

      {showDropdown && busNumber && (
        <FlatList
          data={filteredBuses}
          keyExtractor={(item) => item.busNumber}
          style={styles.dropdown}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleBusSelect(item)}>
              <Text style={styles.dropdownItem}>{item.busNumber}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <MapView style={styles.map} region={region}>
        {selectedBus &&
          typeof selectedBus.latitude === 'number' &&
          typeof selectedBus.longitude === 'number' &&
          !isNaN(selectedBus.latitude) &&
          !isNaN(selectedBus.longitude) && (
            <Marker
              coordinate={{
                latitude: selectedBus.latitude,
                longitude: selectedBus.longitude,
              }}
              title={`Bus ${selectedBus.busNumber}`}
            />
          )}
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
  dropdown: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    maxHeight: 200,
    zIndex: 100,
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    padding: 5,
  },
  dropdownItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 5,
    borderRadius: 5,
    fontSize: 16,
  },
});
