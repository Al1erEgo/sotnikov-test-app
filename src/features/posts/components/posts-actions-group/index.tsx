import { PostsActionsContainer } from "./styles"
import { Button, Tooltip } from "antd"
import { CloseOutlined, HeartFilled } from "@ant-design/icons"

export const PostsActionsGroup = () => {
  return (
    <PostsActionsContainer>
      <Tooltip title={"Добавить посты в избранное"}>
        <Button type="primary" shape="circle">
          <HeartFilled />
        </Button>
      </Tooltip>
      <Tooltip title={"Удалить посты"}>
        <Button type="primary" shape="circle" danger>
          <CloseOutlined />
        </Button>
      </Tooltip>
    </PostsActionsContainer>
  )
}
