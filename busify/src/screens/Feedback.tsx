import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { firestore } from '../firebase/config'; // Import firestore
import { collection, addDoc } from 'firebase/firestore';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');

  // Submit feedback function
  const handleSubmit = async () => {
    if (feedback === '' || name === '') {
      alert('Please fill in both fields');
      return;
    }

    try {
      const docRef = await addDoc(collection(firestore, 'feedbacks'), {
        name,
        feedback,
        timestamp: new Date(),
      });
      alert('Feedback submitted successfully!');
      setName('');
      setFeedback('');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error submitting feedback');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit Feedback</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your feedback"
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default FeedbackPage;
