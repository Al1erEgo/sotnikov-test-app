import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { postsReducer } from "../features/posts/slice"

export const store = configureStore({
  reducer: {
    posts: postsReducer,
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
