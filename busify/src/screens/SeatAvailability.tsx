// src/screens/SeatAvailability.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { database } from '../firebase/config'; // Correct import for database
import { ref, get } from 'firebase/database';

const SeatAvailability = ({ busId }: { busId: string }) => {
  const [seats, setSeats] = useState<any>(null);

  useEffect(() => {
    const fetchSeatAvailability = async () => {
      const seatRef = ref(database, `buses/${busId}/seats`);
      const snapshot = await get(seatRef);
      if (snapshot.exists()) {
        setSeats(snapshot.val());
      } else {
        console.log('No seat data available');
      }
    };

    fetchSeatAvailability();
  }, [busId]);

  return (
    <View>
      {seats ? (
        <>
          <Text>Seat Availability for Bus {busId}</Text>
          <Text>Available Seats: {seats.available}</Text>
        </>
      ) : (
        <Text>Loading seat availability...</Text>
      )}
    </View>
  );
};

export default SeatAvailability;
