import { RootState } from "../../../app/store"
import {
  getFavouritePosts,
  getFilterByFavourite,
  getFilterByTitle,
  getFilterByUserId,
  getSorting,
  getUsers,
} from "../../../common/slices"
import {
  getFilteredByFavourite,
  getFilteredByTitle,
  getFilteredByUserId,
} from "../../../common/utils"
import { AlbumEntityType } from "../types"

const getAlbums = (state: RootState) => state.photos.albums

const getFilteredAlbums = (state: RootState) => {
  const albums = getAlbums(state)
  const titleFilter = getFilterByTitle(state)
  const userIdFilter = getFilterByUserId(state)
  const favouriteFilter = getFilterByFavourite(state)
  const favouritePostIds = getFavouritePosts(state)

  let filteredAlbums: AlbumEntityType[] | undefined = albums
  if (titleFilter) {
    filteredAlbums = getFilteredByTitle<AlbumEntityType[]>(
      filteredAlbums,
      titleFilter,
    ) as AlbumEntityType[]
  }

  if (userIdFilter && userIdFilter.length > 0) {
    filteredAlbums = getFilteredByUserId<AlbumEntityType[]>(
      filteredAlbums,
      userIdFilter,
    ) as AlbumEntityType[]
  }

  if (favouriteFilter !== undefined) {
    filteredAlbums = getFilteredByFavourite<AlbumEntityType[]>(
      filteredAlbums,
      favouriteFilter,
      favouritePostIds,
    ) as AlbumEntityType[]
  }

  return filteredAlbums
}

export const getSortedAlbums = (state: RootState) => {
  const albums = getFilteredAlbums(state)
  const sorting = getSorting(state)
  const favouritePostsIds = getFavouritePosts(state)
  const users = getUsers(state)
  if (!albums) {
    return []
  }

  if (!sorting) {
    return albums
  }

  if (sorting === "asc Id") {
    return albums.sort((a, b) => a.id - b.id)
  }
  if (sorting === "desc Id") {
    return albums.sort((a, b) => b.id - a.id)
  }

  if (sorting === "asc favourite") {
    return albums.sort((post) => (favouritePostsIds[post.id] ? 1 : -1))
  }

  if (sorting === "desc favourite") {
    return albums.sort((post) => (favouritePostsIds[post.id] ? -1 : 1))
  }

  if (sorting === "asc title") {
    return albums.sort((a, b) => (a.title > b.title ? 1 : -1))
  }
  if (sorting === "desc title") {
    return albums.sort((a, b) => (a.title > b.title ? -1 : 1))
  }

  if (sorting === "asc userName") {
    return albums.sort((a, b) =>
      users[a.userId].name > users[b.userId].name ? 1 : -1,
    )
  }
  if (sorting === "desc userName") {
    return albums.sort((a, b) =>
      users[a.userId].name > users[b.userId].name ? -1 : 1,
    )
  }

  return albums
}
