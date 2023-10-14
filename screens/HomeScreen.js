import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { STORAGE_KEY } from '../storage';
import axios from 'axios'; 


const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayText((prevDisplayText) => prevDisplayText + text[charIndex]);
        setCharIndex((prevCharIndex) => prevCharIndex + 1);
      } else {
        clearInterval(intervalId);
      }
    }, 100); 
    return () => clearInterval(intervalId);
  }, [charIndex, text]);

  return <Text style={styles.title}>{displayText}</Text>;
};

const HomeScreen = () => {
  const route = useRoute();
  const { scanned } = route.params || {};
  const [fullname, setFullname] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [major, setMajor] = useState('');
  const [entryTime, setEntryTime] = useState(new Date().toLocaleString());
  const navigation = useNavigation();
  


  const handleFormSubmit = async () => {
  try {
    const formData = { fullname, studentNumber, yearLevel, major, entryTime };
    console.log('Form data submitted:', formData);


    const response = await axios.post('http://192.168.116.181:3500/attendance/post1', formData);
    console.log('Response from server:', response.data);


    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    const existingData = storedData ? JSON.parse(storedData) : [];

   
    const updatedData = [...existingData, { id: new Date().toISOString(), formData }];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));

    navigation.navigate('History');
   
    setFullname('');
    setStudentNumber('');
    setYearLevel('');
    setMajor('');
    setEntryTime(new Date().toLocaleString()); 
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};
if (!scanned) {
    return (
      <View style={styles.container1}>
        <Text style={styles.title1}>Scan the QR code to access this screen.</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TypewriterText text="ATTENDANCE" />
      <View style={styles.formContainer}>
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: 'white' }]}>Fullname:</Text>
          <TextInput
            style={[styles.input, { color: 'white' }]}
            value={fullname}
            onChangeText={(text) => setFullname(text)}
            placeholder="Enter your fullname"
            placeholderTextColor="#d3d3d3" 
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: 'white' }]}>Student Number:</Text>
          <TextInput
            style={[styles.input, { color: 'white' }]}
            value={studentNumber}
            onChangeText={(text) => setStudentNumber(text)}
            placeholder="Enter your student number"
            placeholderTextColor="#d3d3d3" 
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: 'white' }]}>Year Level:</Text>
          <Picker
            selectedValue={yearLevel}
            onValueChange={(itemValue) => setYearLevel(itemValue)}
            style={[styles.input, { color: 'white' }]}
            itemStyle={{ color: 'white' }}
          >
            <Picker.Item label="Select Year Level" value="" />
            <Picker.Item label="1st year" value="1st year" />
            <Picker.Item label="2nd year" value="2nd year" />
            <Picker.Item label="3rd year" value="3rd year" />
            <Picker.Item label="4th year" value="4th year" />
          </Picker>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: 'white' }]}>Major:</Text>
          <Picker
            selectedValue={major}
            onValueChange={(itemValue) => setMajor(itemValue)}
            style={[styles.input, { color: 'white' }]}
            itemStyle={{ color: 'white' }}
          >
            <Picker.Item label="Select Major" value="" />
            <Picker.Item label="WebDev" value="WebDev" />
            <Picker.Item label="SystemDev" value="SystemDev" />
            <Picker.Item label="Animation" value="Animation" />
          </Picker>
        </View>

        <TouchableOpacity onPress={handleFormSubmit} style={styles.submitButton}>
          <Text style={[styles.submitButtonText, { color: 'white' }]}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7A2048',
    justifyContent: 'flex-start', 
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    borderColor: '#f97316',
    borderWidth: 5,
    padding: 10,
    marginTop: 100, 
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#f97316',
    padding: 10,
  },
  submitButton: {
    backgroundColor: '#f97316',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  submitButtonText: {
    fontSize: 18,
  },
  title: {
    fontSize: 50,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  title1: {
    fontSize: 50,
    color: '#f97316',
    textAlign: 'center',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7A2048'
  },
});

export default HomeScreen;