import { useEffect } from "react"
import { useActions } from "../../../../common"
import { photosThunks } from "../../slice"

const AlbumsPage = () => {
  const { fetchAlbums } = useActions(photosThunks)

  useEffect(() => {
    fetchAlbums()
  }, [])
  return <div>Albums</div>
}

export default AlbumsPage
