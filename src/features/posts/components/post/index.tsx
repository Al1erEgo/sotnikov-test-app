import { Card, Tooltip } from "antd"
import { FC, useEffect, useState } from "react"
import { PostType } from "../../types"
import { useActions, useAppSelector } from "../../../../common"
import { usersThunks } from "../../../../common/slices"
import { Comments } from "../comments"
import {
  FlexContainer,
  SecondaryText,
} from "../../../../common/styles/common-styled-components"
import Title from "antd/lib/typography/Title"
import { ActionsGroup } from "../actions-group"
import { postsThunks } from "../../slice"
import { ShowComments } from "./styles"

type PostProps = {
  content: PostType
}
export const Post: FC<PostProps> = ({ content }) => {
  const [showComments, setShowComments] = useState<boolean>(false)

  const user = useAppSelector((state) => state.users[content.userId])
  const { fetchUser } = useActions(usersThunks)
  const { deletePost } = useActions(postsThunks)

  const handleDeletePost = () => deletePost(content.id)

  const toggleShowComments = () => {
    setShowComments((prevState) => !prevState)
  }

  useEffect(() => {
    fetchUser(content.userId)
  }, [])
  return (
    <Card>
      <ActionsGroup onDelete={handleDeletePost} />
      <Title level={4}>{content.title}</Title>
      <SecondaryText>by {user?.name}</SecondaryText>
      {content.body}
      <FlexContainer justifycontent={"flex-end"} padding={"5px 0 0 0"}>
        <Tooltip
          title={showComments ? "Скрыть комментарии" : "Показать комментарии"}
        >
          <ShowComments
            active={showComments ? "active" : ""}
            onClick={toggleShowComments}
          />
        </Tooltip>
      </FlexContainer>
      {showComments && <Comments postId={content.id} />}
    </Card>
  )
}
