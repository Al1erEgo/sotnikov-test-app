import { useEffect } from "react"
import { useActions, useAppSelector, useModal } from "../../../../common"
import { postsThunks } from "../../slice"
import { Post, PostsActionsGroup } from "../../components"
import { usePagination } from "../../../../common/hooks/use-pagination"
import { Paginator } from "../../../../common/components/paginator"
import { StyledLoader } from "../../../../common/styles/common-styled-components"
import { PostsContainer } from "./styles"

const PostsPage = () => {
  const posts = useAppSelector((state) => state.posts.posts)
  const isDataLoading = useAppSelector((state) => state.app.dataLoading)
  const selectedPosts = useAppSelector((state) => state.posts.selectedPosts)
  const { fetchPosts, addPostsGroupToFav, deletePostsGroup } =
    useActions(postsThunks)

  const { modal: deleteModal, handleOpenModal: openDeleteModal } = useModal(
    "Удалить выбранные посты?",
    () => deletePostsGroup(Object.keys(selectedPosts)),
  )
  const {
    modal: addToFavouriteModal,
    handleOpenModal: openAddToFavouriteModal,
  } = useModal("Добавить выбранные посты в избранное?", () =>
    addPostsGroupToFav(Object.keys(selectedPosts)),
  )

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
      <PostsContainer>
        {currentPageContent.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </PostsContainer>
      <Paginator
        config={paginationConfig}
        handleChange={handlePaginationChange}
        totalCount={posts.length}
      />
      {Object.keys(selectedPosts).length !== 0 && (
        <PostsActionsGroup
          onDelete={openDeleteModal}
          onAddFav={openAddToFavouriteModal}
        />
      )}
      {deleteModal}
      {addToFavouriteModal}
    </>
  )
}

export default PostsPage
