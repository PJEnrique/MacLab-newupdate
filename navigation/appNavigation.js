import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
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
import SettingsScreen from '../screens/SettingsScreen';
import { HistoryScreen, MACScreen, ProfileScreen } from '../screens/BottomTabNav';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    left: 10,
    elevation: 10,
    height: 60,
     backgroundColor: '#fff',
     borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
};

const ProfileStack = createNativeStackNavigator();

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="SettingsScreen"
      component={ProfileScreen}
      options={({ navigation }) => ({
        title: 'Profile',
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <AntDesign name="setting" size={24} color="black" style={{ marginRight: 20 }} />
          </TouchableOpacity>
        ),
      })}
    />
    <ProfileStack.Screen name="Settings" component={SettingsScreen} />
    <ProfileStack.Screen name="AboutUs" component={AboutUs} />
    <ProfileStack.Screen name="Guidelines" component={Guidelines} />
  </ProfileStack.Navigator>
);

export default function AppNavigation() {
  const { user } = useAuth();

  if (user) {
    return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Entypo name="home" size={30} color={focused ? '#ffa500' : '#111'} />
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="History"
            component={HistoryScreen}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesome name="history" size={30} color={focused ? '#ffa500' : '#111'} />
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="MAC"
            component={MACScreen}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <MaterialIcons
                      name="desktop-mac"
                      size={30}
                      color={focused ? '#ffa500' : '#111'}
                    />
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileStackScreen}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <MaterialIcons name="face" size={30} color={focused ? '#ffa500' : '#111'} />
                  </View>
                );
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
          <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
          <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUpScreen} />
          <Stack.Screen name="ForgotPassword" options={{ headerShown: false }} component={ForgotPassword}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
