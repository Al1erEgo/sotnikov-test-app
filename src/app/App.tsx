import { AppRouter, ErrorPopup, GlobalStyle, TabsMenu } from '@/common'

//TODO вынести комментарии в отдельный слайс в posts
//TODO добавить алиас для импортов

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
