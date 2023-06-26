import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type AppState = {
  dataLoading: boolean
  error: string | null
}

const initialState: AppState = {
  dataLoading: false,
  error: null,
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDataLoading: (state, action: PayloadAction<boolean>) => {
      state.dataLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const appReducer = appSlice.reducer

export const appActions = appSlice.actions
