import { UserType } from "../types"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { appActions } from "./app-slice"
import { usersApi } from "../api"
import { RootState } from "../../app/store"

type UsersState = {
  [key: string]: UserType
}

const initialState: UsersState = {}

const fetchUser = createAsyncThunk<UserType | void, number>(
  "users/fetchUser",
  async (arg, { dispatch, rejectWithValue, getState }) => {
    const state = getState() as RootState
    if (!state.users[arg]) {
      dispatch(usersActions.addEmptyUser(arg))
      try {
        const posts = await usersApi.getUser(arg)
        return posts.data
      } catch (error) {
        dispatch(appActions.setError(error))
        return rejectWithValue(null)
      } finally {
        // dispatch(appActions.setDataLoading(false))
      }
    }
  },
)

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addEmptyUser: (state, action: PayloadAction<number>) => {
      state[action.payload] = {}
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      if (action.payload?.id) {
        state[action.payload.id] = action.payload
      }
    })
  },
})

export const usersReducer = usersSlice.reducer

export const usersActions = usersSlice.actions

export const usersThunks = { fetchUser }
