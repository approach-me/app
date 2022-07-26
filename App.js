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
 import Messaging from './src/screens/Messaging';
 import 'react-native-gesture-handler';
 import { NavigationContainer } from '@react-navigation/native';
 import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
 import { createStackNavigator } from '@react-navigation/stack';
 
 
 const Tab = createBottomTabNavigator();
 const Stack = createStackNavigator();
 const Stack2 = createStackNavigator();
 
 
 function ProfilePages() {
   return (
     <Stack.Navigator>
       <Stack.Screen name = "Profile" component={Profile} />
       <Stack.Screen name = "ProfileEdit" component={ProfileEdit} />
     </Stack.Navigator>
   );
 }
 
 function GetHomepage() {
   return (
     <Stack2.Navigator>
       <Stack2.Screen name = "Homepage" component={Homepage} />
       <Stack.Screen name = "Profile" component={Profile} />
     </Stack2.Navigator>
   )
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
          <Tab.Screen 
          name="Setup" 
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: () => (<Image source={{uri:'https://pic.onlinewebfonts.com/svg/img_489905.png'}} style={{width: 20, height: 20}} />)
          }}
           />
          <Tab.Screen name="Messaging" component={Messaging} />
           <Tab.Screen 
           options={{
             headerShown: false,
             tabBarIcon: () => (<Image source={{uri:'https://cdn-icons-png.flaticon.com/512/25/25694.png'}} style={{width: 20, height: 20}} />)
           }}
           name="Home" component={GetHomepage} />
           <Tab.Screen 
           options={{
             headerShown: false,
             tabBarIcon: () => (<Image source={{uri:'http://cdn.onlinewebfonts.com/svg/img_569204.png'}} style={{width: 20, height: 20}} />)
           }}
           name="Profile" component={ProfilePages} />
           {/* <Stack.Screen */}
         </Tab.Navigator>
       </NavigationContainer>
     </Provider>
   );
 }