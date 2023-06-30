import { useParams } from "react-router-dom"

const AlbumPage = () => {
  const { id: albumId } = useParams()
  return <div>Album: {albumId}</div>
}

export default AlbumPage
