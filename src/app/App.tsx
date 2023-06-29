import { AppRouter, ErrorPopup, TabsMenu } from "../common"

export const App = () => {
  return (
    <>
      <TabsMenu />
      <AppRouter />
      <ErrorPopup />
    </>
  )
}
