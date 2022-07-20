import React from 'react'
import { StyleSheet, Text, ImageBackground, View } from 'react-native';

const MessageCard = (props) => {
    return (
        <View style={styles.message}>
            <View style={styles.messageImage}>
                <ImageBackground style={styles.profileImage} source={{uri:props.path}}/>
            </View>
            <View style={styles.messageText}>
                <View style={styles.messageTitle}>
                    <Text style={styles.profileName}>{props.name}</Text>
                    {/* <View style={styles.unreadStatus}></View> */}
                </View>
                <Text numberOfLines={1} style={styles.readMessage}>{props.lastMessage}</Text>
            </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    messageTitle: {
        display: 'flex',
        flexDirection: 'row',
    },
    unreadStatus: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#00d0ff',
        marginTop: 10,
        marginLeft: 10,
    },
    readMessage: {
        marginTop: 10,
        overflow: 'hidden',
        paddingRight: 10,
        color: '#949494',
    },
    unreadMessage: {
        marginTop: 10,
        overflow: 'hidden',
        paddingRight: 10,
        color: '#000000',
    },
    messageText: {
        height: 80,
        margin: 10,
        // display: 'flex',
        // flexDirection: 'row',
    },
    message: {
        width: '80%',
        height: 80,
        // justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    messageImage: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 35,
        overflow: 'hidden',
        resizeMode: "contain",
    },
    profileName: {
        fontFamily: 'System',
        fontSize: 15,
        fontWeight: '700',
        color: '#000000',
        marginTop: 10,
    },
  });

export default MessageCard ;