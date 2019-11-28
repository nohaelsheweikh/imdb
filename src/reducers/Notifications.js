import * as ActionTypes from '../constants/ActionTypes'
import {  
    LOGOUT_SUCCESS,
  } from "../config/redux-action-types/authenticate"
const initialState = {
    isLoading: false, 
    HasError: false,
    notificationsData:[],
    notificationsCount:0,
    getNotificationsMsg:''
    
    

   

};
export default (state = initialState, action) => {
    // const { type, payload } = action;
    switch (action.type) {
            case ActionTypes.GET_NOTIFICATIONS_HAS_ERROR:
                return Object.assign({}, state, {
                        getHasError: action.getHasError,
                    });
            case ActionTypes.GET_NOTIFICATIONS_IS_LOADING:                
                return Object.assign({}, state, {
                        isLoading: action.isLoading,
                    });
            case ActionTypes.GET_NOTIFICATIONS_SUCCESS: {
                        // console.log('action', action)
                        return { state: cleanUp(state),
                            notificationsData:action.notificationsData,
                            notificationsCount:action.notificationsCount
                        }
                      }
            // case ActionTypes.GET_NOTIFICATIONS_SUCCESS:
            //     return { ...state,
            //         notificationsData:payload.notificationsData,
            //         notificationsCount:payload.notificationsCount     
            //     };

               
            case ActionTypes.GET_NOTIFICATIONS_CALLBACK_MSG:
                return Object.assign({ ...state, getNotificationsMsg:action.getNotificationsMsg });
          
             case LOGOUT_SUCCESS:
                return Object.assign({}, state, {
                    isLoading: false, 
                    HasError: false,
                    notificationsData:[],
                    notificationsCount:0,
                    getNotificationsMsg:''            
                    });
        
        default:
            return cleanUp(state);
    }
}
const cleanUp = (state) => {
    return { ...state, error: null }
  }