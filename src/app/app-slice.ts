import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { isAxiosError } from '@/common'

type AppState = {
  dataLoading: boolean
  error: string | null
}

const initialState: AppState = {
  dataLoading: false,
  error: null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setDataLoading: (state, action: PayloadAction<boolean>) => {
      state.dataLoading = action.payload
    },
    clearError: state => {
      state.error = null
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      action => {
        return action.type.endsWith('/rejected')
      },
      (state, action) => {
        if (isAxiosError(action.error)) {
          state.error = action.error.message
        }
      }
    )
  },
})

export const appReducer = appSlice.reducer

export const appActions = appSlice.actions
