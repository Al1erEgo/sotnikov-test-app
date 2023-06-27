import { commonInstance } from "../../../common"
import { CommentType, PostType } from "../types"

export const postsApi = {
  getPosts() {
    return commonInstance.get<PostType[]>("posts")
  },
  getCommentsForPost(postId: number) {
    return commonInstance.get<CommentType[]>(`posts/${postId}/comments`)
  },
  deletePost(postId: number) {
    return commonInstance.delete<{}>(`posts/${postId}`)
  },
}
