import {AppRouter, ErrorPopup, GlobalStyle, StyledLoader, TabsMenu} from "../common"
import {persistor, store} from "./store"
import React from "react"
import {Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react"
import {HashRouter} from "react-router-dom"

//TODO убрать селекторы в отдельные файлы
//TODO убрать санки в отдельные файлы
//TODO починить иконку
//TODO раскидать common слайсы по папкам

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<StyledLoader />} persistor={persistor}>
        <HashRouter>
          <TabsMenu />

          <AppRouter />
          <ErrorPopup />
          <GlobalStyle />
        </HashRouter>
      </PersistGate>
    </Provider>
  )
}
