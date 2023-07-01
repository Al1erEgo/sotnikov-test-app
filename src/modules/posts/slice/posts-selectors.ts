import { RootState } from '../../../app/store'
import {
  getFavouritePosts,
  getFilterByFavourite,
  getFilterByTitle,
  getFilterByUserId,
  getFilteredByFavourite,
  getFilteredByTitle,
  getFilteredByUserId,
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

  if (!posts) {
    return []
  }

  if (!sorting) {
    return posts
  }

  if (sorting === 'asc Id') {
    return [...posts].sort((a, b) => a.id - b.id)
  }
  if (sorting === 'desc Id') {
    return [...posts].sort((a, b) => b.id - a.id)
  }

  if (sorting === 'asc favourite' && Object.keys(favouritePostsIds).length) {
    return [...posts].sort(post => (favouritePostsIds[post.id] ? 1 : -1))
  }

  if (sorting === 'desc favourite' && Object.keys(favouritePostsIds).length) {
    return [...posts].sort(post => (favouritePostsIds[post.id] ? -1 : 1))
  }

  if (sorting === 'asc title') {
    return [...posts].sort((a, b) => (a.title > b.title ? 1 : -1))
  }
  if (sorting === 'desc title') {
    return [...posts].sort((a, b) => (a.title > b.title ? -1 : 1))
  }

  if (sorting === 'asc userName') {
    return [...posts].sort((a, b) => (users[a.userId].name > users[b.userId].name ? 1 : -1))
  }
  if (sorting === 'desc userName') {
    return [...posts].sort((a, b) => (users[a.userId].name > users[b.userId].name ? -1 : 1))
  }

  return posts
}
