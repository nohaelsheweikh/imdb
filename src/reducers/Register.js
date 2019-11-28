import * as ActionTypes from '../constants/ActionTypes'
import { Actions } from 'react-native-router-flux';
const initialState = {
    isRegistered: false,
    hasError: false,
    isLoading: false,
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    user: null,
    msg:''
};
export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.IS_REGISTER:
            return Object.assign({}, state, {
                isRegistered: action.isRegistered,
            });
        case ActionTypes.REGISTER_HAS_ERROR:
            return Object.assign({}, state, {
                hasError: action.hasError,
            });
        case ActionTypes.REGISTER_IS_LOADING:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
            });
        case ActionTypes.CALLBACK_MSG:
            return Object.assign({ ...state, msg: action.msg });
        case ActionTypes.REGISTER:
            return Object.assign({}, state, {
                isRegistered: false,
                first_name: payload.first_name,
                last_name: payload.last_name,
                email: payload.email,
                password: payload.password,
                
            });
        case ActionTypes.REGISTER_USER_SUCCESS:
            Actions.Login()
            return { ...state, data: payload.data };
        
        default:
            return state
    }
}
