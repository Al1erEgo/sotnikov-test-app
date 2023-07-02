import { useEffect } from 'react'

import { selectIsDataLoading } from '../../../../app/app-selectors'
import {
  CommonFiltersPanel,
  favouriteThunks,
  filtersSortActions,
  GroupActionsButtons,
  PageContentContainer,
  Paginator,
  StyledLoader,
  useActions,
  useAppSelector,
  useModal,
  usePaginationWSearchParams,
} from '../../../../common'
import { AddAlbumButtonWithModal, AlbumItem } from '../../components'
import { photosThunks, selectSelectedAlbums, selectSortedAlbums } from '../../slice'
import { AlbumsContentContainer } from '../../styles'

const AlbumsPage = () => {
  const albums = useAppSelector(selectSortedAlbums)
  const isDataLoading = useAppSelector(selectIsDataLoading)
  const selectedAlbums = useAppSelector(selectSelectedAlbums)

  const { fetchAlbums, deleteAlbumsGroup } = useActions(photosThunks)
  const { addAlbumsGroupToFav } = useActions(favouriteThunks)
  const { clearFiltersAndSort } = useActions(filtersSortActions)

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
    clearFiltersAndSort()
    if (!albums.length) {
      fetchAlbums()
    }
  }, [fetchAlbums])

  if (isDataLoading) {
    return <StyledLoader />
  }

  return (
    <>
      <AddAlbumButtonWithModal />
      <CommonFiltersPanel />
      <PageContentContainer>
        <AlbumsContentContainer>
          {currentPageContent.map(album => (
            <AlbumItem key={album.id} album={album} />
          ))}
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
