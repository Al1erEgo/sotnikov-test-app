import { ActionsContainer } from "./styles"
import { CloseOutlined, EditOutlined } from "@ant-design/icons"
import Checkbox from "antd/lib/checkbox/Checkbox"
import { Tooltip } from "antd"
import { FC } from "react"

type ActionsGroupProps = {
  onDelete: () => void
}

export const ActionsGroup: FC<ActionsGroupProps> = ({ onDelete }) => {
  return (
    <ActionsContainer>
      <Tooltip title={"Выбрать пост"}>
        <Checkbox />
      </Tooltip>
      <Tooltip title={"Редактировать пост"}>
        <EditOutlined />
      </Tooltip>
      <Tooltip title={"Удалить пост"}>
        <CloseOutlined onClick={onDelete} />
      </Tooltip>
    </ActionsContainer>
  )
}
