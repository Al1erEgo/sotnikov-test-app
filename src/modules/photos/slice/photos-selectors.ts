import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../../../app/store'
import {
  getFilteredByFavourite,
  getFilteredByTitle,
  getFilteredByUserId,
  getSortedItems,
  selectFavouriteAlbumsIds,
  selectFilterByFavourite,
  selectFilterByTitle,
  selectFilterByUserId,
  selectSorting,
  selectUsers,
} from '../../../common'
import { AlbumEntityType } from '../types'

const selectId = (state: RootState, id: number) => id

const selectAlbums = (state: RootState) => state.photos.albums

export const selectSelectedAlbums = (state: RootState) => state.photos.selectedAlbums

export const selectIsPhotosLoading = (state: RootState) => state.photos.isPhotosLoading

export const selectPhotos = (state: RootState) => state.photos.photos

export const selectIsAlbumFavourite = createSelector(
  [selectFavouriteAlbumsIds, selectId],
  (favouritePosts, postId) => favouritePosts[postId]
)

export const selectIsAlbumSelected = createSelector(
  [selectSelectedAlbums, selectId],
  (selectedPosts, postId) => selectedPosts[postId]
)

// export const selectUserByAlbum = createSelector(
//   [selectUsers, selectId],
//   (users, userId) => users[userId]
// )
export const selectUserByAlbum = (state: RootState, userId: number) => {
  const users = selectUsers(state)

  return users[userId]
}

const selectFilteredAlbums = (state: RootState) => {
  const albums = selectAlbums(state)
  const titleFilter = selectFilterByTitle(state)
  const userIdFilter = selectFilterByUserId(state)
  const favouriteFilter = selectFilterByFavourite(state)
  const favouriteAlbumsIds = selectFavouriteAlbumsIds(state)

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

export const selectSortedAlbums = (state: RootState) => {
  const albums = selectFilteredAlbums(state)
  const sorting = selectSorting(state)
  const favouriteAlbumsIds = selectFavouriteAlbumsIds(state)
  const users = selectUsers(state)

  return getSortedItems(albums, sorting, favouriteAlbumsIds, users)
}
