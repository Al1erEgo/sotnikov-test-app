export type AlbumType = {
  userId: number
  id: number
  title: string
}

export type PhotoType = {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}
