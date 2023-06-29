import { RootState } from "../../../app/store"
import { getFavouritePosts, getUsers } from "../../../common/slices"

const getPostsSorting = (state: RootState) => state.posts.sorting
export const getPosts = (state: RootState) => state.posts.posts

export const getSelectedPosts = (state: RootState) => state.posts.selectedPosts
export const getSortedPosts = (state: RootState) => {
  const posts = getPosts(state)
  const sorting = getPostsSorting(state)
  const favouritePostsIds = getFavouritePosts(state)
  const users = getUsers(state)
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

const getFilteredPosts = (state: RootState) => {
  const posts = getSortedPosts(state)
}
