import { FC, memo, useState } from "react"
import { AlbumEntityType } from "../../types"
import { StyledAlbumCard } from "./styles"
import Title from "antd/lib/typography/Title"
import { SecondaryText } from "../../../../common/styles/common-styled-components"
import {
  ActionsBar,
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

  const isFavourite = useAppSelector((state) => state.favorite.albums[album.id])
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

  const handleFormSubmit = ({
    title,
    userName,
  }: {
    title: string
    userName: string
  }) => {
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
        <Skeleton />
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
          <Title level={4}>{album.title}</Title>
          <SecondaryText>by {user?.name}</SecondaryText>
        </>
      )}
      {deleteAlbumModal}
    </StyledAlbumCard>
  )
})
