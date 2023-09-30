import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'

export default function WelcomeScreen() {
    const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: themeColors.secondary}}>
            <View className="flex-row justify-center">
                <Image source={require("../assets/images/welcome.png")}
                    style={{height: 300,
                            width: 300,
                            borderRadius: 20,
                            position: "relative",
                            top: 10,
                            left: 45,
                            transform: [
                                { translateX: -45 },
                                { translateY: 50 },
                            ]
                            }} />
            </View>
            <View className="flex-1 flex justify-around my-10">
            <Text style={{
                            color: themeColors.Orange,
                            fontSize: 42,
                        }}
                className="font-bold text-4xl text-center">
                FortiMac</Text>
               <View style={{ marginVertical: 10 }}>
                        <Text style={{
                            fontSize: 20,
                            color: themeColors.white,
                            textAlign: 'center',
                        }}>"Scan smart, stay secure"</Text>
                        <Text style={{
                            fontSize: 14,
                            color: themeColors.white,
                            textAlign: 'center',
                        }}>Scan QR code to Enter MacLab</Text>
                    </View>
            <View className="space-y-4">
                <TouchableOpacity
                    onPress={()=> navigation.navigate('Login')}
                    className="py-3 bg-orange-400 mx-7 rounded-xl">
                        <Text 
                            className="text-xl font-bold text-center text-gray-700"
                        >
                            Let's Get Started
                        </Text>
                </TouchableOpacity>
                <View className="flex-row justify-center">
                    <Text style={{
                            color: themeColors.Orange,
                        }} className="text-black font-semibold">Already have an account?</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
                        <Text className="font-bold text-white"> SignUp</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}