import { PostsActionsContainer } from "./styles"
import { Button, Tooltip } from "antd"
import { CloseOutlined, HeartFilled } from "@ant-design/icons"
import { FC } from "react"

type PostsActionsGroupProps = {
  onDelete: () => void
  onAddFav: () => void
}

export const PostsActionsGroup: FC<PostsActionsGroupProps> = ({
  onDelete,
  onAddFav,
}) => {
  return (
    <PostsActionsContainer>
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
    </PostsActionsContainer>
  )
}
