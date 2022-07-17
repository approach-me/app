import React, {useEffect, useState} from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, ImageBackground, TextInput, Pressable } from 'react-native';
import { connect } from 'react-redux';
import { REQUEST_ALL_PERMISSIONS } from '../actions/permissionActions'
import { UPDATE_USER_SEARCHING_STATE } from '../actions/bluetoothActions';
import { CheckBox } from 'react-native-elements'
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';


const Stack = createStackNavigator();
const Counter = () => {
    const [name, onChangeName] = useState(null);
    const [bio, onChangeBio] = useState(null);
    const [interests, onChangeInterests] = useState(null);
    const [age, setAge] = useState(0);
    const [ageMin, setAgeMin] = useState(0);
    const [ageMax, setAgeMax] = useState(0);
    const [isMaleFilterChecked, setMaleFilterCheck] = useState(false);
    const [isFemaleFilterChecked, setFemaleFilterCheck] = useState(false);
    const [gender, setGender] = useState('Male');

    let changeBio = () => {
      console.log(bio)
      onChangeBio(bio)
      const db = firestore();
      db.collection('users')
                            .doc('oEf6SPn639ChvP70RStD').update({'bio': bio});
    }
    useEffect(() => {
      const subscriber = firestore().collection('users')
      .doc('oEf6SPn639ChvP70RStD')
      .onSnapshot(documentSnapshot => {
        onChangeName(documentSnapshot.data().firstName + " " + documentSnapshot.data().lastName);
        onChangeBio(documentSnapshot.data().bio)
        onChangeInterests(documentSnapshot.data().interests);
        setAge(documentSnapshot.data().age);
        setGender(documentSnapshot.data().gender)
      });
  
      // Stop listening for updates when no longer required
      return () => subscriber();
    }, [ onChangeName, onChangeBio, onChangeInterests, setAge ]);

    const EditNumComponent = ({num, setNum}) => {
      return (
        <>
          <TouchableOpacity onPress={() => setNum(num - 1)}>
            <Image style={styles.minus} source={{uri:'https://cdn-icons-png.flaticon.com/512/43/43625.png'}}/>
          </TouchableOpacity>
          <Text style={styles.ageText}>{num}</Text>
          <TouchableOpacity onPress={() => setNum(num + 1)}>
            <Image style={styles.plus} source={{uri:'https://cdn-icons-png.flaticon.com/512/32/32339.png'}}/>
          </TouchableOpacity>
        </>
      )
    }

    return (
      //<Stack.Screen name="ProfileEdit" component={ProfileEdit}>
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
            {/* Stories */}
                <View>
                    <View style={styles.topProfileImage}>
                        <View style={styles.profileBlock}>
                            <View style={styles.profile}>
                                <ImageBackground style={styles.profileImage} source={{uri:'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80'}}/>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.changeText}>Change Profile Image</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Bio */}
                    <View style={styles.line} />
                    <Text style={styles.nameTitle}>Profile</Text>
                    <View style={styles.inputs}>
                        <Text style={styles.infoType}>Name:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeName={name => onChangeName(name)}
                            value={name}
                            placeholder="Please enter your display name."
                            defaultValue="Lucas Mark"
                        />
                    </View>
                    <View style={styles.inputs}>
                        <Text style={styles.infoType}>Bio:</Text>
                        <TextInput
                            style={styles.inputBox}
                            onChangeBio={onChangeBio}
                            value={bio}
                            placeholder="Please write your bio."
                            defaultValue="Describe who you are in 3 word"
                        />
                    </View>
                    <View style={styles.inputs}>
                        <Text style={styles.infoType}>Gender:</Text>
                        <Text style={styles.input}>{gender}</Text>
                    </View>
                    <View style={styles.inputs}>
                        <Text style={styles.infoType}>Interests:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeInterests={onChangeInterests}
                            value={interests}
                            placeholder="Please write your top 3 interests."
                            defaultValue="Biking, Dancing, Music"
                        />
                    </View>
                    <View style={styles.inputs}>
                        <Text style={styles.infoType}>Age:</Text>
                        <EditNumComponent num={age} setNum={setAge} />
                    </View>
                    <View style={styles.line} />
                    <Text style={styles.nameTitle}>Filters</Text>
                    <View style={styles.inputs}>
                        <Text style={styles.infoType}>Min Age:</Text>
                        <EditNumComponent num={ageMin} setNum={setAgeMin} />
                    </View>
                    <View style={styles.inputs}>
                        <Text style={styles.infoType}>Max Age:</Text>
                        <EditNumComponent num={ageMax} setNum={setAgeMax} />
                    </View>
                    <View style={styles.inputs}>
                        <Text style={styles.infoType}>Gender:</Text>
                        <CheckBox title='Male' checked={isMaleFilterChecked} onPress={() => setMaleFilterCheck(!isMaleFilterChecked)} />
                        <CheckBox title='Female' checked={isFemaleFilterChecked} onPress={() => setFemaleFilterCheck(!isFemaleFilterChecked)} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
       //</Stack.Screen>
    );
}

const styles = StyleSheet.create({
  line:{
    paddingBottom: 5,
    paddingTop: 5,
    borderBottomColor: '#919492',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  topProfileImage: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    width: 30,
    height: 30,
  },
  minus: {
    width: 18,
    height: 18,
    marginRight: 30,
    marginLeft: 30,
  },
  plus: {
    width: 15,
    height: 15,
    marginRight: 30,
    marginLeft: 30,
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
  settingsText: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    paddingRight: 25,
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
  settings: {
    marginTop: 5,
    width: '100%',
  },
  changeText: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '600',
    color: '#3dabff',
    padding: 10, 
  },
  input: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '300',
    padding: 10, 
    marginRight: 20, 
    color: '#000000'
  },
  inputBox: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '300',
    padding: 10,
    height: 50,
    marginRight: 20, 
  },
  inputs: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20, 
  },
  infoType: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    paddingLeft: 25,
    width: 100,
  },
  ageText: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    padding: 10, 
  },
  gender: {
    margin:10,
    marginLeft:20,
    color: '#000000',
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
