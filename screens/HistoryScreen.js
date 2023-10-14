import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 

const STORAGE_KEY = '@submissionData';

const HistoryScreen = ({ route }) => {
  const [submissionContainers, setSubmissionContainers] = useState([]);
  const formData = route.params ? route.params.formData : null;

  const loadSubmissionData = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setSubmissionContainers(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error loading submission data:', error);
    }
  };

  useEffect(() => {
    loadSubmissionData();
  }, []);

  const updateSubmissionData = useCallback(async () => {
  if (formData) {
    const attendanceData = {
      fullname: formData.fullname,
      studentNumber: formData.studentNumber,
      yearLevel: formData.yearLevel,
      major: formData.major,
      entryTime: formData.entryTime,
    };

    try {
      const response = await axios.post('http://192.168.116.181:3500/attendance/post1', attendanceData);
      console.log('Response from server:', response.data);

      
      const updatedSubmissionContainers = [
        ...submissionContainers,
        {
          id: new Date().toISOString(),
          formData,
        },
      ];

      
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSubmissionContainers));

      
      setSubmissionContainers(updatedSubmissionContainers);
    } catch (error) {
      console.error('Error posting attendance data:', error.response ? error.response.data : error.message);
    }
  }
}, [formData, submissionContainers]);

  useEffect(() => {
    updateSubmissionData();
  }, [updateSubmissionData]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Record of Attendance:</Text>
        <ScrollView style={styles.scrollView}>
          {submissionContainers.map((submission) => (
            <View key={submission.id} style={styles.cardContainer}>
              {submission.formData ? (
                <View>
                  <Text style={styles.cardTitle}>Date and Time: {submission.formData.entryTime}</Text>
                  {Object.keys(submission.formData)
                    .filter((key) => key !== 'entryTime')
                    .map((key) => (
                      <View key={key} style={styles.card}>
                        <Text style={styles.cardTitle}>{key}</Text>
                        <Text style={styles.cardValue}>{submission.formData[key] || 'N/A'}</Text>
                      </View>
                    ))}
                </View>
              ) : (
                <Text style={styles.historyText}>No form data available</Text>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7A2048',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f97316',
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  cardContainer: {
    backgroundColor: '#17202A',
    borderRadius: 10,
    marginBottom: 12,
    padding: 16,
  },
  card: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f97316',
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 16,
    color: 'white',
  },
  historyText: {
    color: 'white',
  },
});

export default HistoryScreen;