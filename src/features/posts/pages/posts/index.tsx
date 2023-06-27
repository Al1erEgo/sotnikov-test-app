import { useEffect } from "react"
import { useActions, useAppSelector } from "../../../../common"
import { postsThunks } from "../../slice"
import { Post } from "../../components"
import { usePagination } from "../../../../common/hooks/usePagination"
import { Paginator } from "../../../../common/components/paginator"

const PostsPage = () => {
  const posts = useAppSelector((state) => state.posts)
  const { fetchPosts } = useActions(postsThunks)

  const { currentPageContent, paginationConfig, handlePaginationChange } =
    usePagination(posts)

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return (
    <>
      {currentPageContent.map((post) => (
        <Post key={post.id} content={post} />
      ))}
      <Paginator
        config={paginationConfig}
        handleChange={handlePaginationChange}
        totalCount={posts.length}
      />
    </>
  )
}

export default PostsPage
