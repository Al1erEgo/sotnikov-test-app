import { useParams } from "react-router-dom"
import {
  SecondaryText,
  StyledLoader,
  useActions,
  useAppSelector,
} from "../../../../common"
import { Image } from "antd"
import { getIsPhotosLoading, getPhotos, photosThunks } from "../../slice"
import React, { useEffect } from "react"
import { PhotosPagesContentContainer } from "../../styles"
import { StyledPhotoCard } from "../../components/album-card/styles"

const AlbumPage = () => {
  const { id: albumId } = useParams()

  const isPhotosLoading = useAppSelector(getIsPhotosLoading)
  const photos = useAppSelector(getPhotos)

  const { fetchPhotos } = useActions(photosThunks)

  useEffect(() => {
    fetchPhotos(Number(albumId))
  }, [fetchPhotos, albumId])

  if (isPhotosLoading) {
    return <StyledLoader />
  }

  return (
    <PhotosPagesContentContainer>
      {photos?.map((photo) => (
        <StyledPhotoCard key={photo.id}>
          <Image
            src={photo.url}
            alt={"image"}
            placeholder={
              <Image
                preview={false}
                src={photo.thumbnailUrl}
                placeholder={true}
              />
            }
          />
          <SecondaryText>{photo.title}</SecondaryText>
        </StyledPhotoCard>
      ))}
    </PhotosPagesContentContainer>
  )
}

export default AlbumPage
