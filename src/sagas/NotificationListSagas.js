import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as NotificationsActions from '../actions/Notifications'
import * as ActionTypes from '../constants/ActionTypes';
import ApiUtils,{NotificationsGetHeaders,putHeaders} from '../utils/ApiUtils'


function* fetchNotifications(action) {
    // console.log('page',action.page)
    // console.log('token',action.token)

    try {
      let res  =  yield call(fetch, `${ApiUtils.serverUrl}notifications/${action.page}/`,

        // let res  =  yield call(fetch, 'http://system.hoodeg.com/userapi/notifications/'+action.page+'/',
        NotificationsGetHeaders(action.token))
        let json =  yield res.json();
        // console.log('response',json)
      yield put({ type:ActionTypes.GET_NOTIFICATIONS_SUCCESS,
              notificationsCount:json.result.all_count,
              notificationsData: json.result.all_list });
    } catch (e) {
      yield put({ type:ActionTypes.GET_NOTIFICATIONS_HAS_ERROR, error: e.message });
    }
  }
export default function* NotificationListSaga() {
    // console.log('saga init..')
    yield [yield takeLatest(ActionTypes.GET_NOTIFICATIONS_LIST,fetchNotifications)]
  }
  
