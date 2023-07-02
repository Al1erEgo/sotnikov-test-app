import { useEffect } from 'react'

import { Image, Typography } from 'antd'
import { useParams } from 'react-router-dom'

import {
  FlexContainer,
  SecondaryText,
  StyledLoader,
  useActions,
  useAppSelector,
} from '../../../../common'
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

  if (!photos?.length) {
    return (
      <FlexContainer>
        <Typography.Text>Альбом пуст :(</Typography.Text>
      </FlexContainer>
    )
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
