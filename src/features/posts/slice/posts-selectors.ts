import { RootState } from "../../../app/store"
import { getFavouritePosts, getUsers } from "../../../common/slices"
import { PostEntityType } from "../types"

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
  const sortingOrder = sorting.split(" ")[0]
  const sortingField = sorting.split(" ")[1]

  if (sorting === "asc Id") {
    return [...posts].sort((a, b) => a.id - b.id)
  }
  if (sorting === "desc Id") {
    return [...posts].sort((a, b) => b.id - a.id)
  }

  if (sortingField === "favourite") {
    let favouritePosts: PostEntityType[] = []
    let unFavouritePosts: PostEntityType[] = []
    posts.forEach((post) => {
      if (Object.keys(favouritePostsIds).find((id) => +id === post.id)) {
        favouritePosts.push(post)
      } else {
        unFavouritePosts.push(post)
      }
    })

    if (sortingOrder === "asc") {
      return [...favouritePosts, ...unFavouritePosts]
    } else {
      return [...unFavouritePosts, ...favouritePosts]
    }
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
