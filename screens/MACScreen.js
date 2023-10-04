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

  const toggleStatus = (index) => {
    setDesktopMacIcons((prevIcons) =>
      prevIcons.map((icon) =>
        icon.index === index
          ? { ...icon, active: !icon.active, timer: icon.active ? 7200 : 7200 } // Reset timer when deactivating
          : icon
      )
    );
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes}:${remainingSeconds}`;
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