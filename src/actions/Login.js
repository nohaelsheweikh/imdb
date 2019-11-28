import * as ActionTypes from '../constants/ActionTypes';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import {Platform} from 'react-native';
import ApiUtils from '../utils/ApiUtils'
import {persistor} from '../store/configureStore'

const isLogged = (bool) => {
    return {
        type: ActionTypes.IS_LOGGED,
        isLogged: bool
    }
};

const loginHasError = (bool) => {
    return {
        type: ActionTypes.LOGIN_HAS_ERROR,
        hasError: bool
    }
};

const loginIsLoading = (bool) => {
    return {
        type: ActionTypes.LOGIN_IS_LOADING,
        isLoading: bool
    }
};

const setAsyncStorage = () => {

};

const login = (email, password) => {
    // console.log('user', username);
    // console.log('pass', password);
    return (dispatch) => {
        dispatch(loginIsLoading(true));
        if(!email || !password){
            dispatch(loginHasError(true));
            dispatch(loginIsLoading(false));
            return;
        }

        fetch('http://54.187.118.82/userapi/authenticate/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, password: password})
        })
            .then((res) => res.json())
            .then(res => {
                // console.log(res);
                if(res.code==200){
                    dispatch(loginHasError(false));
                    let token = res.result.token
                    let userId = res.result.user_id
                    let email =res.result.email   
                    // console.log('pushToken',pushToken)     
                    var DeviceType

                    if (Platform.OS === 'ios' ){
                        DeviceType = 0
                    }else{
                        DeviceType = 1
                    }
                //    console.log('device-type',DeviceType)
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
                    dispatch(loginIsLoading(false));
                    dispatch(isLogged(true));
                    AsyncStorage.setItem('token', token); 
                    global.active = 'Main'
                    Actions.Main();
                }else{
                    dispatch(loginIsLoading(false));
                    dispatch(loginHasError(true))
                }
            })
            .catch((e) => {
                // console.warn(e);
                dispatch(loginIsLoading(false));
                dispatch(loginHasError(true));
            });
    }
};

const logout = () => {
    // persistor.flush()
    persistor.purge()
    AsyncStorage.removeItem('token');
    AsyncStorage.clear()
    Actions.Login({ type:'reset' });
    global.Mainselected = true
    global.reportselected = false
    global.tripsSelected = false
    global.settingsSelected = false
    global.notificationsSelected = false
    return {
        type: ActionTypes.LOGOUT
    }
};

export default {
    isLogged,
    loginHasError,
    loginIsLoading,
    login,
    logout
}
