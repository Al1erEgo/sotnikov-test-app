import { useEffect } from 'react'

import {
  CommonFiltersPanel,
  favouriteThunks,
  filtersSortActions,
  GroupActionsButtons,
  PageContentContainer,
  Paginator,
  useActions,
  useAppSelector,
  useModal,
  usePaginationWSearchParams,
} from '../../../../common'
import { AddPostButtonWithModal, PostItem } from '../../components'
import { postsThunks, selectSelectedPosts, selectSortedPosts } from '../../slice'

const PostsPage = () => {
  const posts = useAppSelector(selectSortedPosts)
  const selectedPosts = useAppSelector(selectSelectedPosts)

  const { fetchPosts, deletePostsGroup } = useActions(postsThunks)
  const { addPostsGroupToFav } = useActions(favouriteThunks)
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
    clearFiltersAndSort()
    if (!posts.length) {
      fetchPosts()
    }
  }, [fetchPosts])

  return (
    <>
      <AddPostButtonWithModal />
      <CommonFiltersPanel />
      <PageContentContainer>
        {currentPageContent.map(post => (
          <PostItem key={post.id} post={post} />
        ))}
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
