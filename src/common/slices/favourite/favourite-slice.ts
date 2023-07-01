import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type FavouriteState = {
  posts: {
    [key: string]: boolean
  }
  albums: {
    [key: string]: boolean
  }
}

const initialState: FavouriteState = {
  posts: {},
  albums: {},
}

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addPostToFav: (state, action: PayloadAction<number>) => {
      if (!state.posts[action.payload]) {
        state.posts[action.payload] = true
      }
    },
    changePostFav: (state, action: PayloadAction<number>) => {
      if (!state.posts[action.payload]) {
        state.posts[action.payload] = true
      } else {
        delete state.posts[action.payload]
      }
    },
    addAlbumToFav: (state, action: PayloadAction<number>) => {
      if (!state.albums[action.payload]) {
        state.albums[action.payload] = true
      }
    },
    changeAlbumFav: (state, action: PayloadAction<number>) => {
      if (!state.albums[action.payload]) {
        state.albums[action.payload] = true
      } else {
        delete state.albums[action.payload]
      }
    },
  },
})

export const favouriteReducer = favouriteSlice.reducer

export const favouriteActions = favouriteSlice.actions
