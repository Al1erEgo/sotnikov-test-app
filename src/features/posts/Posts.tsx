import { useEffect } from "react"
import { useActions, useAppSelector } from "../../common"
import { postsThunks } from "./slice"

const PostsPage = () => {
  const posts = useAppSelector((state) => state.posts)
  const { fetchPosts } = useActions(postsThunks)

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return <div>Posts</div>
}

export default PostsPage
