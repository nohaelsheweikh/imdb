import * as ActionTypes from '../constants/ActionTypes';
import { Actions } from 'react-native-router-flux';
import ApiUtils,{getHeaders} from '../utils/ApiUtils'
import { AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

const HasError = (bool) => {
    return {
        type: ActionTypes.TRIPSDETAILS_HAS_ERROR,
        hasError: bool
    }
};
const isLoading = (bool) => {
    return {
        type: ActionTypes.TRIPSDETAILS_IS_LOADING,
        isLoading: bool
    }
};



const getTripsDetails=(token,id) => {
   let ID = id
   let Token = token
    return (dispatch) => {
        dispatch(isLoading(true));
            fetch(ApiUtils.serverUrl+'trip/details/'+ID+'/',
            getHeaders(Token)
            ) 
            .then((res) => res.json())
            .then(res => {
                    let tripDetails= res.result
                    dispatch({
                        type: ActionTypes.GET_TRIPSDETAILS,
                        payload: { tripDetails }
                    });      
                    dispatch(isLoading(false));
            })
            .catch((e) => {
                dispatch(HasError(true));
            });
    }
}



export default {
    isLoading ,
    HasError,
    getTripsDetails
}
