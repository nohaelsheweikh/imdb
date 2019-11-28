import * as ActionTypes from '../constants/ActionTypes'

const INITIAL_STATE = {
    isLogged: false,
    hasError : false,
    isLoading: false,
    userData:null,
    user_id:'',
    name: '',
    email: '',
    password: '',
};

export default (state = INITIAL_STATE, action) => {
    // console.log(state)

    const { type, payload } = action;
    switch (type){
        case ActionTypes.IS_LOGGED:
            return Object.assign({}, state, {
                isLogged: action.isLogged,
            });
        case ActionTypes.USER_ID:
            return { ...state,user_id:payload.userId};
            
        case ActionTypes.LOGIN_HAS_ERROR:
            // return action.loginHasError;
            // console.log('haserror', action);

            return Object.assign({}, state, {
                hasError: action.hasError,
            });
        case ActionTypes.LOGIN_IS_LOADING:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
            });
        case ActionTypes.LOGIN:
            return Object.assign({}, state, {
                isLogged: false,
                name: payload.name,
                email: payload.email,
                password: payload.password
            });
        // case ActionTypes.GET_USER:
        //     return { ...state, userData:payload.userData};
        case ActionTypes.LOGOUT:
        return Object.assign({}, state, {
            isLogged: false,
            name:" ",
            email: " ",
            password: " ",
            user_id:''
        });;
        default:
            return state
    }
}
