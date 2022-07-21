import { BleManager } from 'react-native-ble-plx';
import BLEAdvertiser from 'react-native-ble-advertiser';
import { store } from '../../store/store';
import { DEVICE_SCANED } from '../../actions/bluetoothActions';
import { Buffer } from "buffer";
var TextEncodingShim = require('text-encoding-shim');
var TextEncoder = TextEncodingShim.TextEncoder;
var TextDecoder = TextEncodingShim.TextDecoder;

const COMPANY_ID = 0x4C;
const SERVICE_UUID = '7ef79c92-61c2-4041-b0d1-7ce34616e800';
export const BROADCAST_FREQUENCY = 5000; // in ms, 5 secs

export const createBleManager = () => new BleManager();

export const getBluetoothState = (bleManager) => bleManager.state();

export const convertUserIdToArray = (userId) => {
  const utf8Encode = new TextEncoder('utf-8');
  return Array.from(utf8Encode.encode(userId))
}

export const broadcastBluetoothSignal = (bleAvertiser, userId) => {
  console.log('broadcastBluetoothSignal CALLED!!!!', convertUserIdToArray(userId));
  return bleAvertiser.broadcast(SERVICE_UUID, convertUserIdToArray(userId), {
    advertiseMode: BLEAdvertiser.ADVERTISE_MODE_BALANCED,
    txPowerLevel: BLEAdvertiser.ADVERTISE_TX_POWER_MEDIUM,
    connectable: false,
    includeDeviceName: false,
    includeTxPowerLevel: false,
  });
};

export const stopBroadcastBluetoothSignal = (bleAvertiser) => bleAvertiser.stopBroadcast();

export const createBleAdvertiser = () => {
  BLEAdvertiser.setCompanyId(COMPANY_ID);
  return BLEAdvertiser;
};


const convertManuDataToUserId = (manuData) => {
    const binary_string = Buffer.from(manuData, 'base64').toString()
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    // idx 0 = company id
    // idx 1 = is flags(i think (?))
    // everything else is userId
    const userIdByteArray = bytes.slice(2);
    const utf8Decode = new TextDecoder('utf-8');
    return utf8Decode.decode(userIdByteArray)
}
// can't make a generator because ble library doesn't support it, so have to use store.dispatch!!
export const bluetoothDeviceListener = (error, scannedDevice) => {
  // TODO Later: Handle error
  if (!scannedDevice || !scannedDevice.id) return;
  console.log('SCANNED DEVICE USER ID: ', convertManuDataToUserId(scannedDevice.manufacturerData));

  store.dispatch({
    type: DEVICE_SCANED,
    scannedDevice: {
      name: scannedDevice.name,
      id: convertManuDataToUserId(scannedDevice.manufacturerData),
    },
  });
};

export const startBluetoothScanningService = (bleManager) => {
  // bleManager.startDeviceScan(null, null, bluetoothDeviceListener);
  bleManager.startDeviceScan([SERVICE_UUID], null, bluetoothDeviceListener);
};

export const stopBluetoothScanning = (bleManager) => {
  bleManager.stopDeviceScan();
};
