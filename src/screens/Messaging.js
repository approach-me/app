import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, Image, ScrollView, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { REQUEST_ALL_PERMISSIONS } from '../actions/permissionActions'
import Message from './components/Message';
import { UPDATE_USER_SEARCHING_STATE } from '../actions/bluetoothActions';

const Counter = () => {
    const orderedMessages = [
        {key: 1, writer: true, name: 'Jawad Ali', lastMessage: 'Testing last message, what up, Testing last message, what up, what up, Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
        {key: 2, writer: true, name: 'Sultan Em', lastMessage: 'Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
        {key: 3, writer: false, name: 'Lucas Mark', lastMessage: 'Testing last message, what up, what up, Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
        {key: 4, writer: false, name: 'Jawad Ali', lastMessage: 'Testing last message, what up, what up, Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
        {key: 5, writer: true, name: 'Lucas Mark', lastMessage: 'Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
        {key: 6, writer: false, name: 'Jawad Ali', lastMessage: 'Testing last message, what up, what up, Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
        {key: 7, writer: false, name: 'Lucas Mark', lastMessage: 'Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
        {key: 8, writer: false, name: 'Sultan Em', lastMessage: 'Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
        {key: 9, writer: true, name: 'Jawad Ali', lastMessage: 'Testing last message, what up, Testing last message, what up, what up, Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
        {key: 10, writer: true, name: 'Sultan Em', lastMessage: 'Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
        {key: 11, writer: false, name: 'Lucas Mark', lastMessage: 'Testing last message, what up, what up, Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
        {key: 12, writer: false, name: 'Jawad Ali', lastMessage: 'Testing last message, what up, what up, Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
        {key: 13, writer: true, name: 'Lucas Mark', lastMessage: 'Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
        {key: 14, writer: false, name: 'Jawad Ali', lastMessage: 'Testing last message, what up, what up, Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
        {key: 15, writer: false, name: 'Lucas Mark', lastMessage: 'Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
        
    ];
    const messagesList = orderedMessages.map( (item) => <Message key={item.key} writer={item.writer} name={item.name} lastMessage={item.lastMessage} path={item.path}></Message>);

    return (
        <SafeAreaView>
            <View style={styles.topBar}>
                <View>
                    <TouchableOpacity>
                        <Image style={styles.backArrow}  source={{uri:'https://cdn.iconscout.com/icon/free/png-256/back-arrow-1767523-1502427.png'}}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.profile}>
                    <ImageBackground style={styles.profileImage} source={{uri:'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80'}}/>
                </View>
                <Text style={styles.headingTitle}>Jawad Ali</Text>
            </View>
            <View style={styles.line} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View>
                    {messagesList}
                </View>
            </ScrollView>
            <View style={styles.line} />
            <View style={styles.messageBar}>
                <View>
                    <TouchableOpacity>
                        <Image style={styles.backArrow}  source={{uri:'https://cdn.iconscout.com/icon/free/png-256/back-arrow-1767523-1502427.png'}}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.profile}>
                    <ImageBackground style={styles.profileImage} source={{uri:'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80'}}/>
                </View>
                <Text style={styles.headingTitle}>Jawad Ali</Text>
            </View>
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
  messageBar: {
    height: 100,
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
  profile:{
    width: 30,
    height: 30,
    marginLeft: 10,
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
