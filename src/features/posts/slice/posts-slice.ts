import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Post } from "../types"
import { postsApi } from "../api"

type PostsState = {
  posts: Post[]
  postsLoading: boolean
  postsError: string | null
}

const initialState: PostsState = {
  posts: [],
  postsLoading: false,
  postsError: null,
}

const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const posts = await postsApi.getPosts()
      return posts.data
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPostsLoading: (state, action: PayloadAction<boolean>) => {
      state.postsLoading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.postsLoading = true
        state.postsError = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload
        state.postsLoading = true
        state.postsError = null
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.postsLoading = false
        state.postsError = action.payload as string
      })
  },
})

export const postsReducer = postsSlice.reducer
export const postsThunks = { fetchPosts }
