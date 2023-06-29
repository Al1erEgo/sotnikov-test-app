import { commonInstance } from "../../../common"
import { AlbumType } from "../types"

export const photosApi = {
  getAlbums() {
    return commonInstance.get<AlbumType[]>("albums")
  },
}
