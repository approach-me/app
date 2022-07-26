/* eslint-disable max-len */
import {
  take, call, put, select, cancelled, cancel, delay, fork, race,
} from 'redux-saga/effects';
import { createBluetoothChannel } from '../channels/bluetoothChannel';
import {
  broadcastBluetoothSignal, createBleAdvertiser, createBleManager, getBluetoothState, stopBroadcastBluetoothSignal, BROADCAST_FREQUENCY, startBluetoothScanningService, stopBluetoothScanning,
} from '../services/bluetooth';
import { BLUETOOTH_EVENT_TYPES } from '../events';
import { DEVICE_SCANED, SUCCESSFULLY_STARTED_BLUETOOTH_SEQ, SUCCESSFULLY_STOPPED_BLUETOOTH_SEQ, UPDATE_BLUETOOTH_STATE, UPDATE_USER_SEARCHING_STATE } from '../actions/bluetoothActions';
import { selectDeviceBluetoothState, selectUserSearchingState } from '../selectors/bluetoothSelectors';
import { START_CONNECTION, START_DISCONNECTION } from '../actions/lasnActions';
import { linkNearbyUser } from '../services/lasn';
import { selectUserId } from '../selectors/lasnSelectors';

// not rlly needed, remove later...
function* bluetoothEventHandler(event) {
  switch (event.type) {
    case BLUETOOTH_EVENT_TYPES.DEVICE_BLUETOOTH_STATE_CHANGED: {
      yield put({ type: UPDATE_BLUETOOTH_STATE, bluetoothState: event.payload });
      break;
    }
    case BLUETOOTH_EVENT_TYPES.SENSED_NEARBY_USER: {
      break;
    }
    default: {
      break;
    }
  }
}

export function* checkInitialBluetoothState() {
  console.log('checkInitialBluetoothState');
  const bleManager = yield call(createBleManager); // not expensive to create another ble manager, so its better to create another instead of whole middleware
  const bluetoothState = yield call(getBluetoothState, bleManager);
  yield put({ type: UPDATE_BLUETOOTH_STATE, bluetoothState });
}

// watch changes in Bluetooth State
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
    console.log('STARTING BLUETOOTH SCANNER TASK!!!');
    yield call(startBluetoothScanningService, bleManager); // start scanning first
    // now listen for device scanned events
    console.log('SCANNING IN PROGESS!!!');
    while (true) {
      yield take(DEVICE_SCANED); // used this to block so saga doesn't end prematurely  
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
    const userId = yield select(selectUserId);
    console.log('STARTING BLUETOOTH BroadCaster TASK!!!');
    while (true) {
      const broadcastResult = yield call(broadcastBluetoothSignal, bleAvertiser, userId);
      console.log('broadcastResult', broadcastResult);
      yield delay(BROADCAST_FREQUENCY);
      const stopBroadcastResult = yield call(stopBroadcastBluetoothSignal, bleAvertiser); // need to stop to be able to broadcast again.
      console.log('BROADCAST RESULT', broadcastResult, stopBroadcastResult);
    }
  } finally {
    if (yield cancelled()) {
      console.log('CANCELLED: bluetoothBroadcaster');
      const stopBroadcastResult = yield call(stopBroadcastBluetoothSignal, bleAvertiser);
      console.log('BROADCAST STOPPED!!!', stopBroadcastResult);

    }
  }
}


// can't fork since attached to parent will never end
export function* startBluetoothSeq(bleAvertiser, bleManager) {
  try {
    yield fork(bluetoothBroadcaster, bleAvertiser);
    yield fork(bluetoothScanner, bleManager);
  } finally {
    console.log('startBluetoothSeq - Ended!');
  }

}


export function* stopBluetoothSeq(startBluetoothTask) {
  yield cancel(startBluetoothTask);
}


export function* bluetoothBroadcastAndListenerWatcher() {
  let startBluetoothTask;
  const bleAvertiser = yield call(createBleAdvertiser);
  const bleManager = yield call(createBleManager);
  while (true) {
    // connection seq
    yield take(START_CONNECTION);
    if (startBluetoothTask) continue; // double check if we should be calling success connect here....
    console.log('TEST', bleAvertiser, bleManager)
    startBluetoothTask = yield fork(startBluetoothSeq, bleAvertiser, bleManager);
    console.log('BLUETOOTH SAGA HERE!!!')
    yield put({type: SUCCESSFULLY_STARTED_BLUETOOTH_SEQ}) // TODO: error checking
    // disconnection seq
    yield take(START_DISCONNECTION);
    console.log('bluetoothBroadcastAndListenerWatcher DISCONNECTING!!!!')
    if (!startBluetoothTask) continue; // double check if we should be calling success disconnect here....
    yield call(stopBluetoothSeq, startBluetoothTask);
    yield put({type: SUCCESSFULLY_STOPPED_BLUETOOTH_SEQ}) // TODO: error checking 
    startBluetoothTask = null;
  }
}

