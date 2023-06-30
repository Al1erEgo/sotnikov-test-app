import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {AlbumEntityType, AlbumPayloadType, AlbumType, PhotoType,} from "../types"
import {filtersSortActions, usersThunks} from "../../../common/slices"
import {appActions} from "../../../app/app-slice"
import {handleServerNetworkError} from "../../../common/utils"
import {photosApi} from "../api"

//Для фотографий альбома одно поле - для упрощения логики,
//в случае добавления поля каждому альбому усложняется логика,
//а так же появляется необходимость предусматривать кейс, когда приложение открывается
//на странице открытого альбома, а альбомы еще не подгружены

type PhotosStateType = {
  albums: AlbumEntityType[]
  photos?: PhotoType[]
  isPhotosLoading: boolean
  selectedAlbums: {
    [key: string]: boolean
  }
}

const initialState: PhotosStateType = {
  albums: [],
  photos: undefined,
  isPhotosLoading: false,
  selectedAlbums: {},
}

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
  AlbumType,
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
    setPhotosLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isPhotosLoading = action.payload
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
        }))
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.photos = action.payload
        state.isPhotosLoading = false
      })
      .addCase(deleteAlbum.fulfilled, (state, action) => {
        state.albums = state.albums.filter(
          (album) => album.id !== action.payload,
        )
      })
      .addCase(updateAlbum.fulfilled, (state, action) => {
        const albumIndex = state.albums.findIndex(
          (album) => album.id === action.payload.id,
        )
        if (albumIndex !== -1) {
          state.albums[albumIndex] = {
            ...state.albums[albumIndex],
            ...action.payload,
          }
        }
      })
      .addCase(addAlbum.fulfilled, (state, action) => {
        state.albums.push({
          ...action.payload,
          isAlbumLoading: false,
        })
      })
  },
})

export const photosReducer = photosSlice.reducer
export const photosActions = photosSlice.actions
export const photosThunks = {
  fetchAlbums,
  fetchPhotos,
  updateAlbum,
  deleteAlbum,
  deleteAlbumsGroup,
  addAlbum,
}
