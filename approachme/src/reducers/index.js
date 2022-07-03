import { combineReducers } from 'redux';

import permissionReducer from './permissionReducer'
import bluetoothReducer from './bluetoothReducer';

const rootReducer = combineReducers({
  permission: permissionReducer,
  bluetooth: bluetoothReducer
});

export default rootReducer;