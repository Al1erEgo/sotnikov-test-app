import { FC, memo } from "react"
import { AlbumEntityType } from "../../types"
import { StyledAlbumCard } from "./styles"
import Title from "antd/lib/typography/Title"
import { SecondaryText } from "../../../../common/styles/common-styled-components"
import { ActionsBar, useAppSelector } from "../../../../common"

type AlbumCardProps = {
  album: AlbumEntityType
}
export const AlbumCard: FC<AlbumCardProps> = memo(({ album }) => {
  const user = useAppSelector((state) => state.users[album.userId])

  return (
    <StyledAlbumCard>
      <ActionsBar />
      <Title level={4}>{album.title}</Title>
      <SecondaryText>by {user?.name}</SecondaryText>
    </StyledAlbumCard>
  )
})
