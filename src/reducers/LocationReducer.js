import {
    LOCATION_PERMISSION_BEGIN,
    LOCATION_PERMISSION_SET,
    LOCATION_SET
  } from '../constants/ActionTypes';
  import {  
    LOGOUT_SUCCESS,
  } from "../config/redux-action-types/authenticate"
  const INITIAL_STATE = {
    access: false,
    loading: false,
  
    latitude: 0,
    longitude: 0
  };
  
  export default (state = INITIAL_STATE, action) => {
    const { payload } = action;
    // console.log(payload)
    switch (action.type) {
      case LOCATION_PERMISSION_BEGIN:
        return { ...INITIAL_STATE, loading: true };
      case LOCATION_PERMISSION_SET:
        return { ...state, access: payload.access, loading: false };
      case LOCATION_SET:
        return { ...state, latitude: payload.latitude, longitude: payload.longitude };
      default:
        return state;
    }
  };
  