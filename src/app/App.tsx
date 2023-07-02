import { AppRouter, ErrorPopup, GlobalStyle, TabsMenu } from '../common'

//TODO вынести комментарии в отдельный слайс в posts

export const App = () => {
  return (
    <>
      <TabsMenu />
      <AppRouter />
      <ErrorPopup />
      <GlobalStyle />
    </>
  )
}
