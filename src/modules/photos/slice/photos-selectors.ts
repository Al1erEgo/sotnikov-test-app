import { RootState } from '../../../app/store'
import {
  getFavouriteAlbums,
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
import { AlbumEntityType } from '../types'

const getAlbums = (state: RootState) => state.photos.albums

export const getSelectedAlbums = (state: RootState) => state.photos.selectedAlbums

export const getIsPhotosLoading = (state: RootState) => state.photos.isPhotosLoading

export const getPhotos = (state: RootState) => state.photos.photos

const getFilteredAlbums = (state: RootState) => {
  const albums = getAlbums(state)
  const titleFilter = getFilterByTitle(state)
  const userIdFilter = getFilterByUserId(state)
  const favouriteFilter = getFilterByFavourite(state)
  const favouriteAlbumsIds = getFavouriteAlbums(state)

  let filteredAlbums: AlbumEntityType[] | undefined = albums

  if (titleFilter) {
    filteredAlbums = getFilteredByTitle<AlbumEntityType[]>(
      filteredAlbums,
      titleFilter
    ) as AlbumEntityType[]
  }

  if (userIdFilter && userIdFilter.length > 0) {
    filteredAlbums = getFilteredByUserId<AlbumEntityType[]>(
      filteredAlbums,
      userIdFilter
    ) as AlbumEntityType[]
  }

  if (favouriteFilter !== undefined) {
    filteredAlbums = getFilteredByFavourite<AlbumEntityType[]>(
      filteredAlbums,
      favouriteFilter,
      favouriteAlbumsIds
    ) as AlbumEntityType[]
  }

  return filteredAlbums
}

export const getSortedAlbums = (state: RootState) => {
  const albums = getFilteredAlbums(state)
  const sorting = getSorting(state)
  const favouriteAlbumsIds = getFavouriteAlbums(state)
  const users = getUsers(state)

  return getSortedItems(albums, sorting, favouriteAlbumsIds, users)
}
