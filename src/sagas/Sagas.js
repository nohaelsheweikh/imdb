import { put, takeEvery, all } from 'redux-saga/effects'
import NotificationListSaga from './NotificationListSagas'
import fetchDashboardSaga from './DashBoardSaga'
import searchMovieSaga from './searchMovie'
export default function* rootSaga() {
  yield all([
    NotificationListSaga(),
    fetchDashboardSaga(),
    searchMovieSaga()
  ])
}
