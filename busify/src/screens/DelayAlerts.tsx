import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { database } from '../firebase/config';  // Adjust the import path as needed

interface Alert {
  message: string;
  time: string;
}

const DelayAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Listen for changes in the alerts data in Firebase
    const alertsRef = ref(database, 'buses');
    onValue(alertsRef, (snapshot) => {
      const data = snapshot.val();
      const allAlerts: Alert[] = [];

      // Loop through the buses and get their alerts
      for (let bus in data) {
        if (data[bus]?.alerts) {
          allAlerts.push(...data[bus].alerts);
        }
      }

      setAlerts(allAlerts);
    });

    return () => {
      // Cleanup listener when component unmounts
      setAlerts([]);
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bus Delay Alerts</Text>
      {alerts.length > 0 ? (
        alerts.map((alert, index) => (
          <View key={index} style={styles.alertBox}>
            <Text style={styles.alertMessage}>{alert.message}</Text>
            <Text style={styles.alertTime}>Time: {alert.time}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noAlerts}>No delay alerts at the moment.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  alertBox: {
    backgroundColor: '#ffcc00',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  alertMessage: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  alertTime: {
    fontSize: 14,
    color: '#555',
  },
  noAlerts: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DelayAlerts;
