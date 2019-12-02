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



export function login() {
  return async dispatch => {
    dispatch(loginRequest()); 
    try { 
     
      fetch('https://api.themoviedb.org/3/authentication/token/new?api_key=75ec91e5d32ec957320eaa24e91f58a8', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then(res => {
            console.log(res); 
            if(res.success){
              let token = res.request_token
              console.log('request_token',res.request_token)
              const session = { token:token} 
              AsyncStorage.setItem(DATA_SESSION, JSON.stringify(session)) 
              AsyncStorage.setItem('token', token); 
               dispatch(loginSuccess(session)) 

            }         
            })
    } catch (err) { // When something goes wrong
      console.log(err)
      dispatch(loginFailed("Something went wrong"));
    }
  };
} 
// login
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



export const logout =() =>{ 
  return async dispatch => {
    dispatch(logoutRequest()) // Dispatch a logout request
    try {
        await AsyncStorage.clear(); // Remove the session data and unauthenticate the user
        dispatch(logoutSuccess()) // Dispatch a logout success action
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