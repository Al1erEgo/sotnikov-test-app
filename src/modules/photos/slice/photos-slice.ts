import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {AlbumEntityType, PhotoType} from "../types"
import {photosThunks} from "./photos-thunks"

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
      .addCase(photosThunks.fetchAlbums.fulfilled, (state, action) => {
        state.albums = action.payload.map((album) => ({
          ...album,
          isAlbumLoading: false,
        }))
      })
      .addCase(photosThunks.fetchPhotos.fulfilled, (state, action) => {
        state.photos = action.payload
        state.isPhotosLoading = false
      })
      .addCase(photosThunks.deleteAlbum.fulfilled, (state, action) => {
        state.albums = state.albums.filter(
          (album) => album.id !== action.payload,
        )
        delete state.selectedAlbums[action.payload]
      })
      .addCase(photosThunks.updateAlbum.fulfilled, (state, action) => {
        const albumIndex = state.albums.findIndex(
          (album) => album.id === action.payload.albumId,
        )
        if (albumIndex !== -1) {
          state.albums[albumIndex] = {
            ...state.albums[albumIndex],
            ...action.payload.album,
          }
        }
      })
      .addCase(photosThunks.addAlbum.fulfilled, (state, action) => {
        state.albums.push({
          ...action.payload,
          isAlbumLoading: false,
        })
      })
  },
})

export const photosReducer = photosSlice.reducer
export const photosActions = photosSlice.actions
