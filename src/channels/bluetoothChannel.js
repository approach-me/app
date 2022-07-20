import { eventChannel } from 'redux-saga';
import { BLUETOOTH_EVENT_TYPES, ChannelEvent } from '../events';

export const createBluetoothChannel = (bleManager) => eventChannel((emit) => {
  const deviceBluetoothStateChangeHanndler = (payload) => {
    const bluetoothEvent = new ChannelEvent(BLUETOOTH_EVENT_TYPES.DEVICE_BLUETOOTH_STATE_CHANGED, payload);
    emit(bluetoothEvent);
  };

  bleManager.onStateChange((state) => deviceBluetoothStateChangeHanndler(state));

  const unsubscribe = () => {
    bleManager.destroy();
  };

  return unsubscribe;
});
