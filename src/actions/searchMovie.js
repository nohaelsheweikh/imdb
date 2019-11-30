import * as ActionTypes from '../config/redux-action-types/searchMovies';

export function searchMovie(query){
    return{
        type:ActionTypes.SEARCH_MOVIE,query
    }
}