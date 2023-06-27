import { CommentType } from "../../types"
import { FC } from "react"
import { CommentCard } from "./styles"
import { SecondaryText } from "../../../../common/styles/common-styled-components"
import Title from "antd/lib/typography/Title"

type CommentProps = {
  content: CommentType
}
export const Comment: FC<CommentProps> = ({ content }) => {
  return (
    <CommentCard>
      <Title level={5}>{content.name}</Title>
      <SecondaryText>{content.email}</SecondaryText>
      <div>{content.body}</div>
    </CommentCard>
  )
}
