import { combineReducers } from 'redux';
import authenticate from "./authenticate";
import searchMovies from "./searchMovies"

export default combineReducers({

    authenticate:authenticate,
    searchMovies:searchMovies


})

