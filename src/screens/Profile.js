import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, Image, ScrollView, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { REQUEST_ALL_PERMISSIONS } from '../actions/permissionActions'
import ProfileImage from './components/ProfileImage';
import { UPDATE_USER_SEARCHING_STATE } from '../actions/bluetoothActions';
import firestore from '@react-native-firebase/firestore';
import { Button } from 'react-native-elements';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileEdit from './ProfileEdit';

const Stack = createStackNavigator();

const Counter = ({navigation, route}) => {
  const [userName, setUserName] = useState("firstName LastName")
  const [userBio, setUserBio] = useState("bio")
  const [userInterests, setUserInterests] = useState(["", "", ""])

  const userId = (typeof route.params !== 'undefined') ? route.params.userId : 'oEf6SPn639ChvP70RStD';
  const canEdit = (typeof route.params !== 'undefined') ? route.params.canEdit : true;

  useEffect(() => {
    const subscriber = firestore()
    .collection('users')
    .doc(userId)
    .onSnapshot(documentSnapshot => {
      setUserName(documentSnapshot.data().firstName + " " + documentSnapshot.data().lastName);
      setUserBio(documentSnapshot.data().bio)
      setUserInterests(documentSnapshot.data().interests);
    });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [setUserName, setUserBio, setUserInterests]);

  const goToProfileEdit = () => {
    navigation.push('ProfileEdit')
  }

  const editProfile = () => {
    return (
      <TouchableOpacity style={styles.setting} onPress = {goToProfileEdit}>
          <Image style={styles.settingWheel} source={{uri:'https://pic.onlinewebfonts.com/svg/img_489905.png'}}/>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* Stories */}
        <View>
          {canEdit ? editProfile() : null}
          <View style={styles.topBar}>
            <View style={styles.profileBlock}>
              <View style={styles.profile}>
                <ImageBackground style={styles.profileImage} source={{uri:'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80'}}/>
              </View>
            </View>
            <View style={styles.info}>
              <View style={styles.profileInfo}>
                <View style={styles.infoItems}>
                  <Text style={styles.headingTitle}>450</Text>
                  <Text style={styles.infoName}>score</Text>
                </View>
                <View style={styles.infoItems}>
                  <Text style={styles.headingTitle}>450</Text>
                  <Text style={styles.infoName}>friends</Text>
                </View>
              </View>
            </View>
          </View>
          {/* Bio */}
          <Text style={styles.nameTitle}>{userName}</Text>
          <View>
            <Text style={styles.bioText}>{userBio}</Text>
          </View>

          <Text style={styles.interestTitle}>Interests</Text>
          <View style={styles.interests}>
            <FlatList
              data={[
                {key: userInterests[0]},
                {key: userInterests[1]},
                {key: userInterests[2]},
              ]}
              numColumns={3}
              renderItem={({item}) => <Text style={styles.bioText}>{'\u00B7' + ' '}{item.key}</Text>}
            />
          </View>  
        </View>

        <View style={styles.line} />
        
        <View style={styles.gallery}>
            <FlatList 
              showsHorizontalScrollIndicator={false}
              data={[
                {path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
                {path: 'https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'},
                {path: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'},
                {path: 'https://images.unsplash.com/photo-1455274111113-575d080ce8cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'},
                {path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
                {path: 'https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'},
                {path: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'},
                {path: 'https://images.unsplash.com/photo-1455274111113-575d080ce8cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'},
              ]}
              // renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
              renderItem={({item}) => <ProfileImage path={item.path}></ProfileImage>}
              numColumns={2}
            />
          </View> 
      </ScrollView>
    </SafeAreaView>
   );
}

const styles = StyleSheet.create({
  line:{
    paddingBottom: 5,
    paddingTop: 5,
    borderBottomColor: '#919492',
    borderBottomWidth: StyleSheet.hairlineWidth,
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
    zIndex: 1,
  },
  settingWheel: {
    width: 20,
    height: 20,
  },
  headingTitle: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  infoName: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '300',
    color: '#000000',
  },
  nameTitle: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    paddingLeft: 20,
    paddingTop: 10,
  },
  interestTitle: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    paddingLeft: 20,
    paddingTop: 5,
  },
  bioText: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '300',
    color: '#000000',
    paddingLeft: 25,
    paddingRight: 25,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
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
  profile:{
    width: 100,
    height: 100,
    marginLeft: 10,
  },
  profileInfo: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',  
  },
  infoItems: {
    justifyContent: 'center',
    alignItems: 'center',  
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 20,
  },
  interests: {
    paddingRight: 30,
  },
  profileBlock:{
    justifyContent: 'center',
    alignItems: 'center',  
  },
  gallery: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
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
