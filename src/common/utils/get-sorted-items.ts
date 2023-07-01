import { COMMON_SORTING_DIRECTIONS } from '../constants/common-sorting-directions'
import { EntitiesType, UserType } from '../types'

export const getSortedItems = <T extends EntitiesType>(
  items: T,
  sorting: string | undefined,
  favouriteIds: { [p: string]: boolean },
  users: {
    [key: string]: UserType
  }
) => {
  if (!items) {
    return []
  }

  if (!sorting) {
    return items
  }

  if (sorting === COMMON_SORTING_DIRECTIONS.asc.id) {
    return [...items].sort((a, b) => a.id - b.id)
  }
  if (sorting === COMMON_SORTING_DIRECTIONS.desc.id) {
    return [...items].sort((a, b) => b.id - a.id)
  }

  if (sorting === COMMON_SORTING_DIRECTIONS.asc.favourite && Object.keys(favouriteIds).length) {
    return [...items].sort(post => (favouriteIds[post.id] ? 1 : -1))
  }

  if (sorting === COMMON_SORTING_DIRECTIONS.desc.favourite && Object.keys(favouriteIds).length) {
    return [...items].sort(post => (favouriteIds[post.id] ? -1 : 1))
  }

  if (sorting === COMMON_SORTING_DIRECTIONS.asc.title) {
    return [...items].sort((a, b) => (a.title > b.title ? 1 : -1))
  }
  if (sorting === COMMON_SORTING_DIRECTIONS.desc.title) {
    return [...items].sort((a, b) => (a.title > b.title ? -1 : 1))
  }

  if (sorting === COMMON_SORTING_DIRECTIONS.asc.userName) {
    return [...items].sort((a, b) => (users[a.userId].name > users[b.userId].name ? 1 : -1))
  }
  if (sorting === COMMON_SORTING_DIRECTIONS.desc.userName) {
    return [...items].sort((a, b) => (users[a.userId].name > users[b.userId].name ? -1 : 1))
  }

  return items
}
