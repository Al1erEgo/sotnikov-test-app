import { FavouriteFilled, PostActionsContainer } from "./styles"
import { CloseOutlined, EditOutlined, HeartOutlined } from "@ant-design/icons"
import Checkbox from "antd/lib/checkbox/Checkbox"
import { Tooltip } from "antd"
import { FC } from "react"

type PostActionsProps = {
  onSelect: () => void
  onFavourite: () => void
  onDelete: () => void
  onEdit: () => void
  favourite: boolean | undefined
  selected: boolean | undefined
}

export const PostActions: FC<PostActionsProps> = ({
  onSelect,
  onFavourite,
  onDelete,
  onEdit,
  favourite,
  selected,
}) => {
  return (
    <PostActionsContainer>
      <Tooltip title={"Выбрать пост"}>
        <Checkbox checked={selected} onClick={onSelect} />
      </Tooltip>
      <Tooltip
        title={favourite ? "Удалить из избранного" : "Добавить в избранное"}
      >
        {favourite ? (
          <FavouriteFilled onClick={onFavourite} />
        ) : (
          <HeartOutlined onClick={onFavourite} />
        )}
      </Tooltip>
      <Tooltip title={"Редактировать пост"}>
        <EditOutlined onClick={onEdit} />
      </Tooltip>
      <Tooltip title={"Удалить пост"}>
        <CloseOutlined onClick={onDelete} />
      </Tooltip>
    </PostActionsContainer>
  )
}
