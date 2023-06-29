import { useEffect } from "react"
import {
  Paginator,
  useActions,
  useAppSelector,
  useModal,
} from "../../../../common"
import { getSelectedPosts, getSortedPosts, postsThunks } from "../../slice"
import {
  FiltersPanel,
  Post,
  PostAddWithModal,
  PostsGroupActions,
} from "../../components"
import { usePagination } from "../../../../common/hooks/use-pagination"
import { StyledLoader } from "../../../../common/styles/common-styled-components"
import { PostsContainer } from "./styles"

const PostsPage = () => {
  const posts = useAppSelector(getSortedPosts)
  const isDataLoading = useAppSelector((state) => state.app.dataLoading)
  const selectedPosts = useAppSelector(getSelectedPosts)
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
      <FiltersPanel />
      <PostsContainer>
        {currentPageContent.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        {Object.keys(selectedPosts).length !== 0 && (
          <PostsGroupActions
            onDelete={openDeleteModal}
            onAddFav={openAddToFavouriteModal}
          />
        )}
      </PostsContainer>
      <Paginator
        config={paginationConfig}
        handleChange={handlePaginationChange}
        totalCount={posts.length}
      />
      <PostAddWithModal />
      {deleteModal}
      {addToFavouriteModal}
    </>
  )
}

export default PostsPage
