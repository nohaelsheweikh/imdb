import * as ActionTypes from '../constants/ActionTypes'
import {  
    LOGOUT_SUCCESS,
  } from "../config/redux-action-types/authenticate"

const INITIAL_STATE = {
    NormalisLoading: false, 
    NormalHasError: false,
    tripsNormalData:[],
    WarningisLoading: false, 
    WarningHasError: false,
    tripsWarningData:[],
    token:'',
    page:''
};
export default (state = INITIAL_STATE, action) => {
    // console.log(state)
    const { type, payload } = action;
    switch (type) {
           case ActionTypes.TRIPSLIST_NORMAL_IS_LOADING:
                return Object.assign({}, state, {
                    NormalisLoading: action.NormalisLoading,
                });
            case ActionTypes.TRIPSLIST_NORMAL_HAS_ERROR:
                return Object.assign({}, state, {
                    NormalHasError: action.NormalHasError,
                });
            case ActionTypes.GET_TRIPSLIST_NORMAL:
                return { ...state, tripsNormalData:payload.tripsNormalData};
                case ActionTypes.TRIPSLIST_NORMAL_IS_LOADING:
                return Object.assign({}, state, {
                    NormalisLoading: action.NormalisLoading,
                });
            case ActionTypes.TRIPSLIST_WARNING_IS_LOADING:
                return Object.assign({}, state, {
                    WarningisLoading: action.WarningisLoading,
                });
            case ActionTypes.TRIPSLIST_WARNING_HAS_ERROR:
                return Object.assign({}, state, {
                    WarningHasError: action.WarningHasError,
                });
            case ActionTypes.GET_TRIPSLIST_WARNING:
                return { ...state, tripsWarningData:payload.tripsWarningData};
            case LOGOUT_SUCCESS:
                return  Object.assign({}, state, {
                    NormalisLoading: false, 
                    NormalHasError: false,
                    tripsNormalData:[],
                    WarningisLoading: false, 
                    WarningHasError: false,
                    tripsWarningData:[],
                    token:'',
                    page:''
                 });
        default:
            return state
    }
}
