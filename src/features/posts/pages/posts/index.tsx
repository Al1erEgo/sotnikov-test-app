import { useEffect, useState } from "react"
import { useActions, useAppSelector } from "../../../../common"
import { postsThunks } from "../../slice"
import { Post } from "../../components"
import { Pagination } from "antd"
import Link from "antd/lib/typography/Link"
import { AdaptiveFlexContainer } from "../../../../common/styles/common-styled-components"

const PostsPage = () => {
  const [paginationConfig, setPaginationConfig] = useState<[number, number]>([
    1, 10,
  ])
  const posts = useAppSelector((state) => state.posts)
  const { fetchPosts } = useActions(postsThunks)

  const paginatedPosts = posts.slice(
    paginationConfig[0] * paginationConfig[1] - paginationConfig[1],
    paginationConfig[0] * paginationConfig[1],
  )

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPaginationConfig([page, pageSize])
  }
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return (
    <>
      {paginatedPosts.map((post) => (
        <Post key={post.id} content={post} />
      ))}
      <AdaptiveFlexContainer>
        <Pagination
          onChange={handlePaginationChange}
          current={paginationConfig[0]}
          pageSize={paginationConfig[1]}
          total={posts.length}
          responsive
        />
        <Link onClick={() => setPaginationConfig([1, posts.length])}>
          Show all posts
        </Link>
      </AdaptiveFlexContainer>
    </>
  )
}

export default PostsPage
