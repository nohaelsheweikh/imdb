import * as ActionTypes from '../config/redux-action-types/addToFavorites';

export function addToFavorites(movie){
    return{
        type:ActionTypes.ADD_TO_FAVORITES,movie
    }
}

