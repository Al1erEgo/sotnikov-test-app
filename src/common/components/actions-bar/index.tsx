import { ActionsContainer, FavouriteFilled } from "./styles"
import { CloseOutlined, EditOutlined, HeartOutlined } from "@ant-design/icons"
import Checkbox from "antd/lib/checkbox/Checkbox"
import { Tooltip } from "antd"
import { FC } from "react"

type ActionsBarProps = {
  onSelect: () => void
  onFavourite: () => void
  onDelete: () => void
  onEdit: () => void
  favourite: boolean | undefined
  selected: boolean | undefined
  scale?: number
}

//TODO разделить на отдельные компоненты
export const ActionsBar: FC<ActionsBarProps> = ({
  onSelect,
  onFavourite,
  onDelete,
  onEdit,
  favourite,
  selected,
  scale,
}) => {
  return (
    <ActionsContainer scale={scale}>
      <Tooltip title={selected ? "Выбрать" : "Отменить выбор"}>
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
      <Tooltip title={"Редактировать"}>
        <EditOutlined onClick={onEdit} />
      </Tooltip>
      <Tooltip title={"Удалить"}>
        <CloseOutlined onClick={onDelete} />
      </Tooltip>
    </ActionsContainer>
  )
}
