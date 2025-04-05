import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

// Type definition for Bus
type BusType = {
  busNumber: string;
  route: {
    morning: { stop: string; time: string }[];
    evening: { stop: string; time: string }[];
  };
};

const BusRoutes = () => {
  const [selectedBus, setSelectedBus] = useState<string | null>(null);
  const [filteredBus, setFilteredBus] = useState<BusType | null>(null);

  const buses = [
    // Your bus data here (simplified example)
    {
      busNumber: "Bus 101",
      route: {
        morning: [
          { stop: "Stop 1", time: "8:00 AM" },
          { stop: "Stop 2", time: "8:30 AM" },
          { stop: "Stop 3", time: "9:00 AM" },
        ],
        evening: [
          { stop: "Stop 1", time: "6:00 PM" },
          { stop: "Stop 2", time: "6:30 PM" },
          { stop: "Stop 3", time: "7:00 PM" },
        ],
      },
    },
    // Add other buses here in the same format
  ];

  const handleSearch = () => {
    const bus = buses.find((bus) => bus.busNumber === selectedBus);
    if (bus) {
      setFilteredBus(bus);
    } else {
      setFilteredBus(null); // Clear if no bus found
    }
  };

  const renderRoute = (route: { stop: string; time: string }[]) => {
    return (
      <FlatList
        data={route}
        renderItem={({ item }) => (
          <Text style={styles.routeText}>
            {item.stop} - {item.time}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  // Preparing bus numbers for the picker
  const busNumbers = buses.map(bus => ({
    label: bus.busNumber,
    value: bus.busNumber,
  }));

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => setSelectedBus(value)}
        items={busNumbers}
        placeholder={{ label: "Select Bus Number", value: null }}
      />
      <Button title="Search" onPress={handleSearch} />
      
      {filteredBus ? (
        <View style={styles.busContainer}>
          <Text style={styles.busNumber}>Bus: {filteredBus.busNumber}</Text>

          <Text style={styles.routeHeader}>Morning Route:</Text>
          {renderRoute(filteredBus.route.morning)}

          <Text style={styles.routeHeader}>Evening Route:</Text>
          {renderRoute(filteredBus.route.evening)}
        </View>
      ) : (
        selectedBus && <Text style={styles.notFoundText}>Bus not found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  busContainer: {
    marginTop: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  busNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  routeHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
  },
  routeText: {
    fontSize: 14,
    color: '#555',
  },
  notFoundText: {
    marginTop: 20,
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default BusRoutes;
