import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import useAuth from '../hooks/useAuth';
import ForgotPassword from '../screens/ForgotPassword';
import AboutUs from '../screens/AboutUs';
import Guidelines from '../screens/Guidelines';
import { HistoryScreen, MACScreen, ProfileScreen, SettingsScreen } from "../screens/BottomTabNav";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle:{
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff"
  }
}

export default function AppNavigation() {
  const {user} = useAuth();
  if(user){
     return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home' screenOptions={screenOptions}>
        <Tab.Screen 
        name="Home" 
        component={HomeScreen}
          options={{
            tabBarIcon: ({focused})=>{
              return(
                  <View style={{alignItems: "center", justifyContent: "center"}}>
              <Entypo name="home" size={30} color={focused ? "#ffa500": "#111"} />
              </View>
              )
            }
          }}
        />
        <Tab.Screen 
        name="History" 
        component={HistoryScreen}
          options={{
            tabBarIcon: ({focused})=>{
              return(
                  <View style={{alignItems: "center", justifyContent: "center"}}>
              <FontAwesome name="history" size={30} color={focused ? "#ffa500": "#111"} />
              </View>
              )
            }
          }}
        />
        <Tab.Screen 
        name="MAC" 
        component={MACScreen}
          options={{
            tabBarIcon: ({focused})=>{
              return(
                  <View style={{alignItems: "center", justifyContent: "center"}}>
              <MaterialIcons name="desktop-mac" size={30} color={focused ? "#ffa500": "#111"} />
              </View>
              )
            }
          }}
        />
        <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
          options={{
            tabBarIcon: ({focused})=>{
              return(
                  <View style={{alignItems: "center", justifyContent: "center"}}>
              <MaterialIcons name="face" size={30} color={focused ? "#ffa500": "#111"} />
              </View>
              )
            }
          }}
        />
        <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
          options={{
            tabBarIcon: ({focused})=>{
              return(
                  <View style={{alignItems: "center", justifyContent: "center"}}>
              <MaterialIcons name="settings" size={30} color={focused ? "#ffa500": "#111"} />
              </View>
              )
            }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
  }else{
     return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
        <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen}/>
        <Stack.Screen name="ForgotPassword" options={{headerShown: false}} component={ForgotPassword} />
        <Stack.Screen name="AboutUs" options={{headerShown: false}} component={AboutUs} />
        <Stack.Screen name="Guidelines" options={{headerShown: false}} component={Guidelines} />
      </Stack.Navigator>
    </NavigationContainer>
  )

  }
}