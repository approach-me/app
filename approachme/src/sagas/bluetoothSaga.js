import { take, call, put, select, cancelled, cancel, delay, fork } from 'redux-saga/effects';
import { createBluetoothChannel } from '../channels/bluetoothChannel'
import { broadcastBluetoothSignal, createBleAdvertiser, createBleManager, getBluetoothState, stopBroadcastBluetoothSignal, BROADCAST_FREQUENCY, startBluetoothScanningService, bluetoothDeviceListener, stopBluetoothScanning } from '../services/bluetooth'
import { BLUETOOTH_EVENT_TYPES } from '../events'
import { DEVICED_SCANED, UPDATE_BLUETOOTH_STATE } from '../actions/bluetoothActions'
import { selectDeviceBluetoothState } from '../selectors/bluetoothSelectors';
import { State as BLUETOOTH_STATE } from 'react-native-ble-plx';


// not rlly needed, remove later...
function* bluetoothEventHandler(event) {
    switch (event.type) {
        case BLUETOOTH_EVENT_TYPES.DEVICE_BLUETOOTH_STATE_CHANGED: {
            yield put({ type: UPDATE_BLUETOOTH_STATE, bluetoothState: event.payload });
            break
        }
        case BLUETOOTH_EVENT_TYPES.SENSED_NEARBY_USER: {
            break
        }
        default: {
            break
        }
    }
}

export function* checkInitialBluetoothState() {
    console.log('checkInitialBluetoothState')
    const bleManager = yield call(createBleManager); // not expensive to create another ble manager, so its better to create another instead of whole middleware
    const bluetoothState = yield call(getBluetoothState, bleManager)
    yield put({ type: UPDATE_BLUETOOTH_STATE, bluetoothState: bluetoothState });
}

export function* bluetoothWatcher() {
    const bleManager = yield call(createBleManager);
    const bluetoothChannel = yield call(createBluetoothChannel, bleManager);

    while (true) {
        const bluetoothPayload = yield take(bluetoothChannel);
        yield call(bluetoothEventHandler, bluetoothPayload);
    }
}

export function* bluetoothScanner(bleManager) {
    try {
        console.log('STARTING BLUETOOTH SCANNER TASK!!!')
        yield call(startBluetoothScanningService, bleManager) // start scanning first
        // now listen for device scanned events
        console.log('SCANNING IN PROGESS!!!')
        while (true) {
            yield take(DEVICED_SCANED);
            // do some logic to connect to websockets here.
        }
    } finally {
        if (yield cancelled()) {
            console.log('CANCELLED: bluetoothScanner');
            yield call(stopBluetoothScanning, bleManager);
        }
    }
}

export function* bluetoothBroadcaster(bleAvertiser) {
    try {
        while (true) {
            const broadcastResult = yield call(broadcastBluetoothSignal, bleAvertiser);
            console.log('broadcastResult', broadcastResult)
            yield delay(BROADCAST_FREQUENCY);
            const stopBroadcastResult = yield call(stopBroadcastBluetoothSignal, bleAvertiser); // need to stop to be able to broadcast again.
            console.log('BROADCAST RESULT', broadcastResult, stopBroadcastResult);
        }
    }
    finally {
        if (yield cancelled()) {
            console.log('CANCELLED: bluetoothBroadcaster');
        }
    }
}



export function* bluetoothBroadcastWatcher() {
    let broadcasterTask, scannerTask;
    const bleAvertiser = yield call(createBleAdvertiser);
    const bleManager = yield call(createBleManager);

    // TODO: also check for permissions here
    const oldBluetoothState = yield select(selectDeviceBluetoothState)
    if (oldBluetoothState == BLUETOOTH_STATE.PoweredOn) {
        broadcasterTask = yield fork(bluetoothBroadcaster, bleAvertiser);
        scannerTask = yield fork(bluetoothScanner, bleManager);
    }

    while (true) {
        yield take(UPDATE_BLUETOOTH_STATE);
        const bluetoothState = yield select(selectDeviceBluetoothState);
        if (bluetoothState == BLUETOOTH_STATE.PoweredOn) {
            if (broadcasterTask) continue;
            console.log('STARTING BLUETOOTH BROADCASTER!!!');
            broadcasterTask = yield fork(bluetoothBroadcaster, bleAvertiser);
            scannerTask = yield fork(bluetoothScanner, bleManager);
        } else if (broadcasterTask) { // need to kill both broadcast  + scanner task, only check 1 since both have same logic.
            yield cancel(broadcasterTask);
            yield cancel(scannerTask)
            broadcasterTask = null;
            scannerTask = null;
        }
    }
}
