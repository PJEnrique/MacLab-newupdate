import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

export default function SettingsScreen() {
  const handleLogout = async ()=>{
    await signOut(auth);
  }
  return (
    <SafeAreaView className="flex-1 flex-row justify-center items-center">
      <Text className="text-lg">Settings Page - </Text>
      <TouchableOpacity onPress={handleLogout} className="p-1 bg-orange-400 rounded-lg">
        <Text className="text-white text-lg front-bold">Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}