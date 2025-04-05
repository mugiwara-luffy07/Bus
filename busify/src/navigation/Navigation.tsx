import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import StudentDashboard from '../screens/StudentDashboard';
import LiveMapScreen from '../screens/LiveMapScreen';
import SeatAvailabilityScreen from '../screens/SeatAvailability';
import BusRouteInfoScreen from '../screens/BusRoutes';
import DelayAlertsScreen from '../screens/DelayAlerts';
import FeedbackScreen from '../screens/Feedback';
import MissedBusesScreen from '../screens/MissedBus';
import SearchRouteScreen from '../screens/SearchRoute';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
        <Stack.Screen name="LiveMap" component={LiveMapScreen} />
        <Stack.Screen name="SeatAvailability" component={SeatAvailabilityScreen} />
        <Stack.Screen name="BusRouteInfo" component={BusRouteInfoScreen} />
        <Stack.Screen name="DelayAlerts" component={DelayAlertsScreen} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
        <Stack.Screen name="MissedBuses" component={MissedBusesScreen} />
        <Stack.Screen name="SearchRoute" component={SearchRouteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
