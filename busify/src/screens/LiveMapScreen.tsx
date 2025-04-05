// src/screens/LiveMapScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getDatabase, ref, child, get } from 'firebase/database';
import { database } from '../firebase/config'; // Import database from config

const LiveMapScreen = () => {
  const [busNumber, setBusNumber] = useState('');
  const [busData, setBusData] = useState<any>(null); // This will hold bus location data from Firebase

  const fetchBusLocation = async (busNumber: string) => {
    try {
      const dbRef = ref(database, 'buses/' + busNumber);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        setBusData(snapshot.val());
      } else {
        console.log('No data available');
      }
    } catch (error) {
      console.error('Error fetching bus location:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter Bus Number"
        value={busNumber}
        onChangeText={setBusNumber}
      />
      <Button title="Search" onPress={() => fetchBusLocation(busNumber)} />

      {busData && (
        <MapView
          style={{ height: 400, width: '100%' }}
          initialRegion={{
            latitude: busData.latitude,
            longitude: busData.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={{ latitude: busData.latitude, longitude: busData.longitude }} />
        </MapView>
      )}
    </View>
  );
};

export default LiveMapScreen;
