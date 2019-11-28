import ApiUtils,{getHeaders} from '.././utils/ApiUtils'
import { call, put, takeEvery, takeLatest,delay,cancel} from 'redux-saga/effects'
import * as ActionTypes from '../constants/ActionTypes';
import * as DashboardActions from '../actions/Dashboard'


const HasError = (bool) => {
    return {
        type: ActionTypes.DASHBOARD_HAS_ERROR,
        hasError: bool
    }
};
const isLoading = (bool) => {
    return {
        type: ActionTypes.DASHBOARD_IS_LOADING,
        isLoading: bool
    }
};
function* sleep(time) {
    yield new Promise(resolve => {
      to = setTimeout(resolve, time)
    })
  }
  
  function* clear() {
    yield new Promise(resolve => {
      clearTimeout(to)
      resolve()
    })
  }
function* fetcDashboard(action) {
    // console.log('DASHBOARD token',action.token)

    try {
        yield put(isLoading(true));
        let res  =  yield call(fetch,`${ApiUtils.serverUrl}dashboard`
        ,
        getHeaders(action.token))

        let json =  yield res.json();
        // console.log('response',json)
    if(json.code === 200){
        yield put({ type:ActionTypes.GET_DASHBOARD_SUCCESS,
                    data:json.result,
                });
       
        yield put(isLoading(false));



    }
} catch (e) {
      yield put({ type:ActionTypes.GET_DASHBOARD_HAS_ERROR, error: e.message });
    }
  }
export default function* fetchDashboardSaga() {
    // console.log('saga init..')
    yield [yield takeLatest(ActionTypes.GET_DASHBOARD,fetcDashboard)]
  }
  


