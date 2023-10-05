import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const MACScreen = () => {
  const [desktopMacIcons, setDesktopMacIcons] = useState(
    Array.from({ length: 40 }, (_, index) => ({ index: index + 1, active: false, timer: 7200 }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setDesktopMacIcons((prevIcons) =>
        prevIcons.map((icon) =>
          icon.active && icon.timer > 0 ? { ...icon, timer: icon.timer - 1 } : icon
        )
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

  const toggleStatus = async (index) => {
  try {
    const updatedIcons = desktopMacIcons.map((icon) =>
      icon.index === index
        ? { ...icon, active: !icon.active, timer: icon.active ? 7200 : 7200 }
        : icon
    );

    setDesktopMacIcons(updatedIcons);

    if (!desktopMacIcons[index - 1].active) {
      // If the timer is starting, fetch data
      const response = await fetch('http://136.158.121.80:3400/MAC');
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      setDesktopMacIcons(data);
    } else {
      // If the timer is force-stopped, save the time
      console.log(`Desktop ${index} timer stopped at: ${formatTime(desktopMacIcons[index - 1].timer)}`);
    }
  } catch (error) {
    console.error('Error fetching MAC data or saving time:', error.message);
    console.error('Error details:', error); // Log the full error object for debugging
  }
};

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexDirection: 'column' }}>
        {desktopMacIcons.map((icon) => (
          <TouchableOpacity
            key={icon.index}
            onPress={() => toggleStatus(icon.index)}
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
    fontSize: 20
  },
});

export default MACScreen;