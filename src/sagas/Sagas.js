import { put, takeEvery, all } from 'redux-saga/effects'
import searchMovieSaga from './searchMovie'

export default function* rootSaga() {
  yield all([
    searchMovieSaga()
  ])
}
