import { Suspense } from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { selectIsDataLoading } from '../../../app/app-selectors'
import { AlbumPage, AlbumsPage } from '../../../modules/photos'
import { PostsPage } from '../../../modules/posts'
import { TodosPage } from '../../../modules/todos'
import { APP_PATHS } from '../../constants'
import { useAppSelector } from '../../hooks'
import { Error404Page } from '../../pages'
import { ContentLoadingProvider } from '../../providers'
import { StyledLoader } from '../../styles'

import { PageContainer } from './styles'

export const AppRouter = () => {
  const isLoading = useAppSelector(selectIsDataLoading)

  return (
    <PageContainer>
      <ContentLoadingProvider isLoading={isLoading}>
        <Suspense fallback={<StyledLoader />}>
          <Routes>
            <Route path={APP_PATHS.ROOT} element={<Navigate to={APP_PATHS.POSTS} />} />
            <Route path={APP_PATHS.POSTS} element={<PostsPage />} />
            <Route path={APP_PATHS.PHOTOS} element={<AlbumsPage />} />
            <Route path={`${APP_PATHS.PHOTOS}/:id`} element={<AlbumPage />} />
            <Route path={APP_PATHS.TODOS} element={<TodosPage />} />
            <Route path={'*'} element={<Error404Page />} />
          </Routes>
        </Suspense>
      </ContentLoadingProvider>
    </PageContainer>
  )
}
