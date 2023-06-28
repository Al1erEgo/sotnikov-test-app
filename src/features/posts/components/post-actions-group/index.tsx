import { FavouriteFilled, PostActionsContainer } from "./styles"
import { CloseOutlined, EditOutlined, HeartOutlined } from "@ant-design/icons"
import Checkbox from "antd/lib/checkbox/Checkbox"
import { Tooltip } from "antd"
import { FC } from "react"

type ActionsGroupProps = {
  onSelect: () => void
  onFavourite: () => void
  onDelete: () => void
  onEdit: () => void
  favourite?: boolean
}

export const PostActionsGroup: FC<ActionsGroupProps> = ({
  onSelect,
  onFavourite,
  onDelete,
  onEdit,
  favourite,
}) => {
  return (
    <PostActionsContainer>
      <Tooltip title={"Выбрать пост"}>
        <Checkbox onClick={onSelect} />
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
