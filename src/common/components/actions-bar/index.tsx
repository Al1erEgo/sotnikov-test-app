import { ActionsBarContainer, FavouriteFilled } from "./styles"
import { CloseOutlined, EditOutlined, HeartOutlined } from "@ant-design/icons"
import Checkbox from "antd/lib/checkbox/Checkbox"
import { Tooltip } from "antd"
import { FC } from "react"

type ActionsBarProps = {
  onSelect?: () => void
  onFavourite?: () => void
  onDelete?: () => void
  onEdit?: () => void
  favourite?: boolean | undefined
  selected?: boolean | undefined
  scale?: number
}

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
    <ActionsBarContainer scale={scale}>
      {(selected || onSelect) && (
        <Tooltip title={selected ? "Отменить выбор" : "Выбрать"}>
          <Checkbox checked={selected} onClick={onSelect} />
        </Tooltip>
      )}
      {(favourite || onFavourite) && (
        <Tooltip
          title={favourite ? "Удалить из избранного" : "Добавить в избранное"}
        >
          {favourite ? (
            <FavouriteFilled onClick={onFavourite} />
          ) : (
            <HeartOutlined onClick={onFavourite} />
          )}
        </Tooltip>
      )}
      {onEdit && (
        <Tooltip title={"Редактировать"}>
          <EditOutlined onClick={onEdit} />
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip title={"Удалить"}>
          <CloseOutlined onClick={onDelete} />
        </Tooltip>
      )}
    </ActionsBarContainer>
  )
}
