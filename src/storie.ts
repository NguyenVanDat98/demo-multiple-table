import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './redux/modal'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './redux/rootSaga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import { serviceReducer } from './redux/reducers'
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    root : rootReducer,
    service: serviceReducer
  },
  middleware(get){
    return get({
      thunk:false,
      serializableCheck:false
    }).concat(sagaMiddleware)
  }
})
const persistor = persistStore(store)
sagaMiddleware.run(rootSaga)
export default store

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch