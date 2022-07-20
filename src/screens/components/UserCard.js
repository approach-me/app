import React from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserCard = (props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.story}>
            <TouchableOpacity style={styles.storyImage} onPress = {() => {
\                navigation.navigate('Profile', {
                    userId: props.userId,
                    canEdit: false
                })
            } }>
                <ImageBackground style={styles.storyImage} source={{uri:props.path}}>
                    <Text style={styles.storyName}>{props.name}, {props.age}</Text>
                </ImageBackground>
            </TouchableOpacity>
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