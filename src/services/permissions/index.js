import { requestMultiple as requestMultiplePermissions, PERMISSIONS } from 'react-native-permissions';

// TODO: ADD IOS SPECFIC PERMS + Test on IOS
export const requestForPermissionService = () => {

    return requestMultiplePermissions([
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, 
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT, 
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN, 
        PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION
    ])
}
