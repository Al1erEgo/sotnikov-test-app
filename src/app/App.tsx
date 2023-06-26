import { TabsMenu } from "../common/components"
import { AppRouter } from "../common/providers/app-router"

export const App = () => {
  return (
    <>
      <TabsMenu />
      <AppRouter />
    </>
  )
}
