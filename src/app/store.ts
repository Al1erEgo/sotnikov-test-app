import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { postsReducer } from "../features/posts/slice"
import { appReducer, usersReducer } from "../common/slices"

export const store = configureStore({
  reducer: {
    app: appReducer,
    posts: postsReducer,
    users: usersReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
