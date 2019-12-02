import * as ActionTypes from '../config/redux-action-types/searchMovies'
import {  
    LOGOUT_SUCCESS,
  } from "../config/redux-action-types/authenticate"
const INITIAL_STATE = {
    isLoading: false, 
    Movies:[]
};

export default (state = INITIAL_STATE, action) => {
    // console.log(state)
    const { type, payload } = action;
    console.log('payload',action)
    switch (type) {
            case ActionTypes.SEARCH_MOVIE_IS_LOADIING:
                return Object.assign({}, state, {
                    isLoading: action.IsLoading,
                });
            case ActionTypes.SEARCH_MOVIE_HAS_ERROR:
                return Object.assign({}, state, {
                    HasError: action.HasError,
                });
            case ActionTypes.SEARCH_MOVIE_SUCCESS:
            return { ...state,Movies:action.payload.results};

            case LOGOUT_SUCCESS:
                return  Object.assign({}, state, {
                    Movies:[]
                 });
        
        default:
            return state
    }
}
