import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Modal, Text } from 'react-native';
import { Avatar, Input } from 'react-native-elements';
import { getAuth, updateProfile } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [yearGradeModalVisible, setYearGradeModalVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(user?.yearGrade || ''); // Initialize with the user's year grade

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
    }
  }, [user]);

  const handleProfileUpdate = async () => {
    try {
      // Update profile information
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: profilePhoto,
        yearGrade: selectedYear,
      });

      console.log('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.cancelled) {
        setProfilePhoto(result.uri);
      }
    } catch (error) {
      console.error('Error picking an image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar
          rounded
          size="xlarge"
          source={{
            uri: profilePhoto || (user ? user.photoURL : 'https://example.com/default-profile-image.jpg')
          }}
          onPress={isEditing ? pickImage : null}
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          label="Display Name"
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Enter display name"
          editable={isEditing}
        />

        <TouchableOpacity onPress={() => isEditing && setYearGradeModalVisible(true)}>
          <View style={styles.pickerButton}>
            <Text>{`Year Grade: ${selectedYear}`}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {!isEditing && (
        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <Text style={styles.editProfileButton}>Edit Profile</Text>
        </TouchableOpacity>
      )}

      {isEditing && (
        <Button title="Update" onPress={handleProfileUpdate} />
      )}

      {selectedYear !== '' && (
        <View style={styles.outputContainer}>
          <Text>{`Your selected year grade: ${selectedYear}`}</Text>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={yearGradeModalVisible}
        onRequestClose={() => {
          setYearGradeModalVisible(!yearGradeModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                setSelectedYear('1st year');
                setYearGradeModalVisible(!yearGradeModalVisible);
              }}
            >
              <Text style={styles.modalText}>1st year</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedYear('2nd year');
                setYearGradeModalVisible(!yearGradeModalVisible);
              }}
            >
              <Text style={styles.modalText}>2nd year</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedYear('3rd year');
                setYearGradeModalVisible(!yearGradeModalVisible);
              }}
            >
              <Text style={styles.modalText}>3rd year</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedYear('4th year');
                setYearGradeModalVisible(!yearGradeModalVisible);
              }}
            >
              <Text style={styles.modalText}>4th year</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
  },
  outputContainer: {
    marginTop: 20,
  },
  editProfileButton: {
    color: 'blue',
    marginTop: 10,
  },
  pickerButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ProfileScreen;