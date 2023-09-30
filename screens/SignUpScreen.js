import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import 'expo-dev-client';

export default function SignUpScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setName] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [isSecureEntry, setIsSecureEntry] = useState(true); 

    const handlePasswordChange = (value) => {
        setPassword(value);
        setPasswordsMatch(value === confirmPassword);
    };
    
    const handleConfirmPasswordChange = (value) => {
        setConfirmPassword(value);
        setPasswordsMatch(value === password);
    };
    
    const handleSubmit = async () => {
        if (email && password && passwordsMatch && fullName) {
            try {
                await createUserWithEmailAndPassword(auth, email, password, fullName);
            } catch (err) {
                console.log('got error: ', err.message);    
            }
        } else {
            // Check for empty fields and password matching
            if (!fullName) {
                alert('Please enter your Full Name');
            } else if (!email) {
                alert('Please enter your Email Address');
            } else if (!password) {
                alert('Please enter your Password');
            } else if (!confirmPassword) {
                alert('Please confirm your Password');
            } else if (!passwordsMatch) {
                alert('Password and Confirm Password must match');
            }
        }
    };

    return (
        <View className="flex-1 bg-white" style={{backgroundColor: themeColors.secondary}}>
            <SafeAreaView className="flex">
                <View className="flex-row justify-start">
                </View>
                <View className="flex-row justify-center">
                    <Image source={require('../assets/images/signup.png')} 
                        style={{width: 280, height: 200}} />
                </View>
            </SafeAreaView>
            <View style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                <View className="form space-y-4">
                    <Text className="text-orange-400 ml-1">Full Name</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-0"
                        value={fullName}
                        onChangeText={value => setName(value)}
                        placeholder='Enter Name'
                    />
                    <Text className="text-orange-400 ml-1">Email Address</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-0"
                        value={email}
                        onChangeText={value => setEmail(value)}
                        placeholder='Enter Email'
                    />
                    <Text className="text-orange-400 ml-1">Password</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-0"
                        secureTextEntry={isSecureEntry}
                        value={password}
                        onChangeText={handlePasswordChange}
                        placeholder="Enter Password"
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setIsSecureEntry((prev) => !prev);
                        }}
                        style={{ position: 'absolute', right: 20, top: 260 }} 
                    >
                        <Text>{isSecureEntry ? "Show" : "Hide"}</Text>
                    </TouchableOpacity>
                    <Text className="text-orange-400 ml-1">Confirm Password</Text>
                    <TextInput
                        className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-0"
                        secureTextEntry={isSecureEntry}
                        value={confirmPassword}
                        onChangeText={handleConfirmPasswordChange}
                        placeholder="Confirm Password"
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setIsSecureEntry((prev) => !prev);
                        }}
                        style={{ position: 'absolute', right: 20, top: 370}} 
                    >
                        <Text>{isSecureEntry ? "Show" : "Hide"}</Text>
                    </TouchableOpacity>
                    {!passwordsMatch && (
                        <Text className="text-red-500 ml-4">Passwords do not match</Text>
                    )}
                    <TouchableOpacity
                        className="py-3 bg-orange-400 rounded-xl"
                        onPress={handleSubmit}
                    >
                        <Text className="font-xl font-bold text-center text-gray-700">
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center mt-7">
                    <Text className="text-orange-400 font-semibold">Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text className="font-bold text-white"> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
