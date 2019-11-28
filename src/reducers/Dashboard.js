import * as ActionTypes from '../constants/ActionTypes'
const INITIAL_STATE = {
    isLoading: false, 
    HasError: false,
    Accident_isLoading: false, 
    Accident_hasError: false,
    data:null,
    accident:null,
    token:'',
    comment:''
}
import {  
    LOGOUT_SUCCESS,
  } from "../config/redux-action-types/authenticate"
  
export default (state =  INITIAL_STATE, action) => {
    // console.log(state)
    // const { type, payload } = action;
    switch (action.type)  {

        case ActionTypes.DASHBOARD_IS_LOADING:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
            });

            case ActionTypes.DASHBOARD_HAS_ERROR:
                return Object.assign({}, state, {
                    HasError: action.HasError,
                });
            case ActionTypes.GET_DASHBOARD_SUCCESS:
                return { ...state, data:action.data};

            case ActionTypes.ACCIDENT_HAS_ERROR:
                return Object.assign({}, state, {
                    Accident_hasError: action.Accident_hasError,
                });
            case ActionTypes.POST_ACCIDENT:
             return Object.assign({}, state, {
                
                token:action.token,
                comment: action.comment,
            });
       
            case LOGOUT_SUCCESS:
                return  Object.assign({}, state, {
                    isLoading: false, 
                    HasError: false,
                    Accident_isLoading: false, 
                    Accident_hasError: false,
                    data:null,
                    accident:null,
                    token:'',
                    comment:''
                 });
                //initialState
            
        default:
            return state
    }
}
