import { useActions, useAppSelector } from "../../../../common"
import { FC, useEffect } from "react"
import { postsThunks } from "../../slice"
import { Comment } from "../comment"
import { Skeleton } from "antd"
import { FlexContainer } from "../../../../common/styles/common-styled-components"

type CommentsProps = {
  postId: number
}

export const Comments: FC<CommentsProps> = ({ postId }) => {
  const isLoading = useAppSelector(
    (state) => state.posts[postId].isCommentsLoading,
  )
  const comments = useAppSelector((state) => state.posts[postId].comments)
  const { fetchComments } = useActions(postsThunks)

  console.log("isLoading", isLoading)
  console.log("comments", comments)

  useEffect(() => {
    fetchComments(postId)
  }, [])

  if (isLoading) {
    return <Skeleton />
  }
  return (
    <FlexContainer flexDirection={"column"} gap={"5px"} padding={"5px"}>
      {comments?.map((comment) => (
        <Comment key={comment.id} content={comment} />
      ))}
    </FlexContainer>
  )
}
