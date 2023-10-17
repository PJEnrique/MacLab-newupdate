import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const generateUniqueId = () => {
  return '_' + Math.random().toString(36).substring(2, 9);
};

const generateIdentifier = (index) => {
  return `MAC ${index}`;
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

  const [securityInfo, setSecurityInfo] = useState({
    name: '',
    studentNumber: '',
  });

  const [accessGranted, setAccessGranted] = useState(false);

  const postToMongoDB = async (index) => {
    const selectedIcon = desktopMacIcons.find((icon) => icon.index === index);
    try {
      const identifier = generateIdentifier(selectedIcon.index);
  
      const formatDate = (dateTime) => {
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        };
        return dateTime.toLocaleDateString('en-PH', options);
      };
  
      const formatTime = (dateTime) => {
        const options = {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        };
        return dateTime.toLocaleTimeString('en-US', options);
      };
  
      const activationDate = selectedIcon.activationDateTime
        ? `DATE: ${formatDate(selectedIcon.activationDateTime)}`
        : null;
  
      const activationTime = selectedIcon.activationDateTime
        ? `TIME: ${formatTime(selectedIcon.activationDateTime)}`
        : null;
  
      const deactivationDate = selectedIcon.deactivationDateTime
        ? `DATE: ${formatDate(selectedIcon.deactivationDateTime)}`
        : null;
  
      const deactivationTime = selectedIcon.deactivationDateTime
        ? `TIME: ${formatTime(selectedIcon.deactivationDateTime)}`
        : null;
  
      const dataToSend = {
        id: selectedIcon.id,
        index: selectedIcon.index,
        active: selectedIcon.active,
        timer: selectedIcon.timer,
        identifier: identifier,
        activationDateTime: `${activationDate} ${activationTime}`,
        deactivationDateTime: `${deactivationDate} ${deactivationTime}`,
        name: securityInfo.name,
        studentNumber: securityInfo.studentNumber,
      };
  
      const response = await fetch('http://192.168.116.181:3500/mac/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
  
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

  const handleAccess = () => {
    if (securityInfo.name.trim() !== '' && securityInfo.studentNumber.trim() !== '') {
      setAccessGranted(true);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes}:${remainingSeconds}`;
  };

  const toggleStatus = (index) => {
    const updatedIcons = desktopMacIcons.map((icon) => {
      if (icon.index === index) {
        const updatedIcon = {
          ...icon,
          active: !icon.active,
          timer: icon.active ? 7200 : 7200
        };
  
        
        if (updatedIcon.active) {
          updatedIcon.activationDateTime = new Date();
          updatedIcon.deactivationDateTime = null;
        } else {
          updatedIcon.deactivationDateTime = new Date();
          updatedIcon.activationDateTime = null;
        }
  
        return updatedIcon;
      } else {
        return icon;
      }
    });
  
    setDesktopMacIcons(updatedIcons);
  };
  
  return (
    <View style={styles.container}>
      {accessGranted ? (
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
              <MaterialIcons name="desktop-mac" size={40} color="#f97316" />
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
      ) : (
        <View style={styles.securityAccessContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={securityInfo.name}
            onChangeText={(text) => setSecurityInfo({ ...securityInfo, name: text })}
            placeholder="Enter your name"
          />
          <Text style={styles.label}>Student Number:</Text>
          <TextInput
            style={styles.input}
            value={securityInfo.studentNumber}
            onChangeText={(text) => setSecurityInfo({ ...securityInfo, studentNumber: text })}
            placeholder="Enter your student number"
          />
          <TouchableOpacity style={styles.accessButton} onPress={handleAccess}>
            <Text style={styles.accessButtonText}>Access MACScreen</Text>
          </TouchableOpacity>
        </View>
      )}
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
    marginBottom: 60,
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
  securityAccessContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: '#f97316',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    color: 'black',
    width: '100%',
    backgroundColor: 'white',
  },
  accessButton: {
    backgroundColor: '#f97316',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  accessButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default MACScreen;