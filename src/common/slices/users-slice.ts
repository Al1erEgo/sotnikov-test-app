import { UserType } from "../types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { appActions } from "./app-slice"
import { usersApi } from "../api"

type UsersState = {
  [key: string]: UserType
}

const initialState: UsersState = {}

const fetchUsers = createAsyncThunk<UserType[], void>(
  "users/fetchUser",
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      const posts = await usersApi.getUsers()
      return posts.data
    } catch (error) {
      dispatch(appActions.setError(error))
      return rejectWithValue(null)
    }
  },
)

const updateUserName = createAsyncThunk<
  UserType,
  { userName: string; userId: number }
>("users/updateUserName", async (arg, { dispatch, rejectWithValue }) => {
  try {
    const updatedUser = await usersApi.updateUserName(arg.userName, arg.userId)
    return updatedUser.data
  } catch (error) {
    dispatch(appActions.setError(error))
    return rejectWithValue(null)
  }
})

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        action.payload.forEach((user) => (state[user.id] = user))
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        state[action.payload.id] = action.payload
      })
  },
})

export const usersReducer = usersSlice.reducer

export const usersActions = usersSlice.actions

export const usersThunks = { fetchUsers, updateUserName }
