/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Image } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import Home from './src/screens/Home.js';
import Homepage from './src/screens/Homepage.js';
import Profile from './src/screens/Profile.js';
import ProfileEdit from './src/screens/ProfileEdit.js';
import Messages from './src/screens/Messages';
import Messaging from './src/screens/Messaging';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function ProfilePages() {
  return (
    <Stack.Navigator>
      <Stack.Screen name = "Profile" component={Profile} />
      <Stack.Screen name = "ProfileEdit" component={ProfileEdit} />
    </Stack.Navigator>
  );
}

const MyTheme = {
  colors: {
    background: 'white'
  },
}; 
export default function App() {
  return (

    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator initialRouteName="HomePage" >
        <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="HomePage" component={Homepage} />
          <Tab.Screen name="Messages" component={Messages} />
          <Tab.Screen 
          options={{
            headerShown: false,
            tabBarIcon: () => (<Image source={{uri:'https://pic.onlinewebfonts.com/svg/img_489905.png'}} style={{width: 20, height: 20}} />)
          }}
          name="ProfilePages" component={ProfilePages} />
          {/* <Stack.Screen */}
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}