import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const MACScreen = () => {
  const desktopMacIcons = Array.from({ length: 40 }, (_, index) => index + 1);
  const [activeIcon, setActiveIcon] = useState(null);

  useEffect(() => {
    if (activeIcon !== null) {
      const timer = setInterval(() => {
        console.log(`Timer for icon ${activeIcon}`);
      }, 1000);

      // Clear the timer when component unmounts or when the active icon changes
      return () => clearInterval(timer);
    }
  }, [activeIcon]);

  const handleIconClick = (index) => {
    setActiveIcon(index === activeIcon ? null : index);
  };

  return (
    <ScrollView contentContainerStyle={{ flexDirection: 'column' }}>
      {desktopMacIcons.map((index) => (
        <TouchableOpacity key={index} onPress={() => handleIconClick(index)}>
          <View style={styles.iconContainer}>
            {index === activeIcon && (
              <View
                style={[
                  styles.circle,
                  {
                    backgroundColor: 'green',
                  },
                ]}
              />
            )}
            <MaterialIcons name="desktop-mac" size={40} color="black" />
            <Text>{`MAC ${index}`}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    padding: 30,
    marginBottom: 20,
    position: 'relative',
  },
  circle: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    top: -5,
    left: -15,
  },
});

export default MACScreen;
