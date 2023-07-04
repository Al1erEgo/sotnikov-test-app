import { createAsyncThunk } from '@reduxjs/toolkit'

import { photosApi } from '../api'
import { AlbumPayloadType, AlbumType, PhotoType } from '../types'

import { photosActions } from './photos-slice'

import { appActions } from '@/app/app-slice'
import { favouriteActions, usersThunks } from '@/common'

const fetchAlbums = createAsyncThunk<AlbumType[], void>(
  'photos/fetchAlbums',
  async (_, { dispatch }) => {
    //TODO убрать дублирующийся фетч пользователей
    try {
      dispatch(usersThunks.fetchUsers())
      dispatch(appActions.setDataLoading(true))
      const albums = await photosApi.getAlbums()

      return albums.data
    } finally {
      dispatch(appActions.setDataLoading(false))
    }
  }
)

const addAlbum = createAsyncThunk<AlbumType, AlbumPayloadType>(
  'photos/addAlbum',
  async ({ title, userId }) => {
    const newAlbum = await photosApi.addAlbum({ title, userId })

    return newAlbum.data
  }
)

const updateAlbum = createAsyncThunk<
  { album: AlbumType; albumId: number },
  {
    albumId: number
    title: string
    userId: number
  }
>('photos/updateAlbum', async ({ albumId, title, userId }, { dispatch }) => {
  try {
    dispatch(photosActions.setAlbumLoadingStatus({ albumId, status: true }))
    const album = await photosApi.updateAlbum(albumId, title, userId)

    return { album: album.data, albumId }
  } finally {
    dispatch(
      photosActions.setAlbumLoadingStatus({
        albumId,
        status: false,
      })
    )
  }
})

const deleteAlbum = createAsyncThunk<number, number>(
  'photos/deleteAlbum',
  async (albumId, { dispatch }) => {
    dispatch(photosActions.setAlbumLoadingStatus({ albumId, status: true }))
    await photosApi.deleteAlbum(albumId)
    dispatch(favouriteActions.deleteAlbumFromFav(albumId))

    return albumId
  }
)

const deleteAlbumsGroup = createAsyncThunk<void, string[]>(
  'photos/deleteAlbumsGroup',
  async (albums, { dispatch }) => {
    try {
      albums.forEach(id => dispatch(photosThunks.deleteAlbum(+id)))
    } finally {
      photosActions.clearSelectedAlbums()
    }
  }
)

const fetchPhotos = createAsyncThunk<PhotoType[], number | undefined>(
  'photos/fetchPhotos',
  async (albumId, { dispatch }) => {
    if (!albumId) {
      throw new Error('Что-то пошло не так :(')
    }
    dispatch(photosActions.setPhotosLoadingStatus(true))
    const photos = await photosApi.getPhotosForAlbum(albumId)

    return photos.data
  }
)

const addAlbumsGroupToFav = createAsyncThunk<void, string[]>(
  'favourite/addAlbumsGroupToFav',
  async (posts, { dispatch }) => {
    try {
      posts.forEach(id => dispatch(favouriteActions.addAlbumToFav(+id)))
    } finally {
      dispatch(photosActions.clearSelectedAlbums())
    }
  }
)

export const photosThunks = {
  fetchAlbums,
  fetchPhotos,
  updateAlbum,
  deleteAlbum,
  deleteAlbumsGroup,
  addAlbum,
  addAlbumsGroupToFav,
}
