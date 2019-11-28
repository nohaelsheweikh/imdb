import * as ActionTypes from '../constants/ActionTypes';

export function searchMovie(query){
    return{
        type:ActionTypes.SEARCH_MOVIE,query
    }
}