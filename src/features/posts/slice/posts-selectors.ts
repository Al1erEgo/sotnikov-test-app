import { RootState } from "../../../app/store"
import { getFavouritePosts, getUsers } from "../../../common/slices"
import { PostEntityType } from "../types"
import {
  getFilteredPostsByFavourite,
  getFilteredPostsByTitle,
  getFilteredPostsByUserId,
} from "../utils"

export const getPostsSorting = (state: RootState) => state.posts.sorting
export const getPosts = (state: RootState) => state.posts.posts

export const getPostsFilterByTitle = (state: RootState) =>
  state.posts.filter.title

export const getPostsFilterByUserId = (state: RootState) =>
  state.posts.filter.userId

export const getPostsFilterByFavourite = (state: RootState) =>
  state.posts.filter.favourite

export const getSelectedPosts = (state: RootState) => state.posts.selectedPosts

const getFilteredPosts = (state: RootState) => {
  const posts = getPosts(state)
  const titleFilter = getPostsFilterByTitle(state)
  const userIdFilter = getPostsFilterByUserId(state)
  const favouriteFilter = getPostsFilterByFavourite(state)
  const favouritePostIds = getFavouritePosts(state)

  let filteredPosts: PostEntityType[] | undefined = [...posts]
  if (titleFilter) {
    filteredPosts = getFilteredPostsByTitle(filteredPosts, titleFilter)
  }

  if (userIdFilter && userIdFilter.length > 0) {
    filteredPosts = getFilteredPostsByUserId(filteredPosts, userIdFilter)
  }

  if (favouriteFilter !== undefined) {
    filteredPosts = getFilteredPostsByFavourite(
      filteredPosts,
      favouriteFilter,
      favouritePostIds,
    )
  }

  return filteredPosts
}
export const getSortedPosts = (state: RootState) => {
  const posts = getFilteredPosts(state)
  const sorting = getPostsSorting(state)
  const favouritePostsIds = getFavouritePosts(state)
  const users = getUsers(state)
  if (!posts) {
    return []
  }

  if (!sorting) {
    return posts
  }

  if (sorting === "asc Id") {
    return [...posts].sort((a, b) => a.id - b.id)
  }
  if (sorting === "desc Id") {
    return [...posts].sort((a, b) => b.id - a.id)
  }

  if (sorting === "asc favourite") {
    return [...posts].sort((post) => (favouritePostsIds[post.id] ? 1 : -1))
  }

  if (sorting === "desc favourite") {
    return [...posts].sort((post) => (favouritePostsIds[post.id] ? -1 : 1))
  }

  if (sorting === "asc title") {
    return [...posts].sort((a, b) => (a.title > b.title ? 1 : -1))
  }
  if (sorting === "desc title") {
    return [...posts].sort((a, b) => (a.title > b.title ? -1 : 1))
  }

  if (sorting === "asc userName") {
    return [...posts].sort((a, b) =>
      users[a.userId].name > users[b.userId].name ? 1 : -1,
    )
  }
  if (sorting === "desc userName") {
    return [...posts].sort((a, b) =>
      users[a.userId].name > users[b.userId].name ? -1 : 1,
    )
  }

  return posts
}
