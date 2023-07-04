import { createAsyncThunk } from '@reduxjs/toolkit'

import { RootState } from '@/app/store'
import { usersApi, UserType } from '@/common'

const fetchUsers = createAsyncThunk<UserType[] | undefined, void>(
  'users/fetchUsers',
  async (_, { getState }) => {
    const state = getState() as RootState

    if (!Object.keys(state.users).length) {
      const users = await usersApi.getUsers()

      return users.data
    }
  }
)

export const usersThunks = { fetchUsers }
