import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function SettingsScreen({ navigation }) {
  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleAboutUsNavigation = () => {
    navigation.navigate('AboutUs');
  };

  const handleGuidelinesNavigation = () => {
    navigation.navigate('Guidelines');
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Button for AboutUs */}
      <TouchableOpacity
        onPress={handleAboutUsNavigation}
        style={{
          padding: 10,
          backgroundColor: '#e67e22',
          borderRadius: 10,
          marginBottom: 10,
          borderWidth: 1,
          borderColor: 'black',
        }}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>About Us</Text>
      </TouchableOpacity>

      {/* Button for Guidelines */}
      <TouchableOpacity
        onPress={handleGuidelinesNavigation}
        style={{
          padding: 10,
          backgroundColor: '#e67e22',
          borderRadius: 10,
          marginBottom: 10,
          borderWidth: 1,
          borderColor: 'black',
        }}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Guidelines</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          padding: 10,
          backgroundColor: '#e67e22',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'black',
        }}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

