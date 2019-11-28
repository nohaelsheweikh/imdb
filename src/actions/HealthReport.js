import * as ActionTypes from '../constants/ActionTypes';
import { Actions } from 'react-native-router-flux';
import ApiUtils,{getHeaders} from '../utils/ApiUtils'
import { AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

const HasError = (bool) => {
    return {
        type: ActionTypes.HEALTHREPORT_HAS_ERROR,
        hasError: bool
    }
};
const isLoading = (bool) => {
    return {
        type: ActionTypes.HEALTHREPORT_IS_LOADING,
        isLoading: bool
    }
};



const getHealthReport=(token) => {
   let Token = token
    return (dispatch) => {
        dispatch(isLoading(true));
            fetch(ApiUtils.serverUrl+'health/faults/',
            getHeaders(Token)
        ) 
            .then((res) => res.json())
            .then(res => {
                dispatch(isLoading(false));
                    let reportData = res.result
                    dispatch({
                        type: ActionTypes.GET_HEALTHREPORT,
                        payload: { reportData }
                    });
                
            })
            .catch((e) => {
               // dispatch(HasError(true));
                // dispatch(callbackMSG(e))
            });
    }
}

const Reset = () => {
    return {
        type: ActionTypes.LOGOUT
    }
 }

export default {
    isLoading ,
    HasError,
    getHealthReport,
    Reset
}
