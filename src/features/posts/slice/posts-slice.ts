import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CommentType, PostEntityType, PostType } from "../types"
import { postsApi } from "../api"
import { appActions, usersThunks } from "../../../common/slices"
import { RootState } from "../../../app/store"

type PostsState = PostEntityType[]

const initialState: PostsState = []

const fetchPosts = createAsyncThunk<PostType[], void>(
  "posts/fetchPosts",
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(usersThunks.fetchUsers())
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

const fetchComments = createAsyncThunk<
  { comments: CommentType[]; postId: number } | undefined,
  number
>(
  "posts/fetchComments",
  async (postId, { dispatch, rejectWithValue, getState }) => {
    const state = getState() as RootState
    if (!state.posts.find((post) => post.id === postId)?.comments) {
      dispatch(postsActions.addEmptyComments(postId))
      dispatch(
        postsActions.setCommentsLoadingStatus({ postId: postId, status: true }),
      )
      try {
        const comments = await postsApi.getCommentsForPost(postId)
        return { comments: comments.data, postId }
      } catch (error) {
        dispatch(appActions.setError(error))
        return rejectWithValue(null)
      } finally {
        dispatch(
          postsActions.setCommentsLoadingStatus({
            postId,
            status: false,
          }),
        )
      }
    }
  },
)

const deletePost = createAsyncThunk<number, number>(
  "posts/deletePost",
  async (postId, { dispatch, rejectWithValue }) => {
    dispatch(
      postsActions.setPostLoadingStatus({ postId: postId, status: true }),
    )
    try {
      await postsApi.deletePost(postId)
      return postId
    } catch (error) {
      dispatch(appActions.setError(error))
      return rejectWithValue(null)
    }
  },
)

const updatePost = createAsyncThunk<
  PostType,
  {
    postId: number
    title: string
    body: string
  }
>(
  "posts/updatePost",
  async ({ postId, title, body }, { dispatch, rejectWithValue, getState }) => {
    dispatch(postsActions.setPostLoadingStatus({ postId, status: true }))
    try {
      const post = await postsApi.updatePost(postId, title, body)
      return post.data
    } catch (error) {
      dispatch(appActions.setError(error))
      return rejectWithValue(null)
    } finally {
      dispatch(
        postsActions.setPostLoadingStatus({
          postId,
          status: false,
        }),
      )
    }
  },
)

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addEmptyComments: (state, action: PayloadAction<number>) => {
      const post = state.find((post) => post.id === action.payload)
      if (post) {
        post.comments = []
      }
    },
    setCommentsLoadingStatus: (
      state,
      action: PayloadAction<{ postId: number; status: boolean }>,
    ) => {
      const post = state.find((post) => post.id === action.payload.postId)
      if (post) {
        post.isCommentsLoading = action.payload.status
      }
    },
    setPostLoadingStatus: (
      state,
      action: PayloadAction<{ postId: number; status: boolean }>,
    ) => {
      const post = state.find((post) => post.id === action.payload.postId)
      if (post) {
        post.isPostLoading = action.payload.status
      }
    },
    changePostSelection: (state, action: PayloadAction<number>) => {
      const post = state.find((post) => post.id === action.payload)
      if (post) {
        post.selected = !post.selected
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) =>
        action.payload.map((post) => ({
          ...post,
          isPostLoading: false,
          isCommentsLoading: false,
          selected: false,
        })),
      )
      .addCase(fetchComments.fulfilled, (state, action) => {
        const post = state.find((post) => post.id === action.payload?.postId)
        if (action.payload && post) {
          post.comments = action.payload.comments
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        return state.filter((post) => post.id !== action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const postIndex = state.findIndex(
          (post) => post.id === action.payload.id,
        )
        if (postIndex !== -1) {
          state[postIndex] = {
            ...state[postIndex],
            ...action.payload,
          }
        }
      })
  },
})

export const postsReducer = postsSlice.reducer
export const postsActions = postsSlice.actions
export const postsThunks = { fetchPosts, fetchComments, deletePost, updatePost }
