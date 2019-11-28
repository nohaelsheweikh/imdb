import { AsyncStorage,Platform } from "react-native";
import { DATA_SESSION } from "../config/global";
import ApiUtils from '../utils/ApiUtils'

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  RESTORE_SESSION,
  RESTORE_REQUEST,
  RESTORE_FAILED
} from "../config/redux-action-types/authenticate";

// export const getToken = (token) => ({
//   type: 'GET_TOKEN',
//   token,
// });

export function login(email, password) { // Fake authentication function
  return async dispatch => {
    dispatch(loginRequest()); // dispatch a login request to update the state
    try { 
       
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
                console.log(res);
                if(res.code==200){
                    let token = res.result.token
                    let userId = res.result.user_id
                    let email =res.result.email   
                
                    const session = { token:token, email: email} 
                    AsyncStorage.setItem(DATA_SESSION, JSON.stringify(session)) 
                    AsyncStorage.setItem('token', token); 
                    // AsyncStorage.setItem('token', token); 
                    dispatch(loginSuccess(session)) 
                    // global.active = 'Main'
                }else{
                  dispatch(loginFailed("Something went wrong"));
                }
            })
    } catch (err) { // When something goes wrong
      console.log(err)
      dispatch(loginFailed("Something went wrong"));
    }
  };
} // login
export function restoreSession() { // Restore session of the user who is authenticated
  return async dispatch => {
    dispatch(restoreRequest()); // Dispatch an restore request session
    try {
      const session = await AsyncStorage.getItem(DATA_SESSION) // Get the data session in the current device
      if (session != null) { // If session exist and authenticated
        dispatch(loginSuccess(JSON.parse(session))) // Dispatch a login success redirecting to the home screen
      } else { // If not dispatch a restore failed action to be redirected to the login screen
        dispatch(restoreFailed())
      }
    } catch (err) { // When something goes wrong
      dispatch(restoreFailed())
    }
  };
} 

 // restoreSession

// export const getUserToken = () => dispatch => 

//  AsyncStorage.getItem(DATA_SESSION)
//         .then((data) => {
//             dispatch(loading(false));
//             dispatch(getToken(data));
//         })
//         .catch((err) => {
//             dispatch(loading(false));
//             dispatch(error(err.message || 'ERROR'));
//         })

export const logout =() =>{ 
  return async dispatch => {
    dispatch(logoutRequest()) // Dispatch a logout request
    try {
      //setTimeout(async () => { // Add a 1.5 second delay to fake an asynchronous ajax request
        await AsyncStorage.removeItem(DATA_SESSION); // Remove the session data and unauthenticate the user
        dispatch(logoutSuccess()) // Dispatch a logout success action
    //}, 1500)
    } catch (err) { // When something goes wrong
      dispatch(logoutFailed("Something went wrong"))
    }
  }
} // logout

function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
} //loginRequest

function loginSuccess(session) {
  return {
    type: LOGIN_SUCCESS,
    data: {
      session
    }
  };
} // loginSuccess

function loginFailed(error) {
  if (!error) {
    error = "Network Error";
  }
  return {
    type: LOGIN_FAILED,
    data: {
      error: error
    }
  };
} // loginFailed

function logoutRequest() {
  return {
    type: LOGOUT_REQUEST
  };
} //logoutRequest

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
} // logoutSuccess

function logoutFailed(error) {
  if (!error) {
    error = "Network Error";
  }
  return {
    type: LOGOUT_FAILED,
    data: {
      error: error
    }
  };
} // logoutFailed

function restoreRequest() {
  return {
    type: RESTORE_REQUEST
  };
} //restoreRequest

function restoreFailed() {
  return {
    type: RESTORE_FAILED
  };
} //restoreFailed

export default {
 logout
}