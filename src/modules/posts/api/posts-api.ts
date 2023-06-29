import { commonInstance } from "../../../common"
import { AddPostArg, CommentType, PostType } from "../types"

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
  updatePost(postId: number, title: string, body: string) {
    return commonInstance.patch<PostType>(`posts/${postId}`, {
      title,
      body,
    })
  },
  addPost(arg: AddPostArg) {
    return commonInstance.post<PostType>("posts", arg)
  },
}
