import { call, put, takeLatest } from 'redux-saga/effects'
import * as ActionTypes  from "../config/redux-action-types/searchMovies";
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
      let response  =  yield call(fetch, `${ApiUtils.serverUrl}search/multi?api_key=${ApiUtils.APIKEY}&language=en-US&query=${action.query}&page=1&include_adult=false`,
        
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
  
