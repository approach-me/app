import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, Image, ScrollView, ImageBackground } from 'react-native';
import Story from './components/Story';
import { connect } from 'react-redux';
import { REQUEST_ALL_PERMISSIONS } from '../actions/permissionActions'
import {PulseAnimation} from 'react-native-animated-pulse';
import UserCard from './components/UserCard';
import { UPDATE_USER_SEARCHING_STATE } from '../actions/bluetoothActions';

const Counter = (props) => {
  const isSearching = false;

  const Searching = () => {
   return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* Stories */}
        <View>
          <View style={styles.topBar}>
            <Text style={styles.headingTitle}>Stories</Text>
            {/* {Show} */}
            <TouchableOpacity style={styles.setting}>
              <Image style={styles.settingWheel}  source={{uri:'https://pic.onlinewebfonts.com/svg/img_489905.png'}}/>
            </TouchableOpacity>
          </View>
          <FlatList 
            showsHorizontalScrollIndicator={false}
            horizontal
            data={[
              {name: 'Mark', age: '30', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
              {name: 'Ali', age: '26', path: 'https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'},
              {name: 'Stephen', age: '22', path: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'},
              {name: 'Aiony', age: '21', path: 'https://images.unsplash.com/photo-1455274111113-575d080ce8cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'},
              {name: 'Mark', age: '30', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
              {name: 'Ali', age: '26', path: 'https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'},
              {name: 'Stephen', age: '22', path: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'},
              {name: 'Aiony', age: '21', path: 'https://images.unsplash.com/photo-1455274111113-575d080ce8cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'},
            ]}
            // renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
            renderItem={({item}) => 
              <TouchableOpacity onPress={props.requestPremissions}>
                <Story name={item.name} path={item.path}></Story>              
              </TouchableOpacity>
            }
          />
        </View>
        
        {/* Radar */}
        <TouchableOpacity onPress={ () => props.updateUserSearchingState(false)}>
          <View style={styles.radar}>
            <PulseAnimation color={'#73faf8'} numPulses={2} diameter={200} speed={1000} duration={2000} initialDiameter={100}/> 
            <ImageBackground style={styles.profileImage} source={{uri:'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80'}}/>
          </View>
        </TouchableOpacity>
        
        {/* Users Nearby */}
        <View>
          <Text style={styles.headingTitle}>Users Nearby</Text>
          <View style={styles.nearByUser}>
            <FlatList 
              showsHorizontalScrollIndicator={false}
              data={[
                {name: 'Mark', userId: 'HYk6ZPQwCaDJnKXsoj2c', age: '30', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
                {name: 'Ali', userId: 'HYk6ZPQwCaDJnKXsoj2c', age: '26', path: 'https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'},
                {name: 'Stephen', userId: 'HYk6ZPQwCaDJnKXsoj2c', age: '22', path: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'},
                {name: 'Aiony', userId: 'HYk6ZPQwCaDJnKXsoj2c', age: '21', path: 'https://images.unsplash.com/photo-1455274111113-575d080ce8cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'},
                {name: 'Mark', userId: 'HYk6ZPQwCaDJnKXsoj2c', age: '30', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
                {name: 'Ali', userId: 'HYk6ZPQwCaDJnKXsoj2c', age: '26', path: 'https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'},
                {name: 'Stephen', userId: 'HYk6ZPQwCaDJnKXsoj2c', age: '22', path: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'},
                {name: 'Aiony', userId: 'HYk6ZPQwCaDJnKXsoj2c', age: '21', path: 'https://images.unsplash.com/photo-1455274111113-575d080ce8cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'},
              ]}
              // renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
              renderItem={({item}) => <UserCard name={item.name} userId={item.userId} age={item.age} path={item.path}></UserCard>}
              numColumns={2}
            />
          </View> 
        </View>
      </ScrollView>
    </SafeAreaView>
   )
  };

  const NotSearching = () => {
    return (
      <SafeAreaView style={styles.containerNoSearch}>
        {/* Radar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.setting}>
            <Image style={styles.settingWheel}  source={{uri:'https://pic.onlinewebfonts.com/svg/img_489905.png'}}/>
          </TouchableOpacity>
        </View>
        <View style={styles.radarStarter}>
          <TouchableOpacity style={styles.startSearchText} onPress={ () => props.updateUserSearchingState(true)}>
            <ImageBackground style={styles.profileImage} source={{uri:'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80'}}/>
          </TouchableOpacity>
          
          <View style={styles.startSearchText}>
            <Text>When you are ready to meet nearby users,</Text>
            <Text>press on your profile!</Text>
          </View>
        </View>
      </SafeAreaView>
    )
   };

  return (
    <View>
      { props.isUserSearching ? Searching() : NotSearching()} 
    </View>
  );
}

const styles = StyleSheet.create({
  containerNoSearch: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    overflow: 'hidden',
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  setting: {
    position: 'absolute',
    right: 10,
  },
  settingWheel: {
    width: 20,
    height: 20,
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '300',
    color: '#007AFF',
    marginLeft: 10,
    marginRight: 10,
  },
  headingTitle: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    paddingLeft: 20,
  },
  radarStarter: {
    height: 450,
    margin: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',      
  },
  radar: {
    height: 150,
    margin: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',      
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    overflow: 'hidden',
    resizeMode: "contain",
  },
  nearByUser: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  startSearchText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    padding: 20,
    marginTop: 50,
  },
});

const mapStateToProps = (state) => {
  return {
    hasPermissions: state.permission.hasAllRequiredPermissions,
    bluetoothState: state.bluetooth.bluetoothState,
    scannedDevices: state.bluetooth.scannedDevices,
    isUserSearching: state.bluetooth.isUserSearching,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateUserSearchingState: (userSearchState) => dispatch({
      type: UPDATE_USER_SEARCHING_STATE,
      payload: userSearchState,
    })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
