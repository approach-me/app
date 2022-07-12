import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, Image, ScrollView, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { REQUEST_ALL_PERMISSIONS } from '../actions/permissionActions'
import MessageCard from './components/MessageCard';
import { UPDATE_USER_SEARCHING_STATE } from '../actions/bluetoothActions';

const Counter = () => {
    const orderedMessages = [
        {name: 'Jawad Ali', lastMessage: 'Testing last message, what up, Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
        {name: 'Sultan Em', lastMessage: 'Testing last message, what up', path: 'https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'},
        {name: 'Lucas Mark', lastMessage: 'Testing last message, what up', path: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'},
        {name: 'Jawad Ali', lastMessage: 'Testing last message, what up', path: 'https://images.unsplash.com/photo-1455274111113-575d080ce8cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'},
        {name: 'Lucas Mark', lastMessage: 'Testing last message, what up', path: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'},
        {name: 'Jawad Ali', lastMessage: 'Testing last message, what up', path: 'https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'},
        {name: 'Lucas Mark', lastMessage: 'Testing last message, what up', path: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'},
        {name: 'Sultan Em', lastMessage: 'Testing last message, what up', path: 'https://images.unsplash.com/photo-1455274111113-575d080ce8cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'},
    ];
    const messagesList = orderedMessages.map( (item) => <TouchableOpacity onPress={() => console.log(item.name)}><MessageCard name={item.name} lastMessage={item.lastMessage} path={item.path}></MessageCard></TouchableOpacity>);

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            {/* Stories */}
                <View>
                    <View style={styles.topBar}>
                        <View>
                            <TouchableOpacity>
                                <Image style={styles.backArrow}  source={{uri:'https://cdn.iconscout.com/icon/free/png-256/back-arrow-1767523-1502427.png'}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.pageTitle}>
                            <Text style={styles.headingTitle}>Lucas Mark</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.line} />
                <View>
                    {messagesList}
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
  backArrow: {
    width: 30,
    height: 30,
  },
  headingTitle: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
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
