import { Card } from "antd"
import { FC, useEffect } from "react"
import { PostType } from "../../types"
import { PostTitle, UserName } from "./styles"
import { useActions, useAppSelector } from "../../../../common"
import { usersThunks } from "../../../../common/slices"

type PostProps = {
  content: PostType
}
export const Post: FC<PostProps> = ({ content }) => {
  const user = useAppSelector((state) => state.users[content.userId])
  const { fetchUser } = useActions(usersThunks)

  useEffect(() => {
    fetchUser(content.userId)
  })
  return (
    <Card>
      <PostTitle>{content.title}</PostTitle>
      <UserName>by {user?.name}</UserName>
      {content.body}
    </Card>
  )
}
