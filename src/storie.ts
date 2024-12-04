import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './redux/modal'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './redux/rootSaga'


const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    root : rootReducer.reducer
  },
  middleware(get){
    return get({
      thunk:false,
      serializableCheck:false
    }).concat(sagaMiddleware)
  }
})
sagaMiddleware.run(rootSaga)
export default store

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch