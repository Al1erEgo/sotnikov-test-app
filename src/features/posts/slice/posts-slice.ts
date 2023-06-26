import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { PostType } from "../types"
import { postsApi } from "../api"
import { appActions } from "../../../common/slices"

type PostsState = PostType[]

const initialState: PostsState = []

const fetchPosts = createAsyncThunk<PostType[], void>(
  "posts/fetchPosts",
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(appActions.setDataLoading(true))
    try {
      const posts = await postsApi.getPosts()
      return posts.data
    } catch (error) {
      dispatch(appActions.setError(error))
      return rejectWithValue(null)
    } finally {
      dispatch(appActions.setDataLoading(false))
    }
  },
)

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => action.payload)
  },
})

export const postsReducer = postsSlice.reducer
export const postsThunks = { fetchPosts }
