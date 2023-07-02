import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import storageSession from 'redux-persist/lib/storage/session'

import { favouriteReducer, filtersSortReducer, usersReducer } from '../common'
import { photosReducer } from '../modules/photos'
import { postsReducer } from '../modules/posts'
import { todosReducer } from '../modules/todos'

import { appReducer } from './app-slice'

const rootPersistConfig = {
  key: 'root',
  storage: storageSession,
  blacklist: ['favourite', 'filtersSort'],
}

const favouritePersistConfig = {
  key: 'favourite',
  storage: storage,
}

const rootReducer = combineReducers({
  app: appReducer,
  filtersSort: filtersSortReducer,
  posts: postsReducer,
  photos: photosReducer,
  todos: todosReducer,
  users: usersReducer,
  favourite: persistReducer(favouritePersistConfig, favouriteReducer),
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
