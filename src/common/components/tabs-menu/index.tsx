import { StyledTabs } from "./style"
import { Navigate, useLocation } from "react-router-dom"
import { APP_ROUTES } from "../../constants"

const tabs = [
  {
    key: "1",
    label: "Посты",
    children: <Navigate to={APP_ROUTES.POSTS} />,
  },
  {
    key: "2",
    label: "Фото",
    children: <Navigate to={APP_ROUTES.PHOTOS} />,
  },
  {
    key: "3",
    label: "Задачи",
    children: <Navigate to={APP_ROUTES.TODOS} />,
  },
]

const getDefaultActiveKey = (currentLocation: string): string => {
  return Object.values(APP_ROUTES)
    .findIndex((value) => value === currentLocation.slice(1))
    .toString()
}

export const TabsMenu = () => {
  const location = useLocation()

  return (
    <StyledTabs
      animated
      defaultActiveKey={getDefaultActiveKey(location.pathname)}
      type="card"
      items={tabs}
    />
  )
}
