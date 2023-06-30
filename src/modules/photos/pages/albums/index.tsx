import React, { useEffect } from "react"
import {
  FiltersPanel,
  GroupActionsButtons,
  Paginator,
  StyledLoader,
  useActions,
  useAppSelector,
  useModal,
} from "../../../../common"
import { photosThunks } from "../../slice"
import { getIsDataLoading } from "../../../../app/app-selectors"
import { favouriteThunks, filtersSortActions } from "../../../../common/slices"
import {
  getSelectedAlbums,
  getSortedAlbums,
} from "../../slice/photos-selectors"
import { usePaginationWSearchParams } from "../../../../common/hooks/use-pagination-w-search-params"
import { AddAlbumWithModal, AlbumCard } from "../../components"
import { PhotosPagesContentContainer } from "../../styles"

const AlbumsPage = () => {
  const albums = useAppSelector(getSortedAlbums)
  const isDataLoading = useAppSelector(getIsDataLoading)
  const selectedAlbums = useAppSelector(getSelectedAlbums)

  const { fetchAlbums, deleteAlbumsGroup } = useActions(photosThunks)
  const { addAlbumsGroupToFav } = useActions(favouriteThunks)
  const { clearPostsFiltersAndSort } = useActions(filtersSortActions)

  const { modal: deleteAlbumsModal, handleOpenModal: openDeleteModal } =
    useModal("Удалить выбранные альбомы?", () =>
      deleteAlbumsGroup(Object.keys(selectedAlbums)),
    )
  const {
    modal: addToFavouriteModal,
    handleOpenModal: openAddToFavouriteModal,
  } = useModal("Добавить выбранные альбомы в избранное?", () =>
    addAlbumsGroupToFav(Object.keys(selectedAlbums)),
  )

  const { currentPageContent, paginationConfig, handlePaginationChange } =
    usePaginationWSearchParams(albums)

  useEffect(() => {
    fetchAlbums()
    clearPostsFiltersAndSort()
  }, [fetchAlbums, clearPostsFiltersAndSort])

  if (isDataLoading) {
    return <StyledLoader />
  }
  return (
    <>
      <AddAlbumWithModal />
      <FiltersPanel />
      <PhotosPagesContentContainer>
        {currentPageContent.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </PhotosPagesContentContainer>
      <Paginator
        config={paginationConfig}
        handleChange={handlePaginationChange}
        totalCount={albums.length}
      />
      {Object.keys(selectedAlbums).length !== 0 && (
        <GroupActionsButtons
          onDelete={openDeleteModal}
          onAddFav={openAddToFavouriteModal}
        />
      )}
      {addToFavouriteModal}
      {deleteAlbumsModal}
    </>
  )
}

export default AlbumsPage
