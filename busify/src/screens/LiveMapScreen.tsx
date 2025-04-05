import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { getDatabase, ref, onValue, query, orderByChild, equalTo, get } from 'firebase/database';
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
  });//
  const [buses, setBuses] = useState<{ latitude: number; longitude: number; busNumber: string }[]>([]);
  const [filteredBuses, setFilteredBuses] = useState<{ latitude: number; longitude: number; busNumber: string }[]>([]);
  const [selectedBus, setSelectedBus] = useState<{ latitude: number; longitude: number; busNumber: string } | null>(null);
  const [showDropdown, setShowDropdown] = useState(true); // Control visibility of the dropdown
//test git
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
        setFilteredBuses(formattedBuses);  // Show all buses initially
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
      const bus = Object.values(data)[0] as { latitude: number; longitude: number; busNumber: string };
      setSelectedBus(bus); // Set the selected bus to be shown on the map
      setRegion({
        latitude: bus.latitude,
        longitude: bus.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setShowDropdown(false); // Hide the dropdown after selecting a bus
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
    setShowDropdown(true); // Show dropdown when user starts typing
  };

  const handleBusSelect = (bus: any) => {
    setBusNumber(bus.busNumber); // Set selected bus number to the input
    setSelectedBus(bus); // Set the selected bus to be shown on the map
    setRegion({
      latitude: bus.latitude,
      longitude: bus.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    setShowDropdown(false); // Hide the dropdown after bus selection
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
      
      {/* Display filtered buses in a dropdown */}
      {showDropdown && busNumber && (
        <FlatList
          data={filteredBuses}
          keyExtractor={(item) => item.busNumber}
          style={styles.dropdown}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleBusSelect(item)}>
              <Text style={styles.dropdownItem}>
                {item.busNumber}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Map view displaying only selected bus */}
      <MapView style={styles.map} region={region}>
        {selectedBus && (
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
