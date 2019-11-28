import * as ActionTypes from '../constants/ActionTypes';
import { Actions } from 'react-native-router-flux';
import ApiUtils,{getHeaders,putHeaders} from '../utils/ApiUtils'
import { AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

const getHasError = (bool) => {
    return {
        type: ActionTypes.GET_PROFILE_HAS_ERROR,
        hasError: bool
    }
};
const getisLoading = (bool) => {
    return {
        type: ActionTypes.GET_PROFILE_IS_LOADING,
        getisLoading: bool
    }
};

const updateHasError = (bool) => {
    return {
        type: ActionTypes.UPDATE_PROFILE_HAS_ERROR,
        updateHasError: bool
    }
};
const updateisLoading = (bool) => {
    return {
        type: ActionTypes.UPDATE_PROFILE_IS_LOADING,
        updateisLoading: bool
    }
};

const isUpdated = (bool) => {
    return {
        type: ActionTypes.IS_UPDATED,
        isUpdated: bool
    }
};

const uploadHasError = (bool) => {
    return {
        type: ActionTypes.UPLOAD_PIC_HAS_ERROR,
        uploadHasError: bool
    }
};
const uploadisLoading = (bool) => {
    return {
        type: ActionTypes.UPLOAD_PIC_IS_LOADING,
        uploadisLoading: bool
    }
};

const isUploaded = (bool) => {
    return {
        type: ActionTypes.IS_UPLOADED,
        isUploaded: bool
    }
};
const getProfile=(token) => {
   let Token = token
    return (dispatch) => {
        dispatch(getisLoading(true));
         fetch(ApiUtils.serverUrl+'profile',
            getHeaders(Token)
            ) 
            .then((res) => res.json())
            .then(res => {
                // console.log(res)
                dispatch(getisLoading(false));
                // dispatch(updateisLoading(false));

                    let profileData = res.result
                    // console.log('profile',profileData)
                    dispatch({
                        type: ActionTypes.GET_PROFILE,
                        payload: { profileData }
                    });
                if (profileData.has_vehicles==false) {
                    Actions.CreateVehicle()
                    dispatch(getisLoading(false));

                }
            })
            .catch((e) => {
               dispatch(getHasError(true));
               dispatch(getisLoading(false));

                // dispatch(callbackMSG(e))
            });
    }
}

const updateProfile = ( token,user_id,first_name,last_name,phone,emergency_phone) => {

   const user = { user_id,first_name,last_name,phone,emergency_phone };
    let Token = token
    // console.log('token',Token)
    // console.log(user)
    return (dispatch) => {
        dispatch(updateisLoading(true));
        dispatch(isUpdated(false));
            fetch(ApiUtils.serverUrl+'profile',
            putHeaders(Token,user)
        ) 
           .then((res) => res.json())
            .then(res => {
                // console.log(res)
                if(res.code==200){ 
                dispatch(updateisLoading(false));
                dispatch(updateHasError(false));
                dispatch(isUpdated(true));
               
                let newProfileData = res.result
                    // console.log('profile',newProfileData)
                    dispatch({
                        type: ActionTypes.UPDATE_PROFILE_SUCCESS,
                        payload: { newProfileData }
                    });
               
             }
                 else{
                    dispatch(updateisLoading(false));
                    dispatch(updateHasError(true))
                    dispatch(isUpdated(false));

                 }
            })
            .catch((e) => {
                dispatch(updateHasError(true));

            });
    }
};

const upload_image = (docId,image) => {
    let user_id = docId
    let image_base64 =image
    const data= { docId,image};
    //  console.log('Image',data);
    return (dispatch) => {
        dispatch(isLoading(true));
        if (!docId || !image ) {
            dispatch(uploadHasError(true));
            dispatch(isLoading(false));
            alert("Upload Error")

            return;
        }
        fetch('http://re3aya-api.azurewebsites.net/service_layer/api/doctor/profile/upload_image', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                
                {
                    "user_id":user_id,
                    "image_base64": image_base64
                  }
            )
        })
            .then((res) => res.json())
            .then(res => {
                // console.log(res);
                const newPic = res.InnerData.profile_picture;
                dispatch(callbackMSG(res))
                dispatch(isLoading(false));
                dispatch(uploadHasError(false));
                dispatch(isUploaded(true));
                dispatch({
                    type: ActionTypes.GET_PIC,
                    payload: { newPic }
                });
                alert("Uploaded Successfully")

            })
            .catch((e) => {
                // console.log(e);

            });
    }
};

const Reset = () => {
    return {
        type: ActionTypes.LOGOUT
    }
 }
export default {
    getisLoading ,
    getHasError,
    getProfile,
    updateisLoading,
    updateHasError,
    isUpdated,
    updateProfile,
    Reset
}
