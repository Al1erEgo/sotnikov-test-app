import { CommentType, PostType } from "./posts-api-dtos"

export type PostEntityType = PostType & {
  isPostLoading: boolean
  isCommentsLoading: boolean
  comments?: CommentType[]
}
