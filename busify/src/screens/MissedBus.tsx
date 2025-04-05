// src/screens/MissedBuses.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { database } from '../firebase/config';  // Firebase config file
import { ref, get } from 'firebase/database';

interface Bus {
  busNumber: string;
  alerts: { message: string; time: string }[];
  route: {
    morning: { stop: string; time: string }[];
    evening: { stop: string; time: string }[];
  };
}

const MissedBuses = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredBuses, setFilteredBuses] = useState<Bus[]>([]);

  useEffect(() => {
    // Fetch buses data from Firebase
    const busesRef = ref(database, 'buses');
    get(busesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const busesData = snapshot.val();
          setBuses(Object.values(busesData));
        }
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    // Filter buses based on search term
    if (searchTerm) {
      setFilteredBuses(
        buses.filter((bus) =>
          bus.busNumber.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredBuses(buses);
    }
  }, [searchTerm, buses]);

  const handleBusSelect = (bus: Bus) => {
    setSelectedBus(bus);
  };

  // Function to find alternative buses based on the selected bus route
  const findAlternativeBuses = (selectedBus: Bus) => {
    const alternativeBuses = buses.filter((bus) => {
      // Find buses that have similar routes (morning or evening)
      return bus.busNumber !== selectedBus.busNumber && (
        bus.route.morning.some((stop) => selectedBus.route.morning.some((selectedStop) => selectedStop.stop === stop.stop)) ||
        bus.route.evening.some((stop) => selectedBus.route.evening.some((selectedStop) => selectedStop.stop === stop.stop))
      );
    });
    return alternativeBuses;
  };

  const handleSearchClick = () => {
    // When the search button is clicked, filter buses based on the search term
    setFilteredBuses(
      buses.filter((bus) =>
        bus.busNumber.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Missed Buses</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search for a bus number"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <TouchableOpacity
        style={styles.searchButton}
        onPress={handleSearchClick}
      >
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredBuses}
        keyExtractor={(item) => item.busNumber}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.busItem}
            onPress={() => handleBusSelect(item)}
          >
            <Text style={styles.busNumber}>{item.busNumber}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No buses found</Text>}
      />

      {selectedBus && (
        <View style={styles.detailsContainer}>
          <Text style={styles.selectedBusTitle}>Selected Bus: {selectedBus.busNumber}</Text>
          <Text style={styles.alertsTitle}>Alternatives</Text>
          
          <FlatList
            data={findAlternativeBuses(selectedBus)}
            keyExtractor={(item) => item.busNumber}
            renderItem={({ item }) => (
              <View style={styles.alertItem}>
                <Text style={styles.alertMessage}>{item.busNumber}</Text>
                <Text style={styles.alertTime}>
                  Morning Route: {item.route.morning.map((stop) => stop.stop).join(' -> ')}
                </Text>
                <Text style={styles.alertTime}>
                  Evening Route: {item.route.evening.map((stop) => stop.stop).join(' -> ')}
                </Text>
              </View>
            )}
            ListEmptyComponent={<Text>No alternative buses available</Text>}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 16,
  },
  searchButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  busItem: {
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  busNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  selectedBusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  alertsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  alertItem: {
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  alertTime: {
    fontSize: 14,
    color: '#888',
  },
});

export default MissedBuses;
