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
    label: "Альбомы",
  },
  {
    key: "3",
    label: "Задачи",
  },
]

const getDefaultActiveKey = (currentLocation: string): string => {
  const key =
    Object.values(APP_PATHS)
      .slice(1)
      .findIndex((value) => currentLocation.slice(1).includes(value)) + 1

  return key.toString()
}

export const TabsMenu = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Tabs
      animated
      onTabClick={(key: string) => navigate(Object.values(APP_PATHS)[+key])}
      defaultActiveKey={getDefaultActiveKey(location.pathname)}
      type="card"
      items={tabs}
    />
  )
}
