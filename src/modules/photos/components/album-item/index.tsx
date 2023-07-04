import { FC, memo, useState } from 'react'

import { Skeleton } from 'antd'

import {
  photosActions,
  photosThunks,
  selectIsAlbumFavourite,
  selectIsAlbumSelected,
  selectUserByAlbum,
} from '../../slice'
import { AlbumEntityType, AlbumPayloadType } from '../../types'
import { AlbumForm } from '../album-form'

import { AlbumCard, AlbumCardHeaderLink } from './styles'

import {
  ActionsBar,
  favouriteActions,
  SecondaryText,
  useActions,
  useAppSelector,
  useModal,
} from '@/common'

type AlbumItemProps = {
  album: AlbumEntityType
}
export const AlbumItem: FC<AlbumItemProps> = memo(({ album }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const isFavourite = useAppSelector(state => selectIsAlbumFavourite(state, album.id))
  const isSelected = useAppSelector(state => selectIsAlbumSelected(state, album.id))
  const user = useAppSelector(state => selectUserByAlbum(state, album.userId))

  const { deleteAlbum, updateAlbum } = useActions(photosThunks)
  const { changeAlbumSelection } = useActions(photosActions)
  const { changeAlbumFav } = useActions(favouriteActions)

  const { modal: deleteAlbumModal, handleOpenModal } = useModal('Удалить альбом?', () =>
    deleteAlbum(album.id)
  )

  const handleFormSubmit = ({ title, userId }: AlbumPayloadType) => {
    if (album.title !== title || album.userId !== userId)
      updateAlbum({
        albumId: album.id,
        title,
        userId,
      })
    setIsEdit(false)
  }

  if (album.isAlbumLoading) {
    return (
      <AlbumCard favourite={isFavourite ? 'favourite' : ''}>
        <Skeleton paragraph={{ rows: 2 }} />
      </AlbumCard>
    )
  }

  return (
    <AlbumCard edit={isEdit ? 'isEdit' : ''} favourite={isFavourite ? 'favourite' : ''}>
      <ActionsBar
        scale={0.8}
        selected={isSelected}
        favourite={isFavourite}
        onSelect={() => changeAlbumSelection(album.id)}
        onFavourite={() => changeAlbumFav(album.id)}
        onDelete={handleOpenModal}
        onEdit={() => {
          setIsEdit(prev => !prev)
        }}
      />
      {isEdit ? (
        <AlbumForm
          title={album.title}
          userId={user.id}
          onCancel={() => setIsEdit(false)}
          onSubmit={handleFormSubmit}
        />
      ) : (
        <>
          <AlbumCardHeaderLink to={`${album.id}`}>{album.title}</AlbumCardHeaderLink>
          <SecondaryText>by {user?.name}</SecondaryText>
        </>
      )}
      {deleteAlbumModal}
    </AlbumCard>
  )
})
