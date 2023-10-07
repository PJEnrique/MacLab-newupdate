import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const generateUniqueId = () => {
  return '_' + Math.random().toString(36).substring(2, 9);
};

const MACScreen = () => {
  const [desktopMacIcons, setDesktopMacIcons] = useState(
    Array.from({ length: 40 }, (_, index) => ({
      id: generateUniqueId(),
      index: index + 1,
      active: false,
      timer: 7200,
    }))
  );

  const postToMongoDB = async (index) => {
    const selectedIcon = desktopMacIcons.find((icon) => icon.index === index);
    try {
      const response = await fetch('http://192.168.100.14:3600/mac/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedIcon),  // Send only the selected icon
      });

      // Log the response
      const responseData = await response.json();
      console.log('Response from server:', responseData);

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error posting MAC data:', error.message);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDesktopMacIcons((prevIcons) =>
        prevIcons.map((icon) => {
          const updatedIcon = icon.active && icon.timer > 0 ? { ...icon, timer: icon.timer - 1 } : icon;

          // Post to MongoDB if the timer has stopped
          if (!updatedIcon.active && updatedIcon.timer <= 0) {
            postToMongoDB(updatedIcon.index);
          }

          return updatedIcon;
        })
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes}:${remainingSeconds}`;
  };

  const toggleStatus = (index) => {
    const updatedIcons = desktopMacIcons.map((icon) =>
      icon.index === index ? { ...icon, active: !icon.active, timer: icon.active ? 7200 : 7200 } : icon
    );

    setDesktopMacIcons(updatedIcons);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexDirection: 'column' }}>
        {desktopMacIcons.map((icon) => (
          <TouchableOpacity
            key={`${icon.index}_${icon.id}`}
            onPress={() => {
              toggleStatus(icon.index);
              if (icon.active) {
                postToMongoDB(icon.index);
              }
            }}
            style={[
              styles.iconContainer,
              { borderColor: icon.active ? 'green' : 'white' },
            ]}
          >
            <MaterialIcons name="desktop-mac" size={40} color="#ffa500" />
            <Text style={styles.text}>{`MAC ${icon.index}`}</Text>
            <View
              style={[
                styles.statusIndicator,
                { backgroundColor: icon.active ? 'green' : 'red' },
              ]}
            ></View>
            <Text style={styles.text}>{formatTime(icon.timer)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101820FF',
    paddingHorizontal: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 30,
    marginBottom: 70,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default MACScreen;