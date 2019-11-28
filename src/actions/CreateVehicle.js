import * as ActionTypes from '../constants/ActionTypes';
import { Actions } from 'react-native-router-flux';
import ApiUtils,{simpleGetHeaders,postHeaders} from '../utils/ApiUtils'
import { AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';


const HasError = (bool) => {
    return {
        type: ActionTypes.CREATE_VEHICLE_HAS_ERROR,
        HasError: bool
    }
};
const isLoading = (bool) => {
    return {
        type: ActionTypes.CREATE_VEHICLE_IS_LOADING,
        isLoading: bool
    }
};

const isCreated = (bool) => {
    return {
        type: ActionTypes.IS_CREATED,
        isCreated: bool
    }
};

const getHasError = (bool) => {
    return {
        type: ActionTypes.GET_VEHICLE_MODELS_HAS_ERROR,
        getHasError: bool
    }
};
const getisLoading = (bool) => {
    return {
        type: ActionTypes.GET_VEHICLE_MODELS_IS_LOADING,
        getisLoading: bool
    }
};

const callbackMSG = (msg) => {
    return {
        type: ActionTypes.VEHICLE_CALLBACK_MSG,
        vehicleMsg:msg
    }
};

const getVehicleModels=() => {
     return (dispatch) => {
         dispatch(getisLoading(true));
          fetch(ApiUtils.serverUrl+'vehicle/models',
           simpleGetHeaders()
             ) 
             .then((res) => res.json())
             .then(res => {
                 dispatch(getisLoading(false));
                     let modelsData = res.result
                    //  console.log('modelsData',modelsData)
                     dispatch({
                         type: ActionTypes.GET_VEHICLE_MODELS_SUCCESS,
                         payload: { modelsData }
                     });
                 
             })
             .catch((e) => {
                dispatch(getHasError(true));
                 // dispatch(callbackMSG(e))
             });
            
     }
 }
 

const createVehicle = (token,vehicle_model,car_board_number,model_year,current_kilometers,device_serial) => {
    const vehicle = {vehicle_model,car_board_number,model_year,current_kilometers,device_serial };
     let Token = token
    //  console.log('vechile',vehicle)
    //  console.log('token',Token)

     return (dispatch) => {
         dispatch(isLoading(true));
         dispatch(isCreated(false));
             fetch(ApiUtils.serverUrl+'vehicle/register',
             postHeaders(Token,vehicle)
         ) 
            .then((res) => res.json())
             .then(res => {
                let calback = res.message;
                dispatch(callbackMSG(calback))  
                // console.log(res)
                 if(res.code==200){ 
                 dispatch(isLoading(false));
                 dispatch(HasError(false));
                 dispatch(isCreated(true));
                
                 let vehicleData = res.result
                    //  console.log('vehicle',vehicleData)
                     dispatch({
                         type: ActionTypes.CREATE_VEHICLE_SUCCESS,
                         payload: { vehicleData }
                     });
                global.active = 'Main';
                Actions.Main();
                
              }
                  else{
                   dispatch(isLoading(false));
                  dispatch(HasError(true))
                  dispatch(isCreated(false));
 
                  }
             })
             .catch((e) => {
                 dispatch(HasError(true));
 
             });
     }
 };

 export default {
    isLoading ,
    HasError,
    isCreated,
    createVehicle,
    getVehicleModels
}