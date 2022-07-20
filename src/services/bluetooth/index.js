import { BleManager } from 'react-native-ble-plx';
import BLEAdvertiser from 'react-native-ble-advertiser';
import { store } from '../../store/store';
import { DEVICE_SCANED } from '../../actions/bluetoothActions';

const COMPANY_ID = 0x4C;
const SERVICE_UUID = '7ef79c92-61c2-4041-b0d1-7ce34616e800';
export const BROADCAST_FREQUENCY = 5000; // in ms, 5 secs

export const createBleManager = () => new BleManager();

export const getBluetoothState = (bleManager) => bleManager.state();

export const broadcastBluetoothSignal = (bleAvertiser) => {
  console.log('broadcastBluetoothSignal CALLED!!!!');
  return bleAvertiser.broadcast(SERVICE_UUID, [], {
    advertiseMode: BLEAdvertiser.ADVERTISE_MODE_BALANCED,
    txPowerLevel: BLEAdvertiser.ADVERTISE_TX_POWER_MEDIUM,
    connectable: false,
    includeDeviceName: true,
    includeTxPowerLevel: false,
  });
};

export const stopBroadcastBluetoothSignal = (bleAvertiser) => bleAvertiser.stopBroadcast();

export const createBleAdvertiser = () => {
  BLEAdvertiser.setCompanyId(COMPANY_ID);
  return BLEAdvertiser;
};

// can't make a generator because ble library doesn't support it, so have to use store.dispatch!!
export const bluetoothDeviceListener = (error, scannedDevice) => {
  // TODO Later: Handle error
  if (!scannedDevice || !scannedDevice.id) return;
  store.dispatch({
    type: DEVICE_SCANED,
    scannedDevice: {
      name: scannedDevice.name,
      id: scannedDevice.id,
    },
  });
};

export const startBluetoothScanningService = (bleManager) => {
  bleManager.startDeviceScan(null, null, bluetoothDeviceListener);
  // bleManager.startDeviceScan([SERVICE_UUID], null, bluetoothDeviceListener);
};

export const stopBluetoothScanning = (bleManager) => {
  bleManager.stopDeviceScan();
};
