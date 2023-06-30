import { useParams } from "react-router-dom"
import { useActions, useAppSelector } from "../../../../common"
import { photosThunks } from "../../slice"
import React, { useEffect } from "react"
import { StyledLoader } from "../../../../common/styles/common-styled-components"
import { getIsPhotosLoading, getPhotos } from "../../slice/photos-selectors"
import { Card } from "antd"

const AlbumPage = () => {
  const { id: albumId } = useParams()

  const isPhotosLoading = useAppSelector(getIsPhotosLoading)
  const photos = useAppSelector(getPhotos)

  const { fetchPhotos } = useActions(photosThunks)

  useEffect(() => {
    fetchPhotos(Number(albumId))
  }, [albumId])

  if (isPhotosLoading) {
    return <StyledLoader />
  }

  return (
    <>
      {photos?.map((photo) => (
        <Card key={photo.id}>
          <img src={photo.thumbnailUrl} alt={"thumbnail"} />
        </Card>
      ))}
    </>
  )
}

export default AlbumPage
