import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleSubmit = async () => {
    if (email && password && passwordsMatch) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.log('got error: ', err.message);
        alert('Login failed. Your email and password doest match.');
      }
    } else {
      if (!email) {
        alert('Please enter your Email Address');
      }
      if (!password) {
        alert('Please enter your Password');
      }
      if (!passwordsMatch) {
        alert('Password does not match');
      }
    }
  }

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.secondary }}>
      <SafeAreaView className="flex ">
        <View className="flex-row justify-start">
        </View>
        <View className="flex-row justify-center">
          <Image source={require('../assets/images/login.png')}
            style={{ width: 300, height: 300 }} />
        </View>
      </SafeAreaView>
      <View style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }} >
        <View className="form space-y-4">
          {/* Email Input */}
          <Text className="text-orange-400 ml-1">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Enter your Email"
            value={email}
            onChangeText={value => setEmail(value)}
          />
          {/* Password Input */}
          <Text className="text-orange-400 ml-1">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            secureTextEntry={isSecureEntry}
            placeholder="Enter your Password"
            value={password}
            onChangeText={value => setPassword(value)}
          />
          <TouchableOpacity
            onPress={() => {
              setIsSecureEntry(prev => !prev);
            }}
            style={{ position: 'absolute', right: 20, top: 160}} >
            <Text>{isSecureEntry ? "Show" : "Hide"}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> navigation.navigate('ForgotPassword')} className="flex items-end">
            <Text className="text-orange-400 mb-5">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleSubmit}
            className="py-3 bg-orange-400 rounded-xl">
            <Text 
              className="text-xl font-bold text-center text-gray-700"
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
          <Text className="text-orange-400 font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
            <Text className="font-bold text-white"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
