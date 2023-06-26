import { commonInstance } from "../../../common"
import { PostType } from "../types"

export const postsApi = {
  getPosts() {
    return commonInstance.get<PostType[]>("posts")
  },
}
