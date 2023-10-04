import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Text } from 'react-native';
import { Avatar, Input, Button } from 'react-native-elements';
import { getAuth, updateProfile } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const ProfileScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [yearGradeModalVisible, setYearGradeModalVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(user?.yearGrade || '');
  const [studentNo, setStudentNo] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departmentModalVisible, setDepartmentModalVisible] = useState(false);

  const firestore = getFirestore();
  const userDocRef = doc(firestore, 'users', user.uid);
  const storage = getStorage();

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();
      if (userData) {
        setDisplayName(userData.displayName || '');
        setProfilePhoto(userData.photoURL || '');
        setSelectedYear(userData.yearGrade || '');
        setStudentNo(userData.studentNo || '');
        setSelectedDepartment(userData.department || '');
      }
    } catch (error) {
      console.error('Error fetching profile info:', error);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      console.log('Updating profile with:');
      console.log('displayName:', displayName);
      console.log('photoURL:', profilePhoto);
      console.log('yearGrade:', selectedYear);
      console.log('studentNo:', studentNo);
      console.log('department:', selectedDepartment);

      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: profilePhoto,
      });

      await setDoc(userDocRef, {
        displayName,
        photoURL: profilePhoto,
        yearGrade: selectedYear,
        studentNo,
        department: selectedDepartment,
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

      if (!result.canceled) {
        setProfilePhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking an image:', error);
    }
  };

  const handleYearGradeSelect = (year) => {
    setSelectedYear(year);
    setYearGradeModalVisible(false);
  };

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    setDepartmentModalVisible(false);
  };

  const renderYearGradeModal = () => (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <TouchableOpacity onPress={() => handleYearGradeSelect('1st year')}>
          <Text style={styles.modalText}>1st year</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleYearGradeSelect('2nd year')}>
          <Text style={styles.modalText}>2nd year</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleYearGradeSelect('3rd year')}>
          <Text style={styles.modalText}>3rd year</Text>
        </TouchableOpacity><TouchableOpacity onPress={() => handleYearGradeSelect('4th year')}>
          <Text style={styles.modalText}>4th year</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDepartmentModal = () => (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <TouchableOpacity onPress={() => handleDepartmentSelect('WebDev')}>
          <Text style={styles.modalText}>WebDev</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDepartmentSelect('SystDev')}>
          <Text style={styles.modalText}>SystDev</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDepartmentSelect('Animation')}>
          <Text style={styles.modalText}>Animation</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar
          rounded
          size="xlarge"
          source={{
            uri: profilePhoto || 'https://example.com/default-profile-image.jpg'
          }}
          onPress={() => isEditing && pickImage()}
        >
          {!profilePhoto && (
            <View style={styles.cameraIconContainer}>
              <FontAwesome
                name="plus"
                size={60}
                color="#666"
                style={styles.cameraIcon}
              />
            </View>
          )}
        </Avatar>
      </View>

      <View style={styles.inputContainer}>
        <Input
          label="Display Name"
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Enter display name"
          editable={isEditing}
        />

        <Input
          label="Student No."
          value={studentNo}
          onChangeText={setStudentNo}
          placeholder="Enter student number"
          editable={isEditing}
          keyboardType="numeric"
        />

        <TouchableOpacity onPress={() => isEditing && setYearGradeModalVisible(true)}>
          <View style={styles.pickerButton}>
            <Text>{`Year Grade: ${selectedYear}`}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => isEditing && setDepartmentModalVisible(true)}>
          <View style={styles.pickerButton}>
            <Text>{`Department: ${selectedDepartment}`}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {!isEditing && (
        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <Text style={styles.editProfileButton}>Edit Profile</Text>
        </TouchableOpacity>
      )}

      {isEditing && (
        <Button
  title="Update"
  onPress={handleProfileUpdate}
  buttonStyle={{
    backgroundColor: isEditing ? '#ffa500' : '#ffa500',
    borderRadius: 10,
    marginTop: 50,
  }}
/>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={yearGradeModalVisible}
        onRequestClose={() => {
          setYearGradeModalVisible(!yearGradeModalVisible);
        }}
      >
        {renderYearGradeModal()}
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={departmentModalVisible}
        onRequestClose={() => {
          setDepartmentModalVisible(!departmentModalVisible);
        }}
      >
        {renderDepartmentModal()}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraIconContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  cameraIcon: {
    alignSelf: 'center',
  },
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
    color: 'orange',
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