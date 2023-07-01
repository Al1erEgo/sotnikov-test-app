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
