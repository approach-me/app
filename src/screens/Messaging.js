import React, {useState} from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, Image, ScrollView, ImageBackground, TextInput, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { REQUEST_ALL_PERMISSIONS } from '../actions/permissionActions'
import Message from './components/Message';
import { UPDATE_USER_SEARCHING_STATE } from '../actions/bluetoothActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';

const Counter = () => {
  const [message, onChangemessage] = useState(null);
  const orderedMessages = [
    { key: 1, writer: true, name: 'Jawad Ali', lastMessage: 'Testing last message, what up, Testing last message, what up, what up, Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' },
    { key: 2, writer: true, name: 'Sultan Em', lastMessage: 'Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' },
    { key: 3, writer: false, name: 'Lucas Mark', lastMessage: 'Testing last message, what up, what up, Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' },
    { key: 4, writer: false, name: 'Jawad Ali', lastMessage: 'Testing last message, what up, what up, Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' },
    { key: 5, writer: true, name: 'Lucas Mark', lastMessage: 'Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' },
    { key: 6, writer: false, name: 'Jawad Ali', lastMessage: 'Testing last message, what up, what up, Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' },
    { key: 7, writer: false, name: 'Lucas Mark', lastMessage: 'Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' },
    { key: 8, writer: false, name: 'Sultan Em', lastMessage: 'Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' },
    { key: 9, writer: true, name: 'Jawad Ali', lastMessage: 'Testing last message, what up, Testing last message, what up, what up, Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' },
    { key: 10, writer: true, name: 'Sultan Em', lastMessage: 'Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' },
    { key: 11, writer: false, name: 'Lucas Mark', lastMessage: 'Testing last message, what up, what up, Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' },
    { key: 12, writer: false, name: 'Jawad Ali', lastMessage: 'Testing last message, what up, what up, Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' },
    { key: 13, writer: true, name: 'Lucas Mark', lastMessage: 'Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' },
    { key: 14, writer: false, name: 'Jawad Ali', lastMessage: 'Testing last message, what up, what up, Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' },
    { key: 15, writer: false, name: 'Lucas Mark', lastMessage: 'Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' },
  ];
  const messagesList = orderedMessages.map((item) => <Message key={item.key} writer={item.writer} name={item.name} lastMessage={item.lastMessage} path={item.path}></Message>);

  const authh = () => {
      auth()
    .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
  }

  return (
    <SafeAreaView>
      <View style={styles.topBar}>
        <View>
          <TouchableOpacity onPress={ () => authh()}>
            <Image style={styles.backArrow} source={{ uri: 'https://cdn.iconscout.com/icon/free/png-256/back-arrow-1767523-1502427.png' }} />
          </TouchableOpacity>
        </View>
        <View style={styles.profile}>
          <ImageBackground style={styles.profileImage} source={{ uri: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80' }} />
        </View>
        <Text style={styles.headingTitle}>Jawad Ali</Text>
      </View>
      <View style={styles.line} />
      <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={60}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container} ref={ref => { this.scrollView = ref }} onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}>
        <View>
          {messagesList}
        </View>
      </ScrollView>
      {/* <View style={styles.line} /> */}
      <View style={styles.messageInput}>
        <TextInput
          multiline
          style={styles.input}
          onChangemessagee={message => onChangemessage(message)}
          value={message}
          placeholder="Aa"
        />
        <Image style={styles.sendIcon} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/736/736212.png' }} />
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  line: {
    paddingBottom: 5,
    paddingTop: 5,
    borderBottomColor: '#919492',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {
    overflow: 'hidden',
    height: '87%',
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  backArrow: {
    width: 30,
    height: 30,
  },
  headingTitle: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    margin: 5,
  },
  pageTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
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
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    resizeMode: "contain",
  },
  profile: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  gallery: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  input: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '300',
    margin: 10,
    height: 40,
    width: '80%',
    backgroundColor: '#d4d4d4',
    borderColor: 'black',
    borderRadius: 20,
    borderWidth: 2,
    padding: 10,
  },
  messageInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  sendIcon: {
    width: 30,
    height: 30,
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
