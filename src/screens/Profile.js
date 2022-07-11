import React, { useState } from "react";
import { Text } from "react-native";

const Profile = () => {
    const [titleText, setTitleText] = useState("Bird's Nest");
    const bodyText = "This is not really a bird nest.";

    const onPressTitle = () => {
        setTitleText("Bird's Nest [pressed]");
    };

    return (
        <Text>
        <Text onPress={onPressTitle}>
            {titleText}
            {"\n"}
            {"\n"}
        </Text>
        <Text numberOfLines={5}>{bodyText}</Text>
        </Text>
    );
};


export default Profile;