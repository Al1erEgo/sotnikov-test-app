import { createAsyncThunk } from "@reduxjs/toolkit"
import { AddPostPayloadType, CommentType, PostType } from "../types"
import {
  filtersSortActions,
  handleServerNetworkError,
  usersThunks,
} from "../../../common"
import { appActions } from "../../../app/app-slice"
import { postsApi } from "../api"
import { postsActions } from "./posts-slice"

const fetchPosts = createAsyncThunk<PostType[], void>(
  "posts/fetchPosts",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(usersThunks.fetchUsers())
      dispatch(appActions.setDataLoading(true))
      dispatch(filtersSortActions.clearFiltersAndSort())
      const posts = await postsApi.getPosts()
      return posts.data
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(appActions.setDataLoading(false))
    }
  },
)

//Проверка на наличие загруженных комментариев убрана, так как нелогично, но и каждый раз подгружать заново
// не лучшее решение, стоило бы использовать RTK Query с кешированием
//Либо можно TODO сделать проверку на наличие комментариев со сроком жизни в стейте
const fetchComments = createAsyncThunk<
  { comments: CommentType[]; postId: number },
  number
>("posts/fetchComments", async (postId, { dispatch, rejectWithValue }) => {
  try {
    dispatch(
      postsActions.setCommentsLoadingStatus({
        postId,
        status: true,
      }),
    )
    const comments = await postsApi.getCommentsForPost(postId)
    return { comments: comments.data, postId }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  } finally {
    dispatch(
      postsActions.setCommentsLoadingStatus({
        postId,
        status: false,
      }),
    )
  }
})

const addPost = createAsyncThunk<PostType, AddPostPayloadType>(
  "posts/addPost",
  async ({ title, body, userId }, { dispatch, rejectWithValue }) => {
    try {
      const newPost = await postsApi.addPost({ title, body, userId })
      return newPost.data
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

const deletePost = createAsyncThunk<number, number>(
  "posts/deletePost",
  async (postId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(postsActions.setPostLoadingStatus({ postId, status: true }))
      await postsApi.deletePost(postId)
      return postId
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

const deletePostsGroup = createAsyncThunk<void, string[]>(
  "posts/deletePostsGroup",
  async (posts, { dispatch, rejectWithValue }) => {
    try {
      posts.forEach((id) => dispatch(postsThunks.deletePost(+id)))
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

const updatePost = createAsyncThunk<
  { post: PostType; postId: number },
  {
    postId: number
    userId: number
    title: string
    body: string
  }
>(
  "posts/updatePost",
  async ({ postId, userId, title, body }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(postsActions.setPostLoadingStatus({ postId, status: true }))
      const post = await postsApi.updatePost(postId, userId, title, body)
      return { post: post.data, postId }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
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

export const postsThunks = {
  fetchPosts,
  fetchComments,
  addPost,
  deletePost,
  updatePost,
  deletePostsGroup,
}