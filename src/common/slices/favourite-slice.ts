import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type FavouriteState = {
  postsId: {
    [key: string]: boolean
  }
}

const initialState: FavouriteState = {
  postsId: {},
}

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addPostToFav: (state, action: PayloadAction<number>) => {
      if (!state.postsId[action.payload]) {
        state.postsId[action.payload] = true
      }
    },
    changePostFav: (state, action: PayloadAction<number>) => {
      if (!state.postsId[action.payload]) {
        state.postsId[action.payload] = true
      } else {
        delete state.postsId[action.payload]
      }
    },
  },
})

export const favouriteReducer = favouriteSlice.reducer

export const favouriteActions = favouriteSlice.actions

export const favouriteThunks = {}
