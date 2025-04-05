import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { ref, get } from 'firebase/database';
import { database } from '../firebase/config'; // Adjust this import
import { Picker } from '@react-native-picker/picker'; // Import from the new package

const SeatAvailabilityScreen = () => {
  const [busNumber, setBusNumber] = useState<string>('');
  const [seatsData, setSeatsData] = useState<any>(null); // Store the seat data here

  // Function to fetch seat data from Firebase based on bus number
  const fetchSeatData = async (busNumber: string) => {
    const busRef = ref(database, `buses/${busNumber}`);
    const snapshot = await get(busRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      setSeatsData(data.seats); // Set the seat data in state
    } else {
      alert('Bus not found!');
    }
  };

  useEffect(() => {
    if (busNumber) {
      fetchSeatData(busNumber); // Fetch data when bus number is selected
    }
  }, [busNumber]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seat Availability</Text>

      {/* Dropdown for selecting bus */}
      <Picker
        selectedValue={busNumber}
        onValueChange={setBusNumber}
        style={styles.picker}
      >
        <Picker.Item label="Select Bus" value="" />
        <Picker.Item label="Bus 101" value="bus1" />
        <Picker.Item label="Bus 102" value="bus2" />
        <Picker.Item label="Bus 103" value="bus3" />
        <Picker.Item label="Bus 104" value="bus4" />
        <Picker.Item label="Bus 105" value="bus5" />
        <Picker.Item label="Bus 106" value="bus6" />
        <Picker.Item label="Bus 107" value="bus7" />
        <Picker.Item label="Bus 108" value="bus8" />
        <Picker.Item label="Bus 109" value="bus9" />
        <Picker.Item label="Bus 110" value="bus10" />
      </Picker>

      {/* Display seat availability */}
      {seatsData ? (
        <View style={styles.seatContainer}>
          <Text>Total Seats: {seatsData.totalSeats}</Text>
          <Text>Available Seats: {seatsData.availableSeats}</Text>
          <ScrollView contentContainerStyle={styles.seatStatusContainer}>
            {seatsData.seatStatus.map((status: boolean, index: number) => (
              <View
                key={index}
                style={[
                  styles.seat,
                  { backgroundColor: status ? 'green' : 'red' },
                ]}
              />
            ))}
          </ScrollView>
        </View>
      ) : (
        <Text style={styles.noBusText}>Select a bus to view seat availability</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  seatContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  seatStatusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  seat: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 5,
  },
  noBusText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 20,
  },
});

export default SeatAvailabilityScreen;
//