import { AlbumType } from "./photos-api-dtos"

export type AlbumPayloadType = Omit<AlbumType, "id">
