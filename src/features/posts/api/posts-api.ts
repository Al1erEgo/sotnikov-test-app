import { commonInstance } from "../../../common"
import { Post } from "../types"

export const postsApi = {
  getPosts() {
    return commonInstance.get<Post[]>("posts")
  },
}
