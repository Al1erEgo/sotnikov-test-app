import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AlbumEntityType, AlbumType } from "../types"
import { usersThunks } from "../../../common/slices"
import { appActions } from "../../../app/app-slice"
import { handleServerNetworkError } from "../../../common/utils"
import { photosApi } from "../api"

type PhotosStateType = {
  albums: AlbumEntityType[]
  selectedAlbums: {
    [key: string]: boolean
  }
}

const initialState: PhotosStateType = {
  albums: [],
  selectedAlbums: {},
}

const fetchAlbums = createAsyncThunk<AlbumType[], void>(
  "photos/fetchAlbums",
  async (_, { dispatch, rejectWithValue }) => {
    //TODO убрать дублирующийся фетч пользователей
    dispatch(usersThunks.fetchUsers())
    dispatch(appActions.setDataLoading(true))
    try {
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

const updateAlbum = createAsyncThunk<
  AlbumType,
  {
    albumId: number
    title: string
  }
>(
  "photos/updateAlbum",
  async ({ albumId, title }, { dispatch, rejectWithValue }) => {
    dispatch(photosActions.setAlbumLoadingStatus({ albumId, status: true }))
    try {
      const album = await photosApi.updateAlbum(albumId, title)
      return album.data
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
    dispatch(photosActions.setAlbumLoadingStatus({ albumId, status: true }))
    try {
      await photosApi.deleteAlbum(albumId)
      return albumId
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setAlbumLoadingStatus: (
      state,
      action: PayloadAction<{ albumId: number; status: boolean }>,
    ) => {
      const album = state.albums.find(
        (album) => album.id === action.payload.albumId,
      )
      if (album) {
        album.isAlbumLoading = action.payload.status
      }
    },
    changeAlbumSelection: (state, action: PayloadAction<number>) => {
      if (!state.selectedAlbums[action.payload]) {
        state.selectedAlbums[action.payload] = true
      } else {
        delete state.selectedAlbums[action.payload]
      }
    },
    clearSelectedAlbums: (state) => {
      state.selectedAlbums = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.albums = action.payload.map((album) => ({
          ...album,
          isAlbumLoading: false,
          isPhotosLoading: false,
        }))
      })
      .addCase(deleteAlbum.fulfilled, (state, action) => {
        state.albums = state.albums.filter(
          (album) => album.id !== action.payload,
        )
      })
      .addCase(updateAlbum.fulfilled, (state, action) => {
        const postIndex = state.albums.findIndex(
          (album) => album.id === action.payload.id,
        )
        if (postIndex !== -1) {
          state.albums[postIndex] = {
            ...state.albums[postIndex],
            ...action.payload,
          }
        }
      })
  },
})

export const photosReducer = photosSlice.reducer
export const photosActions = photosSlice.actions
export const photosThunks = { fetchAlbums, updateAlbum, deleteAlbum }
