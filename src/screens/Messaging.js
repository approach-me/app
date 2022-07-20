import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, View,  Icon  } from 'react-native';
import { connect } from 'react-redux';
// import { REQUEST_ALL_PERMISSIONS } from '../actions/permissionActions'
import { UPDATE_USER_SEARCHING_STATE } from '../actions/bluetoothActions';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import database from '@react-native-firebase/database';

const Counter = (props) => {
  console.log(props.route);
  let {userName, userID} = props.route.params;
  console.log(userName);
  console.log(userID);
  const [messages, setMessages] = useState([]);
  const [messageGroupId, setMessageGroupId] = useState('null');

  const user1Name = "Samr";
  const user1Id = 1;
  const user2Name = userName;
  const user2Id = userID;
  const user2Path = 'https://images.unsplash.com/photo-1455274111113-575d080ce8cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60';

  //creates a new messaging group if there isnt one created before
  const onLogin = async () => {
    try {
      // check if users have a pre existing group chat
      const group = Math.min(user1Id, user2Id) + "-" + Math.max(user1Id, user2Id);
      const messageGroup = await findMessageGroupId(group);
      // console.log(messageGroup.val());

      if (messageGroup.val()) {
        setMessageGroupId(group);
      } else {
        database().ref('messageGroups/').child(`${group}`).set({
          userName1: user1Name,
          userID1: user1Id,
          userName2: user2Name,
          userID2: user2Id,
          // messages: { 0: {createdAt: 0, sender: 1, text: "test"}},
        })
        .then(() => console.log('Data set.'));
        setMessageGroupId(group);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const findMessageGroupId = async group => {
    const groupId = database().ref(`messageGroups/${group}`).once('value');

    return groupId;
  };

  onLogin();

  useEffect( () => {
    const loadData = async () => {
      const myChatroom = await fetchMessages();

      // console.log(myChatroom.val().messages);

      setMessages(renderMessages(myChatroom.val().messages));
    };

    loadData();
    
    database()
    .ref(`messageGroups/${messageGroupId}`)
    .on('value', snapshot => {
      const data = snapshot.val();
      console.log(data);
      if (data){
        setMessages(renderMessages(data.messages));
      }
    });
  }, [fetchMessages, renderMessages, messageGroupId]);

  
  const fetchMessages = useCallback(async () => {
    const messages = await database().ref(`messageGroups/${messageGroupId}`).once('value');

    return messages;
  }, [messageGroupId]);

  const renderMessages = useCallback( (msgs) => {
    if (!msgs){
      return [];
    }

    let renderedMessage = [];

    let counter = 0;

    for (let msg of msgs) {
      // console.log(msg) ;

      let msgObject = {
        _id: counter,
        text: msg.text,
        createdAt: msg.createdAt,
        user: {
          _id: msg.sender == user1Id ? user2Id : user1Id,
          name: msg.sender == user1Id ? user2Name : user1Name,
          avatar: user2Path,
        }
      }
      renderedMessage.unshift(msgObject);
      counter++;
    }

    return renderedMessage;
  },[
    // myData.avatar,
    // myData.username,
    // selectedUser.avatar,
    // selectedUser.username,
    messageGroupId
  ],
  );

  const onSend = useCallback(async (msg = []) => {

    const myChatroom = await fetchMessages();

    const lastMessages = myChatroom.val().messages || [];

    database().ref(`messageGroups/${messageGroupId}`).update({
      messages: [
        ...lastMessages,
        {
          text: msg[0].text,
          sender: user1Id,
          createdAt: Date.now(),
        },
      ],
    }).then(() => console.log('Comment Created.'));

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, [fetchMessages, messageGroupId]);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1, marginTop: -45 }}>
      <GiftedChat
        style={styles.container}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user2Id,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        // renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        backgroundColor='white'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
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
