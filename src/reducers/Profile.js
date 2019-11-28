import * as ActionTypes from '../constants/ActionTypes'

import {  
    LOGOUT_SUCCESS,
  } from "../config/redux-action-types/authenticate"

const initialState = {
    getisLoading: false, 
    getHasError: false,
    profileData:null,
    updateisLoading:false,
    updateHasError:false,
    isUpdated:false,
    id:'',
    token:'',
    user_id:'',
    first_name:'',
    last_name:'',
    phone:'',
    newProfileData:null,
    emergency_phone:'',
    

   

};
export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
       
            case ActionTypes.GET_PROFILE_HAS_ERROR:
                return Object.assign({}, state, {
                    getHasError: action.getHasError,
                });
            case ActionTypes.GET_PROFILE_IS_LOADING:                
               return Object.assign({}, state, {
                    getisLoading: action.getisLoading,
                });
            case ActionTypes.GET_PROFILE:
                return { ...state, profileData:payload.profileData};


                case ActionTypes.UPDATE_PROFILE_HAS_ERROR:
                return Object.assign({}, state, {
                    updateHasError: action.updateHasError,
                });
            case ActionTypes.UPDATE_IS_LOADING:                
               return Object.assign({}, state, {
                    updateisLoading: action.updateisLoading,
                });
                case ActionTypes.IS_UPDATED:                
                return Object.assign({}, state, {
                     isUpdated: action.isUpdated,
                 });
                case ActionTypes.updateProfile:
                    return Object.assign({}, state, {
                        isUpdated:false,
                        token:payload.token,
                        user_id:payload.user_id,
                        first_name: payload.first_name,
                        last_name: payload.last_name,
                        phone:payload.phone,
                        emergency_phone:payload.emergency_phone,
                    
                });
                case LOGOUT_SUCCESS:
                return Object.assign({}, state, {
                    profileData:null,
                    id:'',
                    token:'',
                    user_id:'',
                    first_name:'',
                    last_name:'',
                    phone:'',
                    newProfileData:null,
                    emergency_phone:'',
                });
            case ActionTypes.UPDATE_PROFILE_SUCCESS:
                
                return { ...state,newProfileData:payload.newProfileData };
        
        default:
            return state
    }
}
