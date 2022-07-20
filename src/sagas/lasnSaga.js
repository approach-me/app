import { DEVICE_SCANED, UPDATE_BLUETOOTH_STATE, UPDATE_USER_SEARCHING_STATE } from "../actions/bluetoothActions";
import {
    take, race, put, call, all, select, fork, cancelled, cancel
} from 'redux-saga/effects';
import { selectDeviceBluetoothState, selectUserSearchingState } from "../selectors/bluetoothSelectors";
import { selectIsConnected, selectIsLasnConnected, selectUserId } from "../selectors/lasnSelectors";
import { CONNECTION_CREATED_SUCCESFULLY, DISCONNECTED_SUCCESFULLY, LASN_CONNECTED_SUCCESSFULLY, LASN_DISCONNECTED_SUCCESSFULLY, START_CONNECTION, START_DISCONNECTION, UPDATE_NEARBY_USER_LIST } from "../actions/lasnActions";
import { checkIfUserExistsInNearbyUserList, disconnectFromLasn, filterSelfFromNearbyUsersList, getLasnServiceClient, getLasnStream, linkNearbyUser } from "../services/lasn";
import { createLasnChannel } from "../channels/lasnChannel";
import { LASN_EVENTS } from '../events';
import { State as BLUETOOTH_STATE } from 'react-native-ble-plx';



function* lasnEventHandler(lasnEvent) {
    const userId = yield select(selectUserId);
    switch (lasnEvent.type) {
        case LASN_EVENTS.NEW_USER_FOUND_IN_NETWORK:
            const nearbyUserList = yield call(filterSelfFromNearbyUsersList, userId, lasnEvent.payload)
            yield put({ type: UPDATE_NEARBY_USER_LIST, payload: nearbyUserList })
    }

}

export function* lasnEventListener(lasnServiceClient) {
    console.log('STARTING LASN EVENT LISTENER EVENT!!!');
    const userId = yield select(selectUserId);
    const lasnStream = yield call(getLasnStream, lasnServiceClient, userId);
    const lasnChannel = yield call(createLasnChannel, lasnStream); // create channel
    console.log('CREATED STREAM!!!', lasnStream)
    yield put({ type: LASN_CONNECTED_SUCCESSFULLY });
    console.log('CREATING CHANNEL: ', lasnChannel)
    try {
        while (true) {
            const lasnEvent = yield take(lasnChannel);
            console.log('GOT LASN EVENT', lasnEvent);
            yield call(lasnEventHandler, lasnEvent)
        }
    } finally {
        console.log('!!!lasnEventListener: terminated!!!');
    }
}


export function* linkWatcher(lasnServiceClient) {
    console.log('!!STARTING LINKWATCHER EVENT!!!');
    const seenDeviceIds = []; // this is similar to userNearbyList, but specific to users we sensed via Bluetooth, not one we have metadata for.
    const userId = yield select(selectUserId);
    try {
        while (true) {
            const { scannedDevice } = yield take(DEVICE_SCANED);
            const userAlreadySensed = yield call(checkIfUserExistsInNearbyUserList, scannedDevice.id, seenDeviceIds)
            console.log("SCANNED DEVICE: USER ID: ", scannedDevice.id);

            if (userAlreadySensed) {
                console.log('USER ALREADY SENSED WITH USER ID: ', scannedDevice.id);
            }

            // if (scannedDevice.id == '90:B1:44:89:A9:82' || scannedDevice.id == '90:B1:44:89:A9:83') {
            console.log('FOUND SAMSUNG DEVICE!!!');
            const rsp = yield call(linkNearbyUser, lasnServiceClient, scannedDevice.id, userId);
            seenDeviceIds.push(scannedDevice.id); // only push if success.
            console.log('LINKING USER DONE ID:', scannedDevice.id, rsp, seenDeviceIds);
            // }


        }
    } finally {
        if (yield cancelled()) {
            console.log('CANCELLED: linkWatcher');
        }
    }


}
export function* lasnWatcher() {
    const lasnServiceClient = yield call(getLasnServiceClient);
    const userId = yield select(selectUserId);
    while (true) {
        yield take(START_CONNECTION);
        console.log('lasnWatcher: starting connecting!')
        const linkWatcherTask = yield fork(linkWatcher, lasnServiceClient);
        yield fork(lasnEventListener, lasnServiceClient);
        yield take(START_DISCONNECTION)
        const rsp = yield call(disconnectFromLasn, lasnServiceClient, userId);
        console.log('DISCONNECTED FROM LASN NETWORK!!!!', rsp);
        yield cancel(linkWatcherTask)
        yield put({ type: LASN_DISCONNECTED_SUCCESSFULLY });
    }
}


export function* startConnectionListener() {
    while (true) {
        yield race({
            updatedBluetoothState: take(UPDATE_BLUETOOTH_STATE),
            updatedUserSearchingState: take(UPDATE_USER_SEARCHING_STATE),
        });
        const bluetoothState = yield select(selectDeviceBluetoothState);
        const isUserSearching = yield select(selectUserSearchingState);
        const isConnected = yield select(selectIsConnected);
        const isLasnConnected = yield select(selectIsLasnConnected);
        // todo: Handle case where LASN looses connection. Should be very unlikely
        const startConnection = !isConnected && bluetoothState == BLUETOOTH_STATE.PoweredOn && isUserSearching
        const stopConnection = isConnected && (bluetoothState != BLUETOOTH_STATE.PoweredOn || !isUserSearching)
        if (startConnection) {
            console.log('STARTING CONNECTING!!!!!')
            yield put({ type: START_CONNECTION });
            yield put({ type: CONNECTION_CREATED_SUCCESFULLY }); // temp, need to actually check everything is running before calling this
        }
        if (stopConnection) {
            console.log('STARTING DISCONNECTING!!!!!')
            // call disconnect service here
            yield put({ type: START_DISCONNECTION });
            yield put({ type: DISCONNECTED_SUCCESFULLY }); // temp, need to actually check everything was teared down before calling this
        }
    }
}


