import { PostsGroupActionsContainer } from "./styles"
import { Button, Tooltip } from "antd"
import { CloseOutlined, HeartFilled } from "@ant-design/icons"
import { FC } from "react"

type GroupActionsButtonsProps = {
  onDelete: () => void
  onAddFav: () => void
}

export const GroupActionsButtons: FC<GroupActionsButtonsProps> = ({
  onDelete,
  onAddFav,
}) => {
  return (
    <PostsGroupActionsContainer>
      <Tooltip title={"Добавить в избранное"}>
        <Button type="primary" shape="circle" onClick={onAddFav}>
          <HeartFilled />
        </Button>
      </Tooltip>
      <Tooltip title={"Удалить"}>
        <Button type="primary" shape="circle" danger onClick={onDelete}>
          <CloseOutlined />
        </Button>
      </Tooltip>
    </PostsGroupActionsContainer>
  )
}
