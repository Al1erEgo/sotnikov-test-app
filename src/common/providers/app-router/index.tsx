import { Navigate, Route, Routes } from "react-router-dom"
import { APP_PATHS } from "../../constants"
import { Suspense } from "react"
import { Spin } from "antd"
import { Posts } from "../../../features/posts/Posts"

export const AppRouter = () => (
  <Suspense fallback={<Spin />}>
    <Routes>
      <Route
        path={APP_PATHS.ROOT}
        element={<Navigate to={APP_PATHS.POSTS} />}
      />
      <Route path={APP_PATHS.POSTS} element={<Posts />} />
      <Route path={APP_PATHS.PHOTOS} element={<div>Photos</div>} />
      <Route path={APP_PATHS.TODOS} element={<div>Todos</div>} />
    </Routes>
  </Suspense>
)
