import React from 'react'
import { StyleSheet, Text, ImageBackground, View } from 'react-native';

const Story = (props) => {
    return (
        <View style={styles.story}>
            <ImageBackground style={styles.storyImage} source={{uri:props.path}}/>
            <Text style={styles.storyName}>{props.name}</Text>
        </View> 
    )
}

const styles = StyleSheet.create({
    story: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    storyImage: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#73faf8',
        overflow: 'hidden',
        resizeMode: "contain",
    },
    storyName: {
        fontFamily: 'System',
        fontSize: 12,
        fontWeight: '700',
        color: '#000000',

    },
  });

export{Story};