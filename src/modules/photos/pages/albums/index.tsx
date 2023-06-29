import { useEffect } from "react"
import {
  FiltersPanel,
  Paginator,
  useActions,
  useAppSelector,
} from "../../../../common"
import { photosThunks } from "../../slice"
import { getIsDataLoading } from "../../../../app/app-selectors"
import { StyledLoader } from "../../../../common/styles/common-styled-components"
import { filtersSortActions } from "../../../../common/slices"
import { getSortedAlbums } from "../../slice/photos-selectors"
import { usePagination } from "../../../../common/hooks/use-pagination"
import { AlbumsContainer } from "./styles"

const AlbumsPage = () => {
  const isDataLoading = useAppSelector(getIsDataLoading)
  const albums = useAppSelector(getSortedAlbums)

  const { fetchAlbums } = useActions(photosThunks)
  const { clearPostsFiltersAndSort } = useActions(filtersSortActions)

  const { currentPageContent, paginationConfig, handlePaginationChange } =
    usePagination(albums)

  useEffect(() => {
    fetchAlbums()
    clearPostsFiltersAndSort()
  }, [fetchAlbums, clearPostsFiltersAndSort])

  if (isDataLoading) {
    return <StyledLoader />
  }
  return (
    <>
      <FiltersPanel />
      <AlbumsContainer>
        {currentPageContent.map((album) => (
          <div>{album.title}</div>
        ))}
      </AlbumsContainer>
      <Paginator
        config={paginationConfig}
        handleChange={handlePaginationChange}
        totalCount={albums.length}
      />
    </>
  )
}

export default AlbumsPage
