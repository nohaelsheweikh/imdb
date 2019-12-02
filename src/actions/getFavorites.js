import * as ActionTypes from '../config/redux-action-types/getFavorites';

export function getFavorites(){
    return{
        type:ActionTypes.GET_FAVORITES
    }
}

