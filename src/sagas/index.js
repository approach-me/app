import { all, fork, call } from 'redux-saga/effects';
import { premissionRequestWatcher } from './permissionSaga'
import { bluetoothBroadcastAndListenerWatcher, bluetoothWatcher, checkInitialBluetoothState } from './bluetoothSaga'
import { lasnWatcher, startConnectionListener } from './lasnSaga';

function* runtimeSaga() {
  console.log('running runtime saga')
  yield all([
    call(checkInitialBluetoothState)
  ])
}


export function* rootSaga() {
  yield all([
    fork(runtimeSaga),
    fork(startConnectionListener),
    fork(bluetoothBroadcastAndListenerWatcher),
    fork(premissionRequestWatcher),
    fork(bluetoothWatcher),
    fork(lasnWatcher),
  ]);
};
