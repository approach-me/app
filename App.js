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
import Home from './src/screens/Home.js';
import Homepage from './src/screens/Homepage.js';
import Profilepage from './src/screens/Profilepage.js';
import ProfileEdit from './src/screens/ProfileEdit.js';
import Messages from './src/screens/Messages';
import Messaging from './src/screens/Messaging';

export default function App() {
  return (
    <Provider store={store}>
      <ProfileEdit />
    </Provider>
  );
}