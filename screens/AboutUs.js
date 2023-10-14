import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const developerData = [
  { name: 'Patrick Josh Antonio', role: 'Front End/Back End', image: require('../assets/developers/patrick.jpg') },
  { name: 'Elorde Catabay', role: 'Front End', image: require('../assets/developers/elorde.jpg') },
  { name: 'Gabriel Nipal', role: 'Front End', image: require('../assets/developers/gabriel.jpg') },
  { name: 'Brian Angelo Martinez', role: 'Gatherer Resources', image: require('../assets/developers/brian.jpg') },
  { name: 'Lesley Ann Rantayo', role: 'Front End', image: require('../assets/developers/lesley.jpg') },
];

const AboutUs = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>MAC Lab Advance Security System</Text>
        <Text style={styles.introText}>
          Welcome to the MAC Lab Advance Security System, an application designed to provide advanced security solutions. Our dedicated team of developers has worked collaboratively to create a secure and intuitive platform.
        </Text>

        <Text style={styles.developerTitle}>Meet the Developers:</Text>
        {developerData.map((developer, index) => (
          <View key={index} style={styles.developerContainer}>
            <Image source={developer.image} style={styles.avatar} />
            <View style={styles.developerInfo}>
              <Text style={styles.name}>{developer.name}</Text>
              <Text style={styles.role}>{developer.role}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#101820FF'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#f97316'
  },
  introText: {
    marginBottom: 20,
    color: 'white'
  },
  developerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#f97316'
  },
  developerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  developerInfo: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f97316'
  },
  role: {
    fontSize: 15,
    color: 'white'
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 5,
  },
});

export default AboutUs;
