import React from 'react'
import { StyleSheet, Text, ImageBackground, View } from 'react-native';

const Message = (props) => {

    const FromMessasge = () => {
        return (
            <View style={styles.messageFrom}>
                <View style={styles.messageImage}>
                    <ImageBackground style={styles.profileImage} source={{uri:props.path}}/>
                </View>
                <View style={styles.messageFromText}>
                    <View style={styles.messageTitle}>
                    </View>
                    <Text style={styles.readMessage}>{props.lastMessage}</Text>
                </View> 
            </View>
        )
    };

    const ToMessasge = () => {
        return (
            <View style={styles.messageTo}>
                <View style={styles.messageToText}>
                    <View style={styles.messageTitle}>
                    </View>
                    <Text style={styles.readMessage}>{props.lastMessage}</Text>
                </View> 
            </View>
        )
    };
    
    return (
        <View>
            { props.writer ? ToMessasge() : FromMessasge()} 
        </View>
    )
}

const styles = StyleSheet.create({
    messageTitle: {
        display: 'flex',
        flexDirection: 'row',
    },
    readMessage: {
        overflow: 'hidden',
        color: '#000000',
    },
    unreadMessage: {
        marginTop: 10,
        overflow: 'hidden',
        paddingRight: 10,
        color: '#000000',
    },
    messageFromText: {
        width: '100%',
        margin: 10,
        marginBottom: 0,
        backgroundColor: '#e3e3e3',
        borderRadius: 5,
        padding: 5,
        // display: 'flex',
        // flexDirection: 'row',
    },
    messageToText: {
        width: '100%',
        margin: 10,
        marginBottom: 0,
        backgroundColor: '#61e2ff',
        borderRadius: 5,
        padding: 5,
        // display: 'flex',
        // flexDirection: 'row',
    },
    messageFrom: {
        width: '80%',
        // justifyContent: 'center',
        alignItems: 'flex-end',
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    messageTo: {
        width: '80%',
        // justifyContent: 'center',
        alignItems: 'flex-end',
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '15%',
    },
    messageImage: {
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        marginBottom: 0,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
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

export default Message ;