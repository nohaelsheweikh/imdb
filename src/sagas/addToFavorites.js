import { call, put, takeEvery, takeLatest,all,fork,cancel } from 'redux-saga/effects'
import * as ActionTypes  from "../config/redux-action-types/addToFavorites";
import { AsyncStorage,Platform } from "react-native";


export const isLoading = (bool) => {
    return {
        type: ActionTypes.ADD_TO_FAVORITES_IS_LOADIING,
        isLoading: bool
    }
};

export async function storeMovie(movie) {
  try {
    let newMovie = {
        title: movie.title,
        path: movie.backdrop_path ,
        release:movie.release_date,
        rate:movie.vote_average,
        overview:movie.overview
    }
    let movies = await AsyncStorage.getItem('MOVIES') || '[]';
    movies = JSON.parse(movies);
    movies.push(newMovie);
    
    let response = await AsyncStorage.setItem('MOVIES',JSON.stringify(movies)) 
    .then(()=>{
           console.log('SAVED',response)
        })

  } catch (error) {
    console.log('AsyncStorage error during store:', error);
  }
}



export function* addToFavorites(action) {
    try {   
        yield put(isLoading(true));

        let response = yield call(storeMovie,action.movie) 
   
        yield put({ type:ActionTypes.ADD_TO_FAVORITES_SUCCESS ,
                    payload:response
              });    
              console.log('localStorage',response)
              yield put(isLoading(false));

     

        }catch (e) {
            yield put({ type:ActionTypes.ADD_TO_FAVORITES_HAS_ERROR, error: e.message });
            yield put(isLoading(false));

        }
  }

 
export default function* addToFavoriteSaga() {
    yield [yield takeLatest(ActionTypes.ADD_TO_FAVORITES,addToFavorites)]
  }
  
