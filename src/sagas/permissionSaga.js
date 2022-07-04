import { REQUEST_ALL_PERMISSIONS, ALL_PERMISSIONS_GRANTED } from '../actions/permissionActions'
import { requestForPermissionService } from '../services/permissions'
import { takeEvery, call, put } from 'redux-saga/effects';
import { RESULTS as PERMISSION_RESULT } from 'react-native-permissions';


const areAllPermissionsGranted = (permissionStatuses) => {
    for (const permission in permissionStatuses) {
        const status = permissionStatuses[permission];
        if (status == PERMISSION_RESULT.BLOCKED || status == PERMISSION_RESULT.DENIED) return false
    }
    return true;
}

function* requestPermission() {
    console.log('!!!REQUEST FOR PREMISSION RECIEVED!!!!');
    const permissionStatus = yield call(requestForPermissionService);
    console.log(permissionStatus)
    const allPremissionsGranted = areAllPermissionsGranted(permissionStatus)

    if (allPremissionsGranted) {
        console.log('putting all perms granted')
        yield put({ type: ALL_PERMISSIONS_GRANTED });
    } else {
        yield put({ type: ALL_PERMISSIONS_NOT_GRANTED})
    }
}

export function* premissionRequestWatcher() {
    // // Take Every Action
    yield takeEvery(REQUEST_ALL_PERMISSIONS, requestPermission);
}
