import { createAsyncThunk } from '@reduxjs/toolkit'

import { photosActions } from '../../../modules/photos/slice'
import { postsActions } from '../../../modules/posts/slice'
import { handleServerNetworkError } from '../../utils'

import { favouriteActions } from './favourite-slice'

const addPostsGroupToFav = createAsyncThunk<void, string[]>(
  'favourite/addPostsGroupToFav',
  async (posts, { dispatch, rejectWithValue }) => {
    try {
      posts.forEach(id => dispatch(favouriteActions.addPostToFav(+id)))
    } catch (error) {
      handleServerNetworkError(error, dispatch)

      return rejectWithValue(null)
    } finally {
      dispatch(postsActions.clearSelectedPosts())
    }
  }
)

const addAlbumsGroupToFav = createAsyncThunk<void, string[]>(
  'favourite/addAlbumsGroupToFav',
  async (posts, { dispatch, rejectWithValue }) => {
    try {
      posts.forEach(id => dispatch(favouriteActions.addAlbumToFav(+id)))
    } catch (error) {
      handleServerNetworkError(error, dispatch)

      return rejectWithValue(null)
    } finally {
      dispatch(photosActions.clearSelectedAlbums())
    }
  }
)

export const favouriteThunks = { addPostsGroupToFav, addAlbumsGroupToFav }
