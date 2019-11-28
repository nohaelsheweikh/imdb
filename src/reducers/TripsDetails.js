import * as ActionTypes from '../constants/ActionTypes'
import {  
    LOGOUT_SUCCESS,
  } from "../config/redux-action-types/authenticate"

const initialState = {
    isLoading: false, 
    HasError: false,
    tripDetails:null,
    id:'',
    token:''
   
};
export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
           case ActionTypes.TRIPSDETAILS_IS_LOADING:
                return Object.assign({}, state, {
                    isLoading: action.isLoading,
                });
            case ActionTypes.TRIPSDETAILS_HAS_ERROR:
                return Object.assign({}, state, {
                    HasError: action.HasError,
                });
            case ActionTypes.GET_TRIPSDETAILS:
                return { ...state, tripDetails:payload.tripDetails};
                
            case LOGOUT_SUCCESS:
                return  Object.assign({}, state, {
                    tripDetails:null
                 });
        
        default:
            return state
    }
}
