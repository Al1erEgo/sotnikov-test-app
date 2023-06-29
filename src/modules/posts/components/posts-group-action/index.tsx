import { PostsGroupActionsContainer } from "./styles"
import { Button, Tooltip } from "antd"
import { CloseOutlined, HeartFilled } from "@ant-design/icons"
import { FC } from "react"

type PostsGroupActionsProps = {
  onDelete: () => void
  onAddFav: () => void
}

export const PostsGroupActions: FC<PostsGroupActionsProps> = ({
  onDelete,
  onAddFav,
}) => {
  return (
    <PostsGroupActionsContainer>
      <Tooltip title={"Добавить посты в избранное"}>
        <Button type="primary" shape="circle" onClick={onAddFav}>
          <HeartFilled />
        </Button>
      </Tooltip>
      <Tooltip title={"Удалить посты"}>
        <Button type="primary" shape="circle" danger onClick={onDelete}>
          <CloseOutlined />
        </Button>
      </Tooltip>
    </PostsGroupActionsContainer>
  )
}
