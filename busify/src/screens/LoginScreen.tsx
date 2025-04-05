import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const LoginScreen = ({ navigation }: any) => {
  const [registerNo, setRegisterNo] = useState('');
  const [password, setPassword] = useState('');

  // Hardcoded login credentials for student
  const hardcodedRegisterNo = '123456';  // Example student register number
  const hardcodedPassword = 'password123';  // Example student password

  const handleLogin = () => {
    console.log('Register No:', registerNo); // Debugging log
    console.log('Password:', password); // Debugging log

    // Check if the login details match the hardcoded values
    if (registerNo === hardcodedRegisterNo && password === hardcodedPassword) {
      console.log('Login Successful');
      navigation.navigate('StudentDashboard');  // Navigate to the dashboard on successful login
    } else {
      console.log('Login Failed');
      Alert.alert('Login Failed', 'Incorrect Register Number or Password');  // Show error if incorrect login details
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter Register Number"
        value={registerNo}
        onChangeText={setRegisterNo}
        keyboardType="numeric"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LoginScreen;
