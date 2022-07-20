/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
// import Home from './src/screens/Home.js';
import HomepageScreen from './src/screens/Homepage.js';
import ProfileScreen from './src/screens/Profile.js';
// import ProfileEdit from './src/screens/ProfileEdit.js';
import MessagesScreen from './src/screens/Messages';
import Messaging from './src/screens/Messaging';
// import Navigation from './src/routes/homeStack'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="HomepageScreen" component={HomepageScreen} /> */}
          {/* <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> */}
          <Stack.Screen name="Messages" component={MessagesScreen} />
          <Stack.Screen 
            name="Messaging" 
            component={Messaging} 
            options={({ route }) => ({ 
              title: route.params.name,
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: '#fff',
                shadowColor: '#fff',
                elevation: 0,
              },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;