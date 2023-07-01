import { FC, memo, useState } from "react"
import { AlbumEntityType, AlbumPayloadType } from "../../types"
import { AlbumCardHeaderLink, StyledAlbumCard } from "./styles"
import {
  ActionsBar,
  favouriteActions,
  SecondaryText,
  useActions,
  useAppSelector,
  useModal,
} from "../../../../common"
import { photosActions, photosThunks } from "../../slice"
import { Skeleton } from "antd"
import { AlbumForm } from "../album-form"

type AlbumCardProps = {
  album: AlbumEntityType
}
export const AlbumCard: FC<AlbumCardProps> = memo(({ album }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const isFavourite = useAppSelector(
    (state) => state.favourite.albums[album.id],
  )
  const isSelected = useAppSelector(
    (state) => state.photos.selectedAlbums[album.id],
  )
  const user = useAppSelector((state) => state.users[album.userId])

  const { deleteAlbum, updateAlbum } = useActions(photosThunks)
  const { changeAlbumSelection } = useActions(photosActions)
  const { changeAlbumFav } = useActions(favouriteActions)

  const { modal: deleteAlbumModal, handleOpenModal } = useModal(
    "Удалить альбом?",
    () => deleteAlbum(album.id),
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
      <StyledAlbumCard favourite={isFavourite ? "favourite" : ""}>
        <Skeleton paragraph={{ rows: 2 }} />
      </StyledAlbumCard>
    )
  }

  return (
    <StyledAlbumCard favourite={isFavourite ? "favourite" : ""}>
      <ActionsBar
        scale={0.8}
        selected={isSelected}
        favourite={isFavourite}
        onSelect={() => changeAlbumSelection(album.id)}
        onFavourite={() => changeAlbumFav(album.id)}
        onDelete={handleOpenModal}
        onEdit={() => {
          setIsEdit((prev) => !prev)
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
          <AlbumCardHeaderLink to={`${album.id}`}>
            {album.title}
          </AlbumCardHeaderLink>
          <SecondaryText>by {user?.name}</SecondaryText>
        </>
      )}
      {deleteAlbumModal}
    </StyledAlbumCard>
  )
})
