import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PostEntityType } from "../types"
import { postsThunks } from "./posts-thunks"

type PostsStateType = {
  posts: PostEntityType[]
  selectedPosts: {
    [key: string]: boolean
  }
}

const initialState: PostsStateType = {
  posts: [],
  selectedPosts: {},
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
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
    clearSelectedPosts: (state) => {
      state.selectedPosts = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postsThunks.fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload.map((post) => ({
          ...post,
          isPostLoading: false,
          isCommentsLoading: false,
        }))
      })
      .addCase(postsThunks.fetchComments.fulfilled, (state, action) => {
        const post = state.posts.find(
          (post) => post.id === action.payload?.postId,
        )
        if (action.payload && post) {
          post.comments = action.payload.comments
        }
      })
      .addCase(postsThunks.addPost.fulfilled, (state, action) => {
        state.posts.push({
          ...action.payload,
          isPostLoading: false,
          isCommentsLoading: false,
        })
      })
      .addCase(postsThunks.deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload)
        delete state.selectedPosts[action.payload]
      })
      .addCase(postsThunks.updatePost.fulfilled, (state, action) => {
        const postIndex = state.posts.findIndex(
          (post) => post.id === action.payload.postId,
        )
        if (postIndex !== -1) {
          state.posts[postIndex] = {
            ...state.posts[postIndex],
            ...action.payload.post,
          }
        }
      })
  },
})

export const postsReducer = postsSlice.reducer
export const postsActions = postsSlice.actions
