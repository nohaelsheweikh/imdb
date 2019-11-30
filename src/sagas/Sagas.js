import { put, takeEvery, all } from 'redux-saga/effects'
import searchMovieSaga from './searchMovie'
import addToFavoriteSaga from './addToFavorites'
import getFavoriteSaga from './getFavorites'

export default function* rootSaga() {
  yield all([
    searchMovieSaga(),
    addToFavoriteSaga(),
    getFavoriteSaga()
  ])
}
