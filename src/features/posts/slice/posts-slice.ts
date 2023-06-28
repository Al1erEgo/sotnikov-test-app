import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CommentType, PostEntityType, PostType } from "../types"
import { postsApi } from "../api"
import {
  appActions,
  favouriteActions,
  usersThunks,
} from "../../../common/slices"
import { RootState } from "../../../app/store"

type PostsState = {
  posts: PostEntityType[]
  selectedPosts: {
    [key: string]: boolean
  }
}

const initialState: PostsState = {
  posts: [],
  selectedPosts: {},
}

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
    if (!state.posts.posts.find((post) => post.id === postId)?.comments) {
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

const addPostsGroupToFav = createAsyncThunk<void, string[]>(
  "favourite/addPostsGroupToFav",
  async (posts, { dispatch, rejectWithValue }) => {
    try {
      posts.forEach((id) => dispatch(favouriteActions.addPostToFav(+id)))
    } catch (error) {
      dispatch(appActions.setError(error))
      return rejectWithValue(null)
    } finally {
      dispatch(postsActions.clearSelectedPosts())
    }
  },
)

const deletePostsGroup = createAsyncThunk<void, string[]>(
  "posts/deletePostsGroup",
  async (posts, { dispatch, rejectWithValue }) => {
    try {
      posts.forEach((id) => dispatch(postsThunks.deletePost(+id)))
    } catch (error) {
      dispatch(appActions.setError(error))
      return rejectWithValue(null)
    } finally {
      dispatch(postsActions.clearSelectedPosts())
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
      const post = state.posts.find((post) => post.id === action.payload)
      if (post) {
        post.comments = []
      }
    },
    setCommentsLoadingStatus: (
      state,
      action: PayloadAction<{ postId: number; status: boolean }>,
    ) => {
      const post = state.posts.find((post) => post.id === action.payload.postId)
      if (post) {
        post.isCommentsLoading = action.payload.status
      }
    },
    setPostLoadingStatus: (
      state,
      action: PayloadAction<{ postId: number; status: boolean }>,
    ) => {
      const post = state.posts.find((post) => post.id === action.payload.postId)
      if (post) {
        post.isPostLoading = action.payload.status
      }
    },
    changePostSelection: (state, action: PayloadAction<number>) => {
      if (!state.selectedPosts[action.payload]) {
        state.selectedPosts[action.payload] = true
      } else {
        delete state.selectedPosts[action.payload]
      }
    },
    clearSelectedPosts: (state, action: PayloadAction<void>) => {
      state.selectedPosts = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload.map((post) => ({
          ...post,
          isPostLoading: false,
          isCommentsLoading: false,
        }))
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const post = state.posts.find(
          (post) => post.id === action.payload?.postId,
        )
        if (action.payload && post) {
          post.comments = action.payload.comments
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const postIndex = state.posts.findIndex(
          (post) => post.id === action.payload.id,
        )
        if (postIndex !== -1) {
          state.posts[postIndex] = {
            ...state.posts[postIndex],
            ...action.payload,
          }
        }
      })
  },
})

export const postsReducer = postsSlice.reducer
export const postsActions = postsSlice.actions
export const postsThunks = {
  fetchPosts,
  fetchComments,
  deletePost,
  updatePost,
  addPostsGroupToFav,
  deletePostsGroup,
}
