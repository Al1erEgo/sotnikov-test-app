import { Navigate, Route, Routes } from "react-router-dom"
import { APP_PATHS } from "../../constants"
import { lazy, Suspense } from "react"
import { Spin } from "antd"

const PostsPage = lazy(() => import("../../../features/posts/Posts"))
const Error404Page = lazy(() => import("../../pages/error404"))

export const AppRouter = () => (
  <Suspense fallback={<Spin />}>
    <Routes>
      <Route
        path={APP_PATHS.ROOT}
        element={<Navigate to={APP_PATHS.POSTS} />}
      />
      <Route path={APP_PATHS.POSTS} element={<PostsPage />} />
      <Route path={APP_PATHS.PHOTOS} element={<div>Photos</div>} />
      <Route path={APP_PATHS.TODOS} element={<div>Todos</div>} />
      <Route path={"*"} element={<Error404Page />} />
    </Routes>
  </Suspense>
)
