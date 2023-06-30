import React, { useEffect } from "react"
import {
  FiltersPanel,
  GroupActionsButtons,
  PageContentContainer,
  Paginator,
  StyledLoader,
  useActions,
  useAppSelector,
  useModal,
} from "../../../../common"
import { getSelectedPosts, getSortedPosts, postsThunks } from "../../slice"
import { Post } from "../../components"
import { usePaginationWSearchParams } from "../../../../common/hooks/use-pagination-w-search-params"
import { getIsDataLoading } from "../../../../app/app-selectors"
import { favouriteThunks, filtersSortActions } from "../../../../common/slices"
import { AddPostWithModal } from "../../components/add-post-with-modal"

const PostsPage = () => {
  const posts = useAppSelector(getSortedPosts)
  const isDataLoading = useAppSelector(getIsDataLoading)
  const selectedPosts = useAppSelector(getSelectedPosts)

  const { fetchPosts, deletePostsGroup } = useActions(postsThunks)
  const { addPostsGroupToFav } = useActions(favouriteThunks)
  const { clearFiltersAndSort } = useActions(filtersSortActions)

  const { modal: deletePostsModal, handleOpenModal: openDeleteModal } =
    useModal("Удалить выбранные посты?", () =>
      deletePostsGroup(Object.keys(selectedPosts)),
    )
  const {
    modal: addToFavouriteModal,
    handleOpenModal: openAddToFavouriteModal,
  } = useModal("Добавить выбранные посты в избранное?", () =>
    addPostsGroupToFav(Object.keys(selectedPosts)),
  )

  const { currentPageContent, paginationConfig, handlePaginationChange } =
    usePaginationWSearchParams(posts)

  useEffect(() => {
    fetchPosts()
    clearFiltersAndSort()
  }, [fetchPosts, clearFiltersAndSort])

  if (isDataLoading) {
    return <StyledLoader />
  }

  return (
    <>
      <AddPostWithModal />
      <FiltersPanel />
      <PageContentContainer>
        {currentPageContent.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </PageContentContainer>
      <Paginator
        config={paginationConfig}
        handleChange={handlePaginationChange}
        totalCount={posts.length}
      />
      {Object.keys(selectedPosts).length !== 0 && (
        <GroupActionsButtons
          onDelete={openDeleteModal}
          onAddFav={openAddToFavouriteModal}
        />
      )}
      {deletePostsModal}
      {addToFavouriteModal}
    </>
  )
}

export default PostsPage
