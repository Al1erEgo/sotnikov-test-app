import { UserType } from "../types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { usersApi } from "../api"
import { handleServerNetworkError } from "../utils"

type UsersState = {
  [key: string]: UserType
}

const initialState: UsersState = {}

const fetchUsers = createAsyncThunk<UserType[], void>(
  "users/fetchUsers",
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      const users = await usersApi.getUsers()
      return users.data
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      action.payload.forEach((user) => (state[user.id] = user))
    })
  },
})

export const usersReducer = usersSlice.reducer

export const usersThunks = { fetchUsers }
