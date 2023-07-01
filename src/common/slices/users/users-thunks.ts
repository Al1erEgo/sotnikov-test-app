import { createAsyncThunk } from "@reduxjs/toolkit"
import { UserType } from "../../types"
import { usersApi } from "../../api"
import { handleServerNetworkError } from "../../utils"

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

export const usersThunks = { fetchUsers }
