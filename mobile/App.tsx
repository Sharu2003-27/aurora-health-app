import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './src/screens/Dashboard';
import HydrationScreen from './src/screens/HydrationScreen';
import AICompanionScreen from './src/screens/AICompanionScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="dark" />
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Home' }} />
          <Tab.Screen name="Hydration" component={HydrationScreen} options={{ title: 'Hydration' }} />
          <Tab.Screen name="AI" component={AICompanionScreen} options={{ title: 'Aurora' }} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
