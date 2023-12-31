import { useEffect } from 'react'

import { AddPostButtonWithModal, PostItem } from '../../components'
import { postsActions, postsThunks, selectSelectedPosts, selectSortedPosts } from '../../slice'

import { selectIsDataLoading } from '@/app/app-selectors'
import {
  CommonFiltersPanel,
  filtersSortActions,
  GroupActionsButtons,
  NoContentMessageProvider,
  PageContentContainer,
  Paginator,
  StyledLoader,
  useActions,
  useAppSelector,
  useModal,
  usePaginationWSearchParams,
} from '@/common'

const PostsPage = () => {
  const posts = useAppSelector(selectSortedPosts)
  const selectedPosts = useAppSelector(selectSelectedPosts)
  const isLoading = useAppSelector(selectIsDataLoading)

  const { fetchPosts, deletePostsGroup, addPostsGroupToFav } = useActions(postsThunks)
  const { clearSelectedPosts } = useActions(postsActions)
  const { clearFiltersAndSort } = useActions(filtersSortActions)

  const { modal: deletePostsModal, handleOpenModal: openDeleteModal } = useModal(
    'Удалить выбранные посты?',
    () => deletePostsGroup(Object.keys(selectedPosts))
  )
  const { modal: addToFavouriteModal, handleOpenModal: openAddToFavouriteModal } = useModal(
    'Добавить выбранные посты в избранное?',
    () => addPostsGroupToFav(Object.keys(selectedPosts))
  )
  const { currentPageContent, paginationConfig, handlePaginationChange } =
    usePaginationWSearchParams(posts)

  useEffect(() => {
    if (!posts.length) {
      fetchPosts()
    }

    return () => {
      const clear = () => {
        clearFiltersAndSort()
        clearSelectedPosts()
      }

      clear()
    }
  }, [fetchPosts])

  if (isLoading) {
    return <StyledLoader />
  }

  return (
    <>
      <AddPostButtonWithModal />
      <CommonFiltersPanel />
      <PageContentContainer>
        <NoContentMessageProvider isContent={!!currentPageContent.length}>
          {currentPageContent.map(post => (
            <PostItem key={post.id} post={post} />
          ))}
        </NoContentMessageProvider>
      </PageContentContainer>
      <Paginator
        config={paginationConfig}
        handleChange={handlePaginationChange}
        totalCount={posts.length}
      />
      {Object.keys(selectedPosts).length !== 0 && (
        <GroupActionsButtons onDelete={openDeleteModal} onAddFav={openAddToFavouriteModal} />
      )}
      {deletePostsModal}
      {addToFavouriteModal}
    </>
  )
}

export default PostsPage
