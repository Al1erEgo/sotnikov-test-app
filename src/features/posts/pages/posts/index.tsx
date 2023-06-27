import { useEffect } from "react"
import { useActions, useAppSelector } from "../../../../common"
import { postsThunks } from "../../slice"
import { Post } from "../../components"
import { usePagination } from "../../../../common/hooks/usePagination"
import { Paginator } from "../../../../common/components/paginator"
import { StyledLoader } from "../../../../common/providers/app-router/styles"

const PostsPage = () => {
  const posts = useAppSelector((state) => state.posts)
  const isDataLoading = useAppSelector((state) => state.app.dataLoading)
  const { fetchPosts } = useActions(postsThunks)

  const { currentPageContent, paginationConfig, handlePaginationChange } =
    usePagination(posts)

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  if (isDataLoading) {
    return <StyledLoader />
  }

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
