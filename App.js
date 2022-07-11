/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import 'react-native-gesture-handler';
import Home from './src/screens/Home.js';
import Homepage from './src/screens/Homepage.js';
import Profile from './src/screens/Profile.js';
import Messages from './src/screens/Messages.js';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  NavigationContainer
} from '@react-navigation/native';
import {
  createStackNavigator
} from '@react-navigation/stack';
import {
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#42f44b' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home' }}/>
        <Stack.Screen
          name="Home Page"
          component={Homepage}
          options={{ title: 'Home Page' }} />
       <Stack.Screen
          name="Messages"
          component={Messages}
          options={{ title: 'Messages Page' }}/>
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: 'Profile Page' }}/>
      </Stack.Navigator>
    
  );
}

export default function App() {
  return (
    
    <Provider store={store}>
      <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: '#42f44b',
        }}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="HomePage" component={Homepage} />
          <Tab.Screen name="Messages" component={Messages} />
          <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
