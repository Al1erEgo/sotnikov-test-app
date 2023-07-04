import { createAsyncThunk } from '@reduxjs/toolkit'

import { usersApi } from '../../api'
import { UserType } from '../../types'

const fetchUsers = createAsyncThunk<UserType[], void>('users/fetchUsers', async () => {
  const users = await usersApi.getUsers()

  return users.data
})

export const usersThunks = { fetchUsers }
