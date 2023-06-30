import { Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { APP_PATHS } from "../../constants"
import { Error404Page } from "../../pages"
import { StyledLoader } from "../../styles/common-styled-components"
import { PostsPage } from "../../../modules/posts"
import { AlbumsPage } from "../../../modules/photos"
import { PageContainer } from "./styles"

export const AppRouter = () => (
  <PageContainer>
    <Suspense fallback={<StyledLoader />}>
      <Routes>
        <Route
          path={APP_PATHS.ROOT}
          element={<Navigate to={APP_PATHS.POSTS} />}
        />
        <Route path={APP_PATHS.POSTS} element={<PostsPage />} />
        <Route path={APP_PATHS.PHOTOS} element={<AlbumsPage />} />
        <Route path={APP_PATHS.TODOS} element={<div>Todos</div>} />
        <Route path={"*"} element={<Error404Page />} />
      </Routes>
    </Suspense>
  </PageContainer>
)
