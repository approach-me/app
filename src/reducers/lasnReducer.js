import { DISCONNECTED_SUCCESFULLY, CONNECTION_CREATED_SUCCESFULLY, LASN_CONNECTED_SUCCESSFULLY, LASN_DISCONNECTED_SUCCESSFULLY, UPDATE_NEARBY_USER_LIST } from '../actions/lasnActions';

const initialState = {
  isConnected: false,
  isLasnConnected: false,
  nearbyUserList: [],
  userId: '1', // TODO update later so it isn't hardcoded!
  deviceId: 'device_id_change_later',
};

const lasnReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISCONNECTED_SUCCESFULLY: {
      return {
        ...state,
        isConnected: false
      }
    }
    case LASN_CONNECTED_SUCCESSFULLY: {
      return {
        ...state,
        isLasnConnected: true
      }
    }
    case LASN_DISCONNECTED_SUCCESSFULLY: {
      return {
        ...state,
        isLasnConnected: false
      }
    }
    case CONNECTION_CREATED_SUCCESFULLY: {
      return {
        ...state,
        isConnected: true
      }
    }
    case UPDATE_NEARBY_USER_LIST: {
      return { 
        ...state,
        nearbyUserList: [...action.payload]
      }
    }
    default: {
      return state;
    }
  }
};

// Exports
export default lasnReducer;
