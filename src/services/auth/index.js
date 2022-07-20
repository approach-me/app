import auth from '@react-native-firebase/auth';

export const registerUserService = (email, password) => {
    return auth()
        .createUserWithEmailAndPassword(email, password);
};


