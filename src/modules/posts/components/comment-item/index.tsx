import { CommentType } from "../../types"
import { FC } from "react"
import { CommentCard } from "./styles"
import { SecondaryText } from "../../../../common"
import Title from "antd/lib/typography/Title"

type CommentItemProps = {
  content: CommentType
}
export const Comment: FC<CommentItemProps> = ({ content }) => {
  return (
    <CommentCard>
      <Title level={5}>{content.name}</Title>
      <SecondaryText>{content.email}</SecondaryText>
      <div>{content.body}</div>
    </CommentCard>
  )
}
