import { combineReducers } from 'redux';
import authenticate from "./authenticate";
import searchMovies from "./searchMovies"
import favorites from "./favorites"

export default combineReducers({

    authenticate:authenticate,
    searchMovies:searchMovies,
    favorites:favorites



})

