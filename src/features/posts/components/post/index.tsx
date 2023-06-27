import { Card, Tooltip } from "antd"
import { FC, useEffect, useState } from "react"
import { PostType } from "../../types"
import { PostTitle, ShowComments, UserName } from "./styles"
import { useActions, useAppSelector } from "../../../../common"
import { usersThunks } from "../../../../common/slices"
import { Comments } from "../comments"
import { FlexContainer } from "../../../../common/styles/common-styled-components"

type PostProps = {
  content: PostType
}
export const Post: FC<PostProps> = ({ content }) => {
  const [showComments, setShowComments] = useState<boolean>(false)
  const user = useAppSelector((state) => state.users[content.userId])
  const { fetchUser } = useActions(usersThunks)

  const toggleShowComments = () => {
    setShowComments((prevState) => !prevState)
  }

  useEffect(() => {
    fetchUser(content.userId)
  }, [])
  return (
    <Card>
      <PostTitle>{content.title}</PostTitle>
      <UserName>by {user?.name}</UserName>
      {content.body}
      <FlexContainer justifyContent={"flex-end"} padding={"5px 0 0 0"}>
        <Tooltip
          title={showComments ? "Скрыть комментарии" : "Показать комментарии"}
        >
          <ShowComments active={showComments} onClick={toggleShowComments} />
        </Tooltip>
      </FlexContainer>
      {showComments && <Comments postId={content.id} />}
    </Card>
  )
}
