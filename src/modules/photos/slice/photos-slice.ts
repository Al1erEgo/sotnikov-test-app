import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AddAlbumPayloadType, AlbumEntityType, AlbumType } from "../types"
import { usersThunks } from "../../../common/slices"
import { appActions } from "../../../app/app-slice"
import { handleServerNetworkError } from "../../../common/utils"
import { photosApi } from "../api"
import { RootState } from "../../../app/store"

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
    try {
      dispatch(usersThunks.fetchUsers())
      dispatch(appActions.setDataLoading(true))
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

const addAlbum = createAsyncThunk<AlbumType, AddAlbumPayloadType>(
  "photos/addAlbum",
  async ({ title, userName }, { dispatch, rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState
      const userId = Object.values(state.users).find(
        (user) => user.name === userName,
      )?.id
      if (userId) {
        const newAlbum = await photosApi.addAlbum({ title, userId })
        return newAlbum.data
      } else {
        throw new Error("Пользователь не найден!")
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
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
    try {
      dispatch(photosActions.setAlbumLoadingStatus({ albumId, status: true }))
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
    } finally {
      dispatch(photosActions.clearSelectedAlbums())
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
      .addCase(addAlbum.fulfilled, (state, action) => {
        state.albums.push({
          ...action.payload,
          isAlbumLoading: false,
          isPhotosLoading: false,
        })
      })
  },
})

export const photosReducer = photosSlice.reducer
export const photosActions = photosSlice.actions
export const photosThunks = {
  fetchAlbums,
  updateAlbum,
  deleteAlbum,
  deleteAlbumsGroup,
  addAlbum,
}
