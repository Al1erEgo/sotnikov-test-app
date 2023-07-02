import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../../../app/store'
import {
  getFavouritePosts,
  getFilterByFavourite,
  getFilterByTitle,
  getFilterByUserId,
  getFilteredByFavourite,
  getFilteredByTitle,
  getFilteredByUserId,
  getSortedItems,
  getSorting,
  getUsers,
} from '../../../common'
import { PostEntityType } from '../types'

export const getPosts = (state: RootState) => state.posts.posts

export const getSelectedPosts = (state: RootState) => state.posts.selectedPosts

const getId = (state: RootState, id: number) => id

export const getIsPostFavourite = createSelector(
  [getFavouritePosts, getId],
  (favouritePosts, postId) => favouritePosts[postId]
)

export const getIsPostSelected = createSelector(
  [getSelectedPosts, getId],
  (selectedPosts, postId) => selectedPosts[postId]
)

//проблема с досупом к getUsers селектору
//export const getUserByPost = createSelector([getUsers, getId], (users, userId) => users[postId])
export const getUserByPost = (state: RootState, userId: number) => {
  const users = getUsers(state)

  return users[userId]
}

const getFilteredPosts = (state: RootState) => {
  const posts = getPosts(state)
  const titleFilter = getFilterByTitle(state)
  const userIdFilter = getFilterByUserId(state)
  const favouriteFilter = getFilterByFavourite(state)
  const favouritePostIds = getFavouritePosts(state)

  let filteredPosts: PostEntityType[] | undefined = posts

  if (titleFilter) {
    filteredPosts = getFilteredByTitle(filteredPosts, titleFilter) as PostEntityType[]
  }

  if (userIdFilter && userIdFilter.length > 0) {
    filteredPosts = getFilteredByUserId(filteredPosts, userIdFilter) as PostEntityType[]
  }

  if (favouriteFilter !== undefined) {
    filteredPosts = getFilteredByFavourite(
      filteredPosts,
      favouriteFilter,
      favouritePostIds
    ) as PostEntityType[]
  }

  return filteredPosts
}

export const getSortedPosts = (state: RootState) => {
  const posts = getFilteredPosts(state)
  const sorting = getSorting(state)
  const favouritePostsIds = getFavouritePosts(state)
  const users = getUsers(state)

  return getSortedItems(posts, sorting, favouritePostsIds, users)
}
