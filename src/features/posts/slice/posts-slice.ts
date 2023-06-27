import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CommentType, PostEntityType, PostType } from "../types"
import { postsApi } from "../api"
import { appActions } from "../../../common/slices"
import { RootState } from "../../../app/store"

type PostsState = PostEntityType[]

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

const fetchComments = createAsyncThunk<CommentType[] | void, number>(
  "posts/fetchComments",
  async (postId, { dispatch, rejectWithValue, getState }) => {
    const state = getState() as RootState
    if (!state.posts[postId].comments) {
      dispatch(postsActions.addEmptyComments(postId))
      dispatch(
        postsActions.setCommentsLoadingStatus({ postId: postId, status: true }),
      )
      try {
        const comments = await postsApi.getCommentsForPost(postId)
        return comments.data
      } catch (error) {
        dispatch(appActions.setError(error))
        return rejectWithValue(null)
      } finally {
        dispatch(
          postsActions.setCommentsLoadingStatus({
            postId: postId,
            status: false,
          }),
        )
      }
    }
  },
)

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addEmptyComments: (state, action: PayloadAction<number>) => {
      state[action.payload].comments = []
    },
    setCommentsLoadingStatus: (
      state,
      action: PayloadAction<{ postId: number; status: boolean }>,
    ) => {
      state[action.payload.postId].isCommentsLoading = action.payload.status
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) =>
        action.payload.map((post) => ({
          ...post,
          isPostLoading: false,
          isCommentsLoading: false,
        })),
      )
      .addCase(fetchComments.fulfilled, (state, action) => {
        if (action.payload) {
          state[action.payload[0].postId].comments = action.payload
        }
      })
  },
})

export const postsReducer = postsSlice.reducer
export const postsActions = postsSlice.actions
export const postsThunks = { fetchPosts, fetchComments }
