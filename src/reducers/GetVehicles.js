import * as ActionTypes from '../constants/ActionTypes'
import {  
    LOGOUT_SUCCESS,
  } from "../config/redux-action-types/authenticate"

const initialState = {
    isLoading: false, 
    HasError: false,
    vehiclesData:null,
    getVehiclesMsg:''
    
    

   

};
export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
            case ActionTypes.GET_VEHICLES_HAS_ERROR:
                return Object.assign({}, state, {
                        HasError: action.HasError,
                    });
            case ActionTypes.GET_VEHICLES_IS_LOADING:                
                return Object.assign({}, state, {
                        isLoading: action.isLoading,
                    });
            case ActionTypes.GET_VEHICLES_SUCCESS:
                return { ...state,vehiclesData:payload.vehiclesData};

               
            case ActionTypes.GET_VEHICLES_CALLBACK_MSG:
                return Object.assign({ ...state, getVehiclesMsg:action.getVehiclesMsg });
          
            case LOGOUT_SUCCESS:
                return Object.assign({}, state, {
                    isLoading: false, 
                    HasError: false,
                    vehiclesData:null,
                    getVehiclesMsg:''
                    
    
                    });
        
        default:
            return state
    }
}
