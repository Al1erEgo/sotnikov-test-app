import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
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

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
      state.albums = action.payload.map((album) => ({
        ...album,
        isAlbumLoading: false,
        isPhotosLoading: false,
      }))
    })
  },
})

export const photosReducer = photosSlice.reducer
export const photosActions = photosSlice.actions
export const photosThunks = { fetchAlbums }
