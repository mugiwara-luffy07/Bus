import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ref, get } from 'firebase/database';
import { database } from '../firebase/config';  // Correct import

const BusRoutes = () => {
  const [buses, setBuses] = useState<any[]>([]);

  // Fetch bus data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      const busesRef = ref(database, 'buses'); // Reference to the 'buses' node
      const snapshot = await get(busesRef);  // Fetch data
      const data = snapshot.val();

      if (data) {
        const busList: any[] = Object.values(data).map((bus: any) => ({
          busNumber: bus.busNumber,
          morningRoute: bus.route.morning,
          eveningRoute: bus.route.evening,
        }));
        setBuses(busList);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🚌 Bus Routes</Text>
      <FlatList
        data={buses}
        keyExtractor={(item) => item.busNumber}
        renderItem={({ item }) => (
          <View style={styles.busItem}>
            <Text style={styles.busNumber}>{item.busNumber}</Text>
            <Text style={styles.routeTitle}>Morning Route:</Text>
            {item.morningRoute.map((stop: any, index: number) => (
              <Text key={index} style={styles.routeInfo}>
                {stop.stop} - {stop.time}
              </Text>
            ))}
            <Text style={styles.routeTitle}>Evening Route:</Text>
            {item.eveningRoute.map((stop: any, index: number) => (
              <Text key={index} style={styles.routeInfo}>
                {stop.stop} - {stop.time}
              </Text>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  busItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
  },
  busNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  routeTitle: {
    marginTop: 5,
    fontWeight: '600',
  },
  routeInfo: {
    fontSize: 14,
    color: '#555',
  },
});

export default BusRoutes;
