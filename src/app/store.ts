import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit"
import { favouriteReducer, filtersSortReducer, usersReducer } from "../common"
import storage from "redux-persist/lib/storage"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist"
import { appReducer } from "./app-slice"
import { postsReducer } from "../modules/posts"
import { photosReducer } from "../modules/photos"
import { todosReducer } from "../modules/todos"

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["favourite"],
}

const rootReducer = combineReducers({
  app: appReducer,
  filtersSort: filtersSortReducer,
  posts: postsReducer,
  photos: photosReducer,
  todos: todosReducer,
  users: usersReducer,
  favourite: favouriteReducer,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
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
