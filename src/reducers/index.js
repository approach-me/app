import { combineReducers } from 'redux';

import permissionReducer from './permissionReducer'
import bluetoothReducer from './bluetoothReducer';
import lasnReducer from './lasnReducer';

const rootReducer = combineReducers({
  permission: permissionReducer,
  bluetooth: bluetoothReducer,
  lasn: lasnReducer,
});

export default rootReducer;
