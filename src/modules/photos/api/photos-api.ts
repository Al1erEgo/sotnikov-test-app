import { commonInstance } from "../../../common"
import { AddAlbumArgType, AlbumType, PhotoType } from "../types"

export const photosApi = {
  getAlbums() {
    return commonInstance.get<AlbumType[]>("albums")
  },
  getPhotosForAlbum(albumId: number) {
    return commonInstance.get<PhotoType[]>(`albums/${albumId}/photos`)
  },
  updateAlbum(albumId: number, title: string) {
    return commonInstance.patch<AlbumType>(`albums/${albumId}`, {
      title,
    })
  },
  deleteAlbum(albumId: number) {
    return commonInstance.delete<{}>(`albums/${albumId}`)
  },
  addAlbum(arg: AddAlbumArgType) {
    return commonInstance.post<AlbumType>("posts", arg)
  },
}
