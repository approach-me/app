import { ALL_PERMISSIONS_GRANTED, ALL_PERMISSIONS_NOT_GRANTED } from '../actions/permissionActions'

const initialState = {
  hasAllRequiredPermissions: false
};

const permissionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_PERMISSIONS_GRANTED: {
      return {
        ...state,
        hasAllRequiredPermissions: true
      }
    }
    case ALL_PERMISSIONS_NOT_GRANTED: {
      return {
        ...state,
        permission: {
          ...state.permission,
          hasAllRequiredPermissions: false
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default permissionReducer;