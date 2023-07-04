import { createSlice } from '@reduxjs/toolkit'

import { usersThunks, UserType } from '@/common'

type UsersState = {
  [key: string]: UserType
}

const initialState: UsersState = {}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(usersThunks.fetchUsers.fulfilled, (state, action) => {
      action.payload?.forEach(user => (state[user.id] = user))
    })
  },
})

export const usersReducer = usersSlice.reducer
