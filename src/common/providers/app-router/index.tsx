import { Navigate, Route, Routes } from "react-router-dom"
import { APP_ROUTES } from "../../constants"

export const AppRouter = () => (
  <Routes>
    <Route
      path={APP_ROUTES.ROOT}
      element={<Navigate to={APP_ROUTES.POSTS} />}
    />
    <Route path={APP_ROUTES.POSTS} element={<div>Posts</div>} />
    <Route path={APP_ROUTES.PHOTOS} element={<div>Photos</div>} />
    <Route path={APP_ROUTES.TODOS} element={<div>Todos</div>} />
  </Routes>
)
