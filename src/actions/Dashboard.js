import * as ActionTypes from '../constants/ActionTypes';
import { Actions } from 'react-native-router-flux';
import ApiUtils,{getHeaders} from '../utils/ApiUtils'
import { AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

const HasError = (bool) => {
    return {
        type: ActionTypes.DASHBOARD_HAS_ERROR,
        hasError: bool
    }
};
const isLoading = (bool) => {
    return {
        type: ActionTypes.DASHBOARD_IS_LOADING,
        isLoading: bool
    }
};

const Accident_hasError = (bool) => {
    return {
        type: ActionTypes.ACCIDENT_HAS_ERROR,
        Accident_hasError: bool
    }
};
const Accident_isLoading = (bool) => {
    return {
        type: ActionTypes.ACCIDENT_IS_LOADING,
        Accident_isLoading: bool
    }
};



// const getDashboard = (token) => {
//    let Token = token
//     return (dispatch) => {
//         dispatch(isLoading(true));
//         fetch(ApiUtils.serverUrl+'dashboard',
//             getHeaders(Token)
//         ) 
//             .then((res) => res.json())
//             .then(res => {
//                 // console.log('dashboard',res)
//                 dispatch(isLoading(false));
//                 //  console.log(res)
//                     let data = res.result
//                     // console.log('data',data)
//                     dispatch({
//                         type: ActionTypes.GET_DASHBOARD,
//                         payload: { data }
//                     });
                
//             })
//             .catch((e) => {
//                // dispatch(HasError(true));
//                 // dispatch(callbackMSG(e))
//             });
//     }
// }


const getDashboard = (token) => {

    return {
        type: ActionTypes.GET_DASHBOARD,
        token
    }
}
const postAccident = (token,comment) => {
    let Token = token
    let description = comment
     return (dispatch) => {
         dispatch(Accident_isLoading(true));
         fetch('http://54.187.118.82/userapi/safety/emergency/', {
             method: 'POST',
             headers: {
                 'Authorization':"Bearer "+Token,
                 "Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(
                
                {
                    "comment": description,
                    
                  }
            )
        
             
         }) 
             .then((res) => res.json())
             .then(res => {
                 console.log('accident res',res)
                 dispatch(Accident_isLoading(false));
                    
                     let accident = res
                     dispatch({
                         type: ActionTypes.POST_ACCIDENT,
                         payload: { accident }
                     });
                     alert('Message sent successfully')
                 
             })
             .catch((e) => {
                dispatch(Accident_hasError(true));
                alert('sending error')
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
    getDashboard,
    Accident_hasError,
    Accident_isLoading,
    postAccident,
    Reset
}
