import { CommentType, PostType } from "./posts-api-dtos"

export type PostEntityType = PostType & {
  isPostLoading: boolean
  isCommentsLoading: boolean
  selected: boolean
  comments?: CommentType[]
}
