import { useEffect } from 'react'

import { Image } from 'antd'
import { useParams } from 'react-router-dom'

import { SecondaryText, StyledLoader, useActions, useAppSelector } from '../../../../common'
import { photosThunks, selectIsPhotosLoading, selectPhotos } from '../../slice'
import { AlbumsContentContainer } from '../../styles'

import { PhotoCard } from './styles'

const AlbumPage = () => {
  const { id: albumId } = useParams()

  const isPhotosLoading = useAppSelector(selectIsPhotosLoading)
  const photos = useAppSelector(selectPhotos)

  const { fetchPhotos } = useActions(photosThunks)

  useEffect(() => {
    if (!photos?.length) {
      fetchPhotos(Number(albumId))
    }
  }, [fetchPhotos, albumId])

  if (isPhotosLoading) {
    return <StyledLoader />
  }

  return (
    <AlbumsContentContainer>
      {photos?.map(photo => (
        <PhotoCard key={photo.id}>
          <Image
            src={photo.url}
            alt={'image'}
            placeholder={<Image preview={false} src={photo.thumbnailUrl} placeholder={true} />}
          />
          <SecondaryText>{photo.title}</SecondaryText>
        </PhotoCard>
      ))}
    </AlbumsContentContainer>
  )
}

export default AlbumPage
