import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit"
import {
  favouriteReducer,
  filtersSortReducer,
  usersReducer,
} from "../common/slices"
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
import { postsReducer } from "../modules/posts/slice"
import { photosReducer } from "../modules/photos/slice"

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["users", "posts", "app", "filtersSort", "photos"],
}

const rootReducer = combineReducers({
  app: appReducer,
  filtersSort: filtersSortReducer,
  posts: postsReducer,
  photos: photosReducer,
  users: usersReducer,
  favorite: favouriteReducer,
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
