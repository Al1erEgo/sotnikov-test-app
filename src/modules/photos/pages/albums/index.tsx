import { useEffect } from 'react'

import { selectIsDataLoading } from '../../../../app/app-selectors'
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
} from '../../../../common'
import { AddAlbumButtonWithModal, AlbumItem } from '../../components'
import { photosActions, photosThunks, selectSelectedAlbums, selectSortedAlbums } from '../../slice'
import { AlbumsContentContainer } from '../../styles'

const AlbumsPage = () => {
  const albums = useAppSelector(selectSortedAlbums)
  const selectedAlbums = useAppSelector(selectSelectedAlbums)
  const isLoading = useAppSelector(selectIsDataLoading)

  const { fetchAlbums, deleteAlbumsGroup, addAlbumsGroupToFav } = useActions(photosThunks)
  const { clearFiltersAndSort } = useActions(filtersSortActions)
  const { clearSelectedAlbums } = useActions(photosActions)

  const { modal: deleteAlbumsModal, handleOpenModal: openDeleteModal } = useModal(
    'Удалить выбранные альбомы?',
    () => deleteAlbumsGroup(Object.keys(selectedAlbums))
  )
  const { modal: addToFavouriteModal, handleOpenModal: openAddToFavouriteModal } = useModal(
    'Добавить выбранные альбомы в избранное?',
    () => addAlbumsGroupToFav(Object.keys(selectedAlbums))
  )

  const { currentPageContent, paginationConfig, handlePaginationChange } =
    usePaginationWSearchParams(albums)

  useEffect(() => {
    if (!albums.length) {
      fetchAlbums()
    }

    return () => {
      const clear = () => {
        clearFiltersAndSort()
        clearSelectedAlbums()
      }

      clear()
    }
  }, [fetchAlbums])

  if (isLoading) {
    return <StyledLoader />
  }

  return (
    <>
      <AddAlbumButtonWithModal />
      <CommonFiltersPanel />
      <PageContentContainer>
        <AlbumsContentContainer>
          <NoContentMessageProvider isContent={!!currentPageContent.length}>
            {currentPageContent.map(album => (
              <AlbumItem key={album.id} album={album} />
            ))}
          </NoContentMessageProvider>
        </AlbumsContentContainer>
      </PageContentContainer>
      <Paginator
        config={paginationConfig}
        handleChange={handlePaginationChange}
        totalCount={albums.length}
      />
      {Object.keys(selectedAlbums).length !== 0 && (
        <GroupActionsButtons onDelete={openDeleteModal} onAddFav={openAddToFavouriteModal} />
      )}
      {addToFavouriteModal}
      {deleteAlbumsModal}
    </>
  )
}

export default AlbumsPage
