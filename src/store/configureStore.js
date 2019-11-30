import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import * as ActionTypes from '../config/redux-action-types/searchMovies';
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducers from './../reducers';
import rootSaga from '../sagas/Sagas'

const middleware = []
  const enhancers = []


  
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['trips']
};

/* ------------- Saga Middleware ------------- */

// const sagaMiddleware = createSagaMiddleware()
// middleware.push(sagaMiddleware)

// const cfgStore = () => {
//     return createStore(
//         reducers,
//         applyMiddleware(thunk)
//     )
// };
//
// export default cfgStore;

// const persistedReducer = persistReducer(persistConfig, rootReducer);
//
// export default () => {
//     let store = createStore(persistedReducer);
//     let persistor = persistStore(store);
//     return { store, persistor }
// }




const cfgStore = () => {
    // const middlewares = [thunk,sagaMiddleware,logger];
    // const enhancer = applyMiddleware(...middlewares);

    const middleware = []
    const enhancers = []
    /* ------------- Saga Middleware ------------- */
  
    const sagaMiddleware = createSagaMiddleware()
    middleware.push(sagaMiddleware)
  
    /* ------------ Logger Middleware ------------- */
    // if (DebugSetting.reduxLogging) {

    middleware.push(createLogger())
    
    // }
  /* ------------- Assemble Middleware ------------- */
   middleware.push(thunk)

  enhancers.push(applyMiddleware(...middleware))

    const persistedReducer = persistReducer(persistConfig, reducers);

    // create store
    // return createStore(persistedReducer, enhancers,rootSaga);
 const store = createStore(persistedReducer, compose(...enhancers))


 sagaMiddleware.run(rootSaga)
 return store;


};




export const persistor = persistStore(cfgStore());

export default cfgStore;