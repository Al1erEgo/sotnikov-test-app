import { FlexContainer, useActions } from "../../../../common"
import { FC, useEffect } from "react"
import { postsThunks } from "../../slice"
import { Comment } from "../comment"
import { Skeleton } from "antd"
import { CommentType } from "../../types"

type CommentsProps = {
  content?: CommentType[]
  isLoading: boolean
  postId: number
}

export const Comments: FC<CommentsProps> = ({ content, isLoading, postId }) => {
  const { fetchComments } = useActions(postsThunks)

  useEffect(() => {
    fetchComments(postId)
  }, [])

  if (isLoading) {
    return <Skeleton />
  }
  return (
    <FlexContainer
      flexdirection={"column"}
      alignitems={"flex-start"}
      gap={"5px"}
      padding={"5px"}
    >
      {content?.map((comment) => (
        <Comment key={comment.id} content={comment} />
      ))}
    </FlexContainer>
  )
}
