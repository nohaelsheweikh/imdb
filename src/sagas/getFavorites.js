import { call, put, takeEvery, takeLatest,all,fork,cancel } from 'redux-saga/effects'
import * as ActionTypes  from "../config/redux-action-types/getFavorites";
import { AsyncStorage} from "react-native";


export const isLoading = (bool) => {
    return {
        type: ActionTypes.GET_FAVORITES_IS_LOADIING,
        isLoading: bool
    }
};

export async function getMovie() {
  try {
    
    let movies = await AsyncStorage.getItem('MOVIES') 
    .then((value) => {
         
        movies = JSON.parse(value)  
        console.log('movies',movies)
      })
        .then(()=>{
           console.log('SAVED',movies)
        })

  } catch (error) {
    console.log('AsyncStorage error during token store:', error);
  }
}



export function* getFavorites(action) {
    try {   
        yield put(isLoading(true));

        let response = yield (AsyncStorage.getItem('MOVIES') ) 
           let movie =JSON.parse(response)
        yield put({ type:ActionTypes.GET_FAVORITES_SUCCESS ,
                    payload:movie
              });    
              console.log('GETMOVIES',movie)
              yield put(isLoading(false));

     

        }catch (e) {
            yield put({ type:ActionTypes.GET_FAVORITES_HAS_ERROR, error: e.message });
            yield put(isLoading(false));

        }
  }

 
export default function* getFavoriteSaga() {
    yield [yield takeLatest(ActionTypes.GET_FAVORITES,getFavorites)]
  }
  
