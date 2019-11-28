import * as ActionTypes from '../constants/ActionTypes';
import { Actions } from 'react-native-router-flux';
import ApiUtils,{getHeaders,putHeaders} from '../utils/ApiUtils'
import { AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';




const HasError = (bool) => {
    return {
        type: ActionTypes.GET_VEHICLES_HAS_ERROR,
        HasError: bool
    }
};
const isLoading = (bool) => {
    return {
        type: ActionTypes.GET_VEHICLES_IS_LOADING,
        isLoading: bool
    }
};


const callbackMSG = (msg) => {
    return {
        type: ActionTypes.GET_VEHICLES_CALLBACK_MSG,
        getVehiclesMsg:msg
    }
};

const getVehicles=(token) => {
    let Token = token
    console.log(token)
     return (dispatch) => {
         dispatch(isLoading(true));
          fetch(ApiUtils.serverUrl+'vehicles/',
           getHeaders(Token)
             ) 
             .then((res) => res.json())
             .then(res => {
                 dispatch(isLoading(false));
                     let vehiclesData = res.result
                     dispatch({
                         type: ActionTypes.GET_VEHICLES_SUCCESS,
                         payload: { vehiclesData }
                     });
                 
             })
             .catch((e) => {
                dispatch(HasError(true));
                 // dispatch(callbackMSG(e))
             });
            
     }
 }
 
 export default {
    isLoading ,
    HasError,
    getVehicles
}