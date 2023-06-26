import { useLocation, useNavigate } from "react-router-dom"
import { APP_PATHS } from "../../constants"
import { Tabs } from "antd"

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
  return Object.values(APP_PATHS)
    .findIndex((value) => value === currentLocation.slice(1))
    .toString()
}

export const TabsMenu = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Tabs
      animated
      onChange={(key: string) => navigate(Object.values(APP_PATHS)[+key])}
      defaultActiveKey={getDefaultActiveKey(location.pathname)}
      type="card"
      items={tabs}
    />
  )
}
