import * as ActionTypes from '../constants/ActionTypes';
import { Actions } from 'react-native-router-flux';
import ApiUtils,{getHeaders} from '../utils/ApiUtils'
import { AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

const NormalHasError = (bool) => {
    return {
        type: ActionTypes.TRIPSLIST_NORMAL_HAS_ERROR,
        hasError: bool
    }
};
const NormalisLoading = (bool) => {
    return {
        type: ActionTypes.TRIPSLIST_NORMAL_IS_LOADING,
        NormalisLoading: bool
    }
};

const WarningHasError = (bool) => {
    return {
        type: ActionTypes.TRIPSLIST_WARNING_HAS_ERROR,
        hasError: bool
    }
};
const WarningisLoading = (bool) => {
    return {
        type: ActionTypes.TRIPSLIST_WARNING_IS_LOADING,
        WarningisLoading: bool
    }
};



const getTripsNormal=(token,page) => {
   let Token = token
   let Page = page
    return (dispatch) => {
        dispatch(NormalisLoading(true));
        fetch(ApiUtils.serverUrl+'trips/normal/'+Page+'/',
            getHeaders(Token)
            )
            .then((res) => res.json())
            .then(res => {
                dispatch(NormalisLoading(false));
                if (res.result.length > 0){
                    let tripsNormalData = res.result
                    // console.log('tripsNormalData',tripsNormalData)
                    dispatch({
                        type: ActionTypes.GET_TRIPSLIST_NORMAL,
                        payload:{ tripsNormalData }
                    }); 
                }     
            })
            .catch((e) => {
               dispatch(NormalHasError(true));
                dispatch(callbackMSG(e))
            });
    }
}


const getTripsWarning=(token,page) => {
    let Token = token
    let Page = page
     return (dispatch) => {
         dispatch(WarningisLoading(true));
         fetch(ApiUtils.serverUrl+'trips/warning/'+Page+'/',
             getHeaders(Token)
             )
             .then((res) => res.json())
             .then(res => {
                 dispatch(WarningisLoading(false));
                 if (res.result.length > 0){
                     let tripsWarningData = res.result
                    //  console.log('tripsWarningData',tripsWarningData)
                     dispatch({
                         type: ActionTypes.GET_TRIPSLIST_WARNING,
                         payload: { tripsWarningData }
                     });  
                    }    
             })
             .catch((e) => {
                dispatch(WarningHasError(true));
                //  dispatch(callbackMSG(e))
             });
     }
 }
 

export default {
    NormalisLoading ,
    NormalHasError,
    getTripsNormal,
    WarningisLoading ,
    WarningHasError,
    getTripsWarning,
    
}
