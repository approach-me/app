import { DEVICE_SCANED, UPDATE_BLUETOOTH_STATE } from '../actions/bluetoothActions'

const initialState = {
  bluetoothState: false,
  scannedDevices: []
};

const bluetoothReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BLUETOOTH_STATE: {
      return {
        ...state,
        bluetoothState: action.bluetoothState
      }
    }
    case DEVICE_SCANED: {  // temp for testing
      return {
        ...state,
        scannedDevices: [...state.scannedDevices, [action.scannedDevice.name, action.scannedDevice.id]]
      }
    }
    default: {
      return state;
    }
  }
};

// Exports
export default bluetoothReducer;
