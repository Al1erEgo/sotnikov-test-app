import { commonInstance } from "../../../common"
import { AlbumType } from "../types"

export const photosApi = {
  getAlbums() {
    return commonInstance.get<AlbumType[]>("albums")
  },
  updateAlbum(albumId: number, title: string) {
    return commonInstance.patch<AlbumType>(`albums/${albumId}`, {
      title,
    })
  },
  deleteAlbum(albumId: number) {
    return commonInstance.delete<{}>(`albums/${albumId}`)
  },
}
