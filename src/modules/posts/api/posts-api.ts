import { commonInstance } from '../../../common'
import { AddPostArgType, CommentType, PostType } from '../types'

//TODO поменять параметры на arg во всех api

export const postsApi = {
  getPosts() {
    return commonInstance.get<PostType[]>('posts')
  },
  getCommentsForPost(postId: number) {
    return commonInstance.get<CommentType[]>(`posts/${postId}/comments`)
  },
  deletePost(postId: number) {
    return commonInstance.delete<{}>(`posts/${postId}`)
  },
  updatePost(postId: number, userId: number, title: string, body: string) {
    return commonInstance.patch<PostType>(`posts/${postId}`, {
      title,
      body,
      userId,
    })
  },
  addPost(arg: AddPostArgType) {
    return commonInstance.post<PostType>('posts', arg)
  },
}
