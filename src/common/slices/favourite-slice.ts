import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { handleServerNetworkError } from "../utils"
import { postsActions } from "../../modules/posts/slice"
import { photosActions } from "../../modules/photos/slice"

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

const addPostsGroupToFav = createAsyncThunk<void, string[]>(
  "favourite/addPostsGroupToFav",
  async (posts, { dispatch, rejectWithValue }) => {
    try {
      posts.forEach((id) => dispatch(favouriteActions.addPostToFav(+id)))
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(postsActions.clearSelectedPosts())
    }
  },
)

const addAlbumsGroupToFav = createAsyncThunk<void, string[]>(
  "favourite/addAlbumsGroupToFav",
  async (posts, { dispatch, rejectWithValue }) => {
    try {
      posts.forEach((id) => dispatch(favouriteActions.addAlbumToFav(+id)))
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(photosActions.clearSelectedAlbums())
    }
  },
)

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

export const favouriteThunks = { addPostsGroupToFav, addAlbumsGroupToFav }
