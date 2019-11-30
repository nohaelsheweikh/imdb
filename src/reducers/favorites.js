import * as ActionTypes from '../config/redux-action-types/addToFavorites'
import {
  GET_FAVORITES_IS_LOADIING,
  GET_FAVORITES_SUCCESS 
} from "../config/redux-action-types/getFavorites"
import {  
    LOGOUT_SUCCESS,
  } from "../config/redux-action-types/authenticate"
  

const INITIAL_STATE = {
    isLoading: false, 
    requestingRestore:false,
    favoriteMovies:[]
};

export default (state = INITIAL_STATE, action) => {
    // console.log(state)
    const { type, payload } = action;
    switch (type) {
            case ActionTypes.ADD_TO_FAVORITES_IS_LOADIING:
                return Object.assign({}, state, {
                    isLoading: action.isLoading,
                });
            case GET_FAVORITES_IS_LOADIING:
                return Object.assign({}, state, {
                  requestingRestore: action.isLoading,
                });
            
            case GET_FAVORITES_SUCCESS:
                  return { ...state,favoriteMovies:action.payload};

            case LOGOUT_SUCCESS:
                return  Object.assign({}, state, {
                    favoriteMovies:[]
                 });
        
        default:
            return state
    }
}
