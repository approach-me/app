import { REGISTER_USER } from '../actions/authActions';

const initialState = {
    isLoggedIn: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER: {
      return {
        ...state,
        bluetoothState: action.bluetoothState
      }
    }
    default: {
      return state;
    }
  }
};

// Exports
export default authReducer;
