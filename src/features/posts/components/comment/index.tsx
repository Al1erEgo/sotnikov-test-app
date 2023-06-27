import { CommentType } from "../../types"
import { FC } from "react"
import { CommentCard } from "./styles"

type CommentProps = {
  content: CommentType
}
export const Comment: FC<CommentProps> = ({ content }) => {
  return (
    <CommentCard>
      <div>{content.name}</div>
      <div>{content.email}</div>
      <div>{content.body}</div>
    </CommentCard>
  )
}
