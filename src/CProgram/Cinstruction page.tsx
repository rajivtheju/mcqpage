import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function CinstructionPage() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    instructions: [
      'Ensure a quiet, private space with no one else present during the exam',
      'Do not use any reference materials during the exam',
      'You will have 10 minutes to complete the exam',
      'Make sure your internet connection is stable',
      'You must score at least 80% to pass',
    ],
  });// this data is just for showing structure  make it null,

  useEffect(() => {
    // Replace with your API endpoint
    axios.get('https://api.example.com/cprogram-details')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#700CBC" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data && (
        <>
          <View style={styles.topBox}>
            <Text style={styles.instructionsHeading}>Instructions</Text>
            {data.instructions.map((instruction, index) => (
              <View key={index} style={styles.instruction}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CTestpage')}>
              <Text style={styles.buttonText}>Start test</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9D6F5', // Light purple background
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBox: {
    width: '90%',
    backgroundColor: '#FFFFFF', // White background for contrast
    borderRadius: 20,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'column',
  },
  subHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EE82ED', // Violet text
  },
  description: {
    fontSize: 20,
    color: '#000000', // Black text
  },
  instructionsHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000', // Black text
    marginBottom: 10,
  },
  instruction: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 5,
    fontSize: 12,
  },
  bulletPoint: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000', // Black bullet point
    marginRight: 5,
  },
  instructionText: {
    fontSize: 16,
    color: '#000000', // Black text
    flexShrink: 1,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#700CBC', // Violet background
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF', // White text
  },
});
