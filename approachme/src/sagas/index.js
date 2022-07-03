import { all, fork, call } from 'redux-saga/effects';
import { premissionRequestWatcher } from './permissionSaga'
import { bluetoothBroadcastWatcher, bluetoothWatcher, checkInitialBluetoothState } from './bluetoothSaga'

function* runtimeSaga() {
  console.log('running runtime saga')
  yield all([
    call(checkInitialBluetoothState)
  ])
}


export function* rootSaga() {
  yield all([
    fork(runtimeSaga),
    fork(bluetoothBroadcastWatcher),
    fork(premissionRequestWatcher),
    fork(bluetoothWatcher)
  ]);
};
