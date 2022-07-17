import React from 'react'
import { StyleSheet, Text, View, ImageBackground} from 'react-native';

const UserCard = (props) => {
    return (
        <View style={styles.story}>
            <ImageBackground style={styles.storyImage} source={{uri:props.path}}>
                <Text style={styles.storyName}>{props.name}, {props.age}</Text>
            </ImageBackground>
        </View> 
    )
}

const styles = StyleSheet.create({
    story: {
        width: '50%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        
        borderWidth: 3,
        borderColor: '#FFFFFF',
        borderRadius: 10,
        overflow: 'hidden',
    },
    storyImage: {
        width: '100%',
        height:'100%',
        overflow: 'hidden',
        resizeMode: "contain",
    },
    storyName: {
        fontFamily: 'System',
        fontSize: 12,
        fontWeight: '700',
        color: '#FFFFFF',
        position: 'absolute',
        bottom: 10,
        left: 10,
    },
  });

  export default UserCard;