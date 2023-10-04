import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const Guidelines = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.guidelineContainer}>
        <Text style={styles.header}>Home</Text>
        <Text style={styles.guidelineText}>
          Scanner for QR code that will take as your attendance.
        </Text>
        <Text style={styles.guidelineText}>
          Functionality: Scan a QR code to record your attendance.
        </Text>
        <Text style={styles.guidelineText}>
          Description: Use the scanner to register your attendance by scanning QR codes provided in various settings such as events or classes.
        </Text>
      </View>

      <View style={styles.guidelineContainer}>
        <Text style={styles.header}>History</Text>
        <Text style={styles.guidelineText}>
          It will show all your records.
        </Text>
        <Text style={styles.guidelineText}>
          Functionality: View your attendance history.
        </Text>
        <Text style={styles.guidelineText}>
          Description: Access this section to view a comprehensive history of your attendance records. You can review when and where you were present based on the QR codes you've scanned.
        </Text>
      </View>

      <View style={styles.guidelineContainer}>
        <Text style={styles.header}>MAC</Text>
        <Text style={styles.guidelineText}>
          Open any MACs and start the timer.
        </Text>
        <Text style={styles.guidelineText}>
          Functionality: Open any MAC and initiate a timer.
        </Text>
        <Text style={styles.guidelineText}>
          Description: In this section, you can initiate a timer for various activities or tasks associated with MACs. Start the timer and monitor your progress or duration for each activity.
        </Text>
      </View>

      <View style={styles.guidelineContainer}>
        <Text style={styles.header}>Profile</Text>
        <Text style={styles.guidelineText}>
          View your information and edit it.
        </Text>
        <Text style={styles.guidelineText}>
          Functionality:
            - View your personal information.
            - Edit your information and add a photo.
        </Text>
        <Text style={styles.guidelineText}>
          Description: You can access and review your personal details stored in the application. Additionally, edit your profile information, including adding or updating your photo to personalize your profile.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 50,
    backgroundColor: '#101820FF'
  },
  guidelineContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#e67e22'
  },
  guidelineText: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white'
  },
});

export default Guidelines;
