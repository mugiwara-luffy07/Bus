import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const StudentDashboard = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Correcting the image path */}
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.gridContainer}>
        <TouchableOpacity 
          style={styles.gridItem} 
          onPress={() => navigation.navigate('LiveMap')}>
          <Text style={styles.gridText}>Live Bus Map</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.gridItem} 
          onPress={() => navigation.navigate('SeatAvailability')}>
          <Text style={styles.gridText}>Seat Availability</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.gridItem} 
          onPress={() => navigation.navigate('BusRouteInfo')}>
          <Text style={styles.gridText}>Bus Route Info</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.gridItem} 
          onPress={() => navigation.navigate('DelayAlerts')}>
          <Text style={styles.gridText}>Delay Alerts</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.gridItem} 
          onPress={() => navigation.navigate('Feedback')}>
          <Text style={styles.gridText}>Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.gridItem} 
          onPress={() => navigation.navigate('MissedBuses')}>
          <Text style={styles.gridText}>Missed Buses</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.gridItem} 
          onPress={() => navigation.navigate('SearchRoute')}>
          <Text style={styles.gridText}>Search Route</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  gridItem: {
    backgroundColor: '#007bff',
    padding: 20,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
  },
  gridText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default StudentDashboard;
