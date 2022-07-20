import React from 'react'
import { StyleSheet, View, ImageBackground} from 'react-native';

const ProfileImage = (props) => {
    return (
        <View style={styles.story}>
            <ImageBackground style={styles.storyImage} source={{uri:props.path}}>
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
  });

  export default ProfileImage;