import { AlbumType } from "./photos-api-dtos"

export type AlbumEntityType = AlbumType & {
  isAlbumLoading: boolean
  isPhotosLoading: boolean
  photos?: unknown
}
