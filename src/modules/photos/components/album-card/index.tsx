import { FC, memo, useState } from "react"
import { AddAlbumPayloadType, AlbumEntityType } from "../../types"
import { AlbumCardHeaderLink, StyledAlbumCard } from "./styles"
import {
  ActionsBar,
  SecondaryText,
  useActions,
  useAppSelector,
  useModal,
} from "../../../../common"
import { photosActions, photosThunks } from "../../slice"
import { favouriteActions, usersThunks } from "../../../../common/slices"
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
  const { updateUserName } = useActions(usersThunks)
  const { changeAlbumSelection } = useActions(photosActions)
  const { changeAlbumFav } = useActions(favouriteActions)

  const { modal: deleteAlbumModal, handleOpenModal } = useModal(
    "Удалить альбом?",
    () => deleteAlbum(album.id),
  )

  const handleFormSubmit = ({ title, userName }: AddAlbumPayloadType) => {
    if (user.name !== userName) {
      updateUserName({ userName, userId: user.id })
    }
    if (album.title !== title)
      updateAlbum({
        albumId: album.id,
        title,
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
          type={"edit"}
          title={album.title}
          userName={user.name}
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
