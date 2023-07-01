import { commonInstance } from '../../../common'
import { AlbumPayloadType, AlbumType, PhotoType } from '../types'

export const photosApi = {
  getAlbums() {
    return commonInstance.get<AlbumType[]>('albums')
  },
  getPhotosForAlbum(albumId: number) {
    return commonInstance.get<PhotoType[]>(`albums/${albumId}/photos`)
  },
  updateAlbum(albumId: number, title: string, userId: number) {
    return commonInstance.patch<AlbumType>(`albums/${albumId}`, {
      title,
      userId,
    })
  },
  deleteAlbum(albumId: number) {
    return commonInstance.delete<{}>(`albums/${albumId}`)
  },
  addAlbum(arg: AlbumPayloadType) {
    return commonInstance.post<AlbumType>('posts', arg)
  },
}
