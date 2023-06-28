import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { postsReducer } from "../features/posts/slice"
import { appReducer, favouriteReducer, usersReducer } from "../common/slices"
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist"

const persistConfig = {
  key: "root",
  storage,
}

export const store = configureStore({
  reducer: {
    app: appReducer,
    posts: postsReducer,
    users: usersReducer,
    favoritePosts: persistReducer(persistConfig, favouriteReducer),
  },
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
