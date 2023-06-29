import { PostEntityType } from "../types"

export const getFilteredPostsByTitle = (
  posts: PostEntityType[] | undefined,
  titleFilter: string,
): PostEntityType[] | undefined => {
  return posts?.filter((post) => post.title.includes(titleFilter))
}

export const getFilteredPostsByUserId = (
  posts: PostEntityType[] | undefined,
  userIdFilter: number[],
) => {
  return posts?.filter((post) => userIdFilter.find((id) => id === post.userId))
}

export const getFilteredPostsByFavourite = (
  posts: PostEntityType[] | undefined,
  favouriteFilter: boolean,
  favouritePostIds: { [p: string]: boolean },
) => {
  return posts?.filter(
    (post) => !!favouritePostIds[post.id] === favouriteFilter,
  )
}
