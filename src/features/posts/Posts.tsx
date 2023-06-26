import { useEffect } from "react"
import { useActions, useAppSelector } from "../../common"
import { postsThunks } from "./slice"
import { Post } from "./components"

const PostsPage = () => {
  const posts = useAppSelector((state) => state.posts)
  const { fetchPosts } = useActions(postsThunks)

  console.log(posts)

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} content={post} />
      ))}
    </>
  )
}

export default PostsPage
