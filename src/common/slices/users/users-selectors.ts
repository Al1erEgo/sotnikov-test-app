import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../../../app/store'

export const selectUsers = (state: RootState) => state.users
export const selectUsersNames = createSelector(selectUsers, users => Object.values(users))
