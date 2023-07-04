import { Suspense } from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { PageContainer } from './styles'

import { APP_PATHS, Error404Page, StyledLoader } from '@/common'
import { AlbumPage, AlbumsPage } from '@/modules/photos'
import { PostsPage } from '@/modules/posts'
import { TodosPage } from '@/modules/todos'

export const AppRouter = () => {
  return (
    <PageContainer>
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
    </PageContainer>
  )
}
