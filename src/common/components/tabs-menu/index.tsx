import { StyledTabs } from "./style"
import { useLocation, useNavigate } from "react-router-dom"
import { APP_ROUTES } from "../../constants"

const tabs = [
  {
    key: "1",
    label: "Посты",
  },
  {
    key: "2",
    label: "Фото",
  },
  {
    key: "3",
    label: "Задачи",
  },
]

const getDefaultActiveKey = (currentLocation: string): string => {
  return Object.values(APP_ROUTES)
    .findIndex((value) => value === currentLocation.slice(1))
    .toString()
}

export const TabsMenu = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <StyledTabs
      animated
      onChange={(key: string) => navigate(Object.values(APP_ROUTES)[+key])}
      defaultActiveKey={getDefaultActiveKey(location.pathname)}
      type="card"
      items={tabs}
    />
  )
}
