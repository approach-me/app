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
// import Home from './src/screens/Home.js';
// import HomepageScreen from './src/screens/Homepage.js';
// import ProfileScreen from './src/screens/Profile.js';
// import ProfileEdit from './src/screens/ProfileEdit.js';
// import MessagesScreen from './src/screens/Messages';
// import MessagingScreen from './src/screens/Messaging';
import Navigation from './src/routes/homeStack'
// import 'react-native-gesture-handler';
// import { NavigationContainer } from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}



// const Tab = createBottomTabNavigator();

// const MyTheme = {
//   colors: {
//     background: 'white'
//   },
// };

// export default function App() {
//   return (
//     <Provider store={store}>
//       <NavigationContainer theme={MyTheme}>
//         <Tab.Navigator initialRouteName="HomePage" >
//         <Tab.Screen name="Home" component={Home} />
//           <Tab.Screen name="HomePage" component={Homepage} />
//           <Tab.Screen name="Messaging" component={Messaging} />
//           <Tab.Screen 
//           screenOptions={{
//             headerShown: false
//           }}
//           options={{
//             tabBarIcon: () => (<Image source={{uri:'https://pic.onlinewebfonts.com/svg/img_489905.png'}} style={{width: 20, height: 20}} />)
//           }}
//           name="Profile" component={Profile} />
//         </Tab.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// }