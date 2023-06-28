import { createSlice } from "@reduxjs/toolkit"

type FavouriteState = {}

const initialState: FavouriteState = {}

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {},
})

export const favouriteReducer = favouriteSlice.reducer

export const favouriteActions = favouriteSlice.actions

export const favouriteThunks = {}
