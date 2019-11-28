import * as ActionTypes from '../constants/ActionTypes'
const INITIAL_STATE = {
    isLoading: false, 
    HasError: false,
    reportData:null,
    token:''
};
import {  
    LOGOUT_SUCCESS,
  } from "../config/redux-action-types/authenticate"
export default (state = INITIAL_STATE, action) => {
    // console.log(state)
    const { type, payload } = action;
    switch (type) {
            case ActionTypes.HEALTHREPORT_IS_LOADING:
                return Object.assign({}, state, {
                    isLoading: action.isLoading,
                });
            case ActionTypes.HEALTHREPORT_HAS_ERROR:
                return Object.assign({}, state, {
                    HasError: action.HasError,
                });
            case ActionTypes.GET_HEALTHREPORT:
            return { ...state, reportData:payload.reportData};

            case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false, 
                HasError: false,
                reportData:null,
                token:''

            });
        
        default:
            return state
    }
}
