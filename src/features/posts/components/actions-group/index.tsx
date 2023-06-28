import { ActionsContainer, FavouriteFilled } from "./styles"
import { CloseOutlined, EditOutlined, HeartOutlined } from "@ant-design/icons"
import Checkbox from "antd/lib/checkbox/Checkbox"
import { Tooltip } from "antd"
import { FC } from "react"

type ActionsGroupProps = {
  onFavourite: () => void
  onDelete: () => void
  onEdit: () => void
  favourite?: boolean
}

export const ActionsGroup: FC<ActionsGroupProps> = ({
  onFavourite,
  onDelete,
  onEdit,
  favourite,
}) => {
  return (
    <ActionsContainer>
      <Tooltip title={"Выбрать пост"}>
        <Checkbox />
      </Tooltip>
      <Tooltip title={"Добавить в избранное"}>
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
    </ActionsContainer>
  )
}
