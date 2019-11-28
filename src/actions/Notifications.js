import * as ActionTypes from '../constants/ActionTypes';
import { Actions } from 'react-native-router-flux';
import ApiUtils,{NotificationsGetHeaders,putHeaders} from '../utils/ApiUtils'
import { AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';




const HasError = (bool) => {
    return {
        type: ActionTypes.GET_NOTIFICATIONS_HAS_ERROR,
        HasError: bool
    }
};
const isLoading = (bool) => {
    return {
        type: ActionTypes.GET_NOTIFICATIONS_IS_LOADING,
        isLoading: bool
    }
};


const callbackMSG = (msg) => {
    return {
        type: ActionTypes.GET_NOTIFICATIONS_CALLBACK_MSG,
        getNotificationsMsg:msg
    }
};

// const getNotifications=(token,page) => {
//     let Token = token
//     let Page = page
//      return (dispatch) => {
//          dispatch(isLoading(true));
//           fetch('http://system.hoodeg.com/userapi/notifications/'+Page+'/',
//           NotificationsGetHeaders(Token)
//              ) 
//              .then((res) => res.json())
//              .then(res => {
//                 //  console.log('notifications',res)
//                  dispatch(isLoading(false));
//                  if (res.result.all_list.length > 0){
//                      let notificationsData = res.result.all_list
//                      let notificationsCount = res.result.all_count
//                     //  console.log('notificationsData',notificationsData)
//                      dispatch({
//                          type: ActionTypes.GET_NOTIFICATIONS_SUCCESS,
//                          payload: { notificationsData,notificationsCount }
//                      });  
//                     }            
//              })
//              .catch((e) => {
//                 dispatch(HasError(true));
//                  // dispatch(callbackMSG(e))
//              });
            
//      }
//  }
 
 

const getNotifications=(token,page) => {

    return {
        type: ActionTypes.GET_NOTIFICATIONS_LIST,
        token,page
    }
}



    export default {
        isLoading ,
        HasError,
        getNotifications
    }