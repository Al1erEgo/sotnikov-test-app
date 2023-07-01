import { createAsyncThunk } from "@reduxjs/toolkit"
import { AlbumPayloadType, AlbumType, PhotoType } from "../types"
import {
  filtersSortActions,
  handleServerNetworkError,
  usersThunks,
} from "../../../common"
import { appActions } from "../../../app/app-slice"
import { photosApi } from "../api"
import { photosActions } from "./photos-slice"

const fetchAlbums = createAsyncThunk<AlbumType[], void>(
  "photos/fetchAlbums",
  async (_, { dispatch, rejectWithValue }) => {
    //TODO убрать дублирующийся фетч пользователей
    try {
      dispatch(usersThunks.fetchUsers())
      dispatch(appActions.setDataLoading(true))
      dispatch(filtersSortActions.clearFiltersAndSort())
      const albums = await photosApi.getAlbums()
      return albums.data
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(appActions.setDataLoading(false))
    }
  },
)

const addAlbum = createAsyncThunk<AlbumType, AlbumPayloadType>(
  "photos/addAlbum",
  async ({ title, userId }, { dispatch, rejectWithValue }) => {
    try {
      const newAlbum = await photosApi.addAlbum({ title, userId })
      return newAlbum.data
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

const updateAlbum = createAsyncThunk<
  { album: AlbumType; albumId: number },
  {
    albumId: number
    title: string
    userId: number
  }
>(
  "photos/updateAlbum",
  async ({ albumId, title, userId }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(photosActions.setAlbumLoadingStatus({ albumId, status: true }))
      const album = await photosApi.updateAlbum(albumId, title, userId)
      return { album: album.data, albumId }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(
        photosActions.setAlbumLoadingStatus({
          albumId,
          status: false,
        }),
      )
    }
  },
)

const deleteAlbum = createAsyncThunk<number, number>(
  "photos/deleteAlbum",
  async (albumId, { dispatch, rejectWithValue }) => {
    try {
      dispatch(photosActions.setAlbumLoadingStatus({ albumId, status: true }))
      await photosApi.deleteAlbum(albumId)
      return albumId
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

const deleteAlbumsGroup = createAsyncThunk<void, string[]>(
  "photos/deleteAlbumsGroup",
  async (albums, { dispatch, rejectWithValue }) => {
    try {
      albums.forEach((id) => dispatch(photosThunks.deleteAlbum(+id)))
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

const fetchPhotos = createAsyncThunk<PhotoType[], number | undefined>(
  "photos/fetchPhotos",
  async (albumId, { dispatch, rejectWithValue }) => {
    try {
      if (!albumId) {
        throw new Error("Что-то пошло не так :(")
      }
      dispatch(photosActions.setPhotosLoadingStatus(true))
      const photos = await photosApi.getPhotosForAlbum(albumId)
      return photos.data
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const photosThunks = {
  fetchAlbums,
  fetchPhotos,
  updateAlbum,
  deleteAlbum,
  deleteAlbumsGroup,
  addAlbum,
}
