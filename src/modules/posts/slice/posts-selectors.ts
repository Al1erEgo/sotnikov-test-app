import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../../../app/store'
import {
  getFilteredByFavourite,
  getFilteredByTitle,
  getFilteredByUserId,
  getSortedItems,
  selectFavouritePostsIds,
  selectFilterByFavourite,
  selectFilterByTitle,
  selectFilterByUserId,
  selectSorting,
  selectUsers,
} from '../../../common'
import { PostEntityType } from '../types'

const selectId = (state: RootState, id: number) => id

export const selectPosts = (state: RootState) => state.posts.posts

export const selectSelectedPosts = (state: RootState) => state.posts.selectedPosts

export const selectIsPostFavourite = createSelector(
  [selectFavouritePostsIds, selectId],
  (favouritePosts, postId) => favouritePosts[postId]
)

export const selectIsPostSelected = createSelector(
  [selectSelectedPosts, selectId],
  (selectedPosts, postId) => selectedPosts[postId]
)

//проблема с доступом к selectUsers селектору
//export const selectUserByPost = createSelector([selectUsers, selectId], (users, userId) => users[userId])
export const selectUserByPost = (state: RootState, userId: number) => {
  const users = selectUsers(state)

  return users[userId]
}

const selectFilteredPosts = (state: RootState) => {
  const posts = selectPosts(state)
  const titleFilter = selectFilterByTitle(state)
  const userIdFilter = selectFilterByUserId(state)
  const favouriteFilter = selectFilterByFavourite(state)
  const favouritePostIds = selectFavouritePostsIds(state)

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

export const selectSortedPosts = (state: RootState) => {
  const posts = selectFilteredPosts(state)
  const sorting = selectSorting(state)
  const favouritePostsIds = selectFavouritePostsIds(state)
  const users = selectUsers(state)

  return getSortedItems(posts, sorting, favouritePostsIds, users)
}
