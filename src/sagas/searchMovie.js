import { call, put, takeLatest } from 'redux-saga/effects'
import * as ActionTypes  from "../constants/ActionTypes";
import ApiUtils,{simpleGetHeaders,APIKEY} from '../utils/ApiUtils'

export const IsLoading = (bool) => {
    return {
        type: ActionTypes.SEARCH_MOVIE_IS_LOADIING,
        IsLoading: bool
    }
};



export function* searchMovie(action) {
  console.log('sent',action.query)
    try {
      yield put(IsLoading(true));
      let response  =  yield call(fetch, `https://api.themoviedb.org/3/search/company?api_key=75ec91e5d32ec957320eaa24e91f58a8&query=${action.query}&page=1`,
        
      // let res  =  yield call(fetch, 'http://system.hoodeg.com/userapi/notifications/'+action.page+'/',
        simpleGetHeaders())
        let json =  yield response.json();
      console.log('searchResponse',json)
      if(response.status === 200){
        yield put({ type:ActionTypes.SEARCH_MOVIE_SUCCESS,
                    payload:json
              });         
              yield put(IsLoading(false));
     
        }
        }catch (e) {
      yield put({ type:ActionTypes.SEARCH_MOVIE_HAS_ERROR, error: e.message });
      yield put(IsLoading(true));

    }
  }

 
export default function* searchMovieSaga() {
    yield [yield takeLatest(ActionTypes.SEARCH_MOVIE,searchMovie)]
  }
  
