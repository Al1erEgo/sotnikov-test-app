import { createAsyncThunk } from '@reduxjs/toolkit'

import { postsApi } from '../api'
import { AddPostPayloadType, CommentType, PostType } from '../types'

import { postsActions } from './posts-slice'

import { appActions } from '@/app/app-slice'
import { favouriteActions, usersThunks } from '@/common'

const fetchPosts = createAsyncThunk<PostType[], void>(
  'posts/fetchPosts',
  async (_, { dispatch }) => {
    try {
      dispatch(usersThunks.fetchUsers())
      dispatch(appActions.setDataLoading(true))
      const posts = await postsApi.getPosts()

      return posts.data
    } finally {
      dispatch(appActions.setDataLoading(false))
    }
  }
)

//Проверка на наличие загруженных комментариев убрана, так как нелогично, но и каждый раз подгружать заново
// не лучшее решение, стоило бы использовать RTK Query с кешированием
//Либо можно TODO сделать проверку на наличие комментариев со сроком жизни в стейте
const fetchComments = createAsyncThunk<{ comments: CommentType[]; postId: number }, number>(
  'posts/fetchComments',
  async (postId, { dispatch }) => {
    try {
      dispatch(
        postsActions.setCommentsLoadingStatus({
          postId,
          status: true,
        })
      )
      const comments = await postsApi.getCommentsForPost(postId)

      return { comments: comments.data, postId }
    } finally {
      dispatch(
        postsActions.setCommentsLoadingStatus({
          postId,
          status: false,
        })
      )
    }
  }
)

const addPost = createAsyncThunk<PostType, AddPostPayloadType>(
  'posts/addPost',
  async ({ title, body, userId }) => {
    const newPost = await postsApi.addPost({ title, body, userId })

    return newPost.data
  }
)

const deletePost = createAsyncThunk<number, number>(
  'posts/deletePost',
  async (postId, { dispatch }) => {
    dispatch(postsActions.setPostLoadingStatus({ postId, status: true }))
    await postsApi.deletePost(postId)
    dispatch(favouriteActions.deletePostFromFav(postId))

    return postId
  }
)

const deletePostsGroup = createAsyncThunk<void, string[]>(
  'posts/deletePostsGroup',
  async (posts, { dispatch }) => {
    try {
      posts.forEach(id => dispatch(postsThunks.deletePost(+id)))
    } finally {
      postsActions.clearSelectedPosts()
    }
  }
)

const updatePost = createAsyncThunk<
  { post: PostType; postId: number },
  {
    postId: number
    userId: number
    title: string
    body: string
  }
>('posts/updatePost', async ({ postId, userId, title, body }, { dispatch }) => {
  try {
    dispatch(postsActions.setPostLoadingStatus({ postId, status: true }))
    const post = await postsApi.updatePost(postId, userId, title, body)

    return { post: post.data, postId }
  } finally {
    dispatch(
      postsActions.setPostLoadingStatus({
        postId,
        status: false,
      })
    )
  }
})

const addPostsGroupToFav = createAsyncThunk<void, string[]>(
  'favourite/addPostsGroupToFav',
  async (posts, { dispatch }) => {
    try {
      posts.forEach(id => dispatch(favouriteActions.addPostToFav(+id)))
    } finally {
      dispatch(postsActions.clearSelectedPosts())
    }
  }
)

export const postsThunks = {
  fetchPosts,
  fetchComments,
  addPost,
  deletePost,
  updatePost,
  deletePostsGroup,
  addPostsGroupToFav,
}
