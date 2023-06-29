import {AppRouter, ErrorPopup, TabsMenu} from "../common"

//TODO убрать селекторы в отдельные файлы
//TODO убрать санки в отдельные файлы
//TODO починить иконку

export const App = () => {
  return (
    <>
      <TabsMenu />
      <AppRouter />
      <ErrorPopup />
    </>
  )
}
