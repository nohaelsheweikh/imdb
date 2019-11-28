import * as ActionTypes from '../constants/ActionTypes';
import { Actions } from 'react-native-router-flux';
import ApiUtils from '../utils/ApiUtils'
import {Platform,AsyncStorage} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

const isRegistered = (bool) => {
    return {
        type: ActionTypes.IS_REGISTERED,
        isRegister: bool
    }
};
const registerHasError = (bool) => {
    return {
        type: ActionTypes.REGISTER_HAS_ERROR,
        hasError: bool
    }
};
const isLoading = (bool) => {
    return {
        type: ActionTypes.REGISTER_IS_LOADING,
        isLoading: bool
    }
};
const callbackMSG = (msg) => {
    return {
        type: ActionTypes.CALLBACK_MSG,
        msg:msg
    }
};

const register = ( first_name,last_name,email,password) => {
    const user = { first_name,last_name,email,password };
    // console.log('user',user)
    return (dispatch) => {
        dispatch(isLoading(true));
        if ( !first_name || !last_name || !email ||!password) {
            dispatch(registerHasError(true));
            dispatch(isLoading(false));
            // dispatch(callbackMSG('you have to fill all data'))
            return;
        }
       fetch(ApiUtils.serverUrl+'authenticate/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then((res) => res.json())
            .then(res => {
                // console.log('register',res)
                // console.log(res.message)    
               let calback = res.message;
               dispatch(callbackMSG(calback))
               let token = res.result.token
               let userId = res.result.user_id
                if(res.code==200){ 
                    var DeviceType
                    if (Platform.OS === 'ios' ){
                        DeviceType = 0
                    }else{
                        DeviceType = 1
                    } 
                dispatch(isLoading(false));
                dispatch(registerHasError(false));
                dispatch(isRegistered(true));
                     // send one Signal Push Token
                     fetch(ApiUtils.serverUrl+'authenticate/device-token/', {
                        method: 'POST',
                        headers: {
                            'Authorization':"Bearer "+token,
                            "Access-Control-Allow-Origin": "*",
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
            
                            {
                                "user_id": userId,
                                "device_token": pushToken,
                                "device_type": DeviceType,
                                "registration_id":registrationId

                              }
                        ) 
                                          
                    }).then((tokenData) => tokenData.json())
                    .then(tokenData => {   
                        // console.log(tokenData) 
                    })  
                   
                    // console.log('device-type',DeviceType)
                    AsyncStorage.setItem('token',token); 
                    Actions.CreateVehicle();
            }
                else{
                 dispatch(isLoading(false));
                 dispatch(registerHasError(true))
                 dispatch(callbackMSG(calback))
                //  console.log('error',res.message)

                }
            })
            .catch((e) => {
                dispatch(isLoading(false));
                dispatch(registerHasError(true));
                
                

            });
    }
};



export default {
    isRegistered,
    registerHasError,
    isLoading,
    register,
}
