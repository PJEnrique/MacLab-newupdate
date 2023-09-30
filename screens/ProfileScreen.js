import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { Avatar, Input } from 'react-native-elements';
import { getAuth, updateProfile, updateEmail } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      setEmail(user.email);
    }
  }, [user]);

  const handleProfileUpdate = () => {
    updateProfile(auth.currentUser, {
      displayName,
      photoURL: profilePhoto || 'https://example.com/default-profile-image.jpg'
    })
      .then(() => {
        console.log('Profile updated successfully');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };

  const handleEmailUpdate = () => {
    updateEmail(auth.currentUser, email)
      .then(() => {
        console.log('Email updated successfully');
      })
      .catch((error) => {
        console.error('Error updating email:', error);
      });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setProfilePhoto(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size="xlarge"
        source={{
          uri: profilePhoto || (user ? user.photoURL : 'https://example.com/default-profile-image.jpg')
        }}
        onPress={pickImage}
      />
      <Input
        label="Display Name"
        value={displayName}
        onChangeText={setDisplayName}
        placeholder="Enter display name"
      />
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
      />
      <Button title="Update Profile" onPress={handleProfileUpdate} />
      <Button title="Update Email" onPress={handleEmailUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;