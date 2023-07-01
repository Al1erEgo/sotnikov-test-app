import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { AppRouter, ErrorPopup, GlobalStyle, StyledLoader, TabsMenu } from '../common'

import { persistor, store } from './store'

//TODO убрать селекторы в отдельные файлы
//TODO починить иконку
//TODO раскидать common слайсы по папкам
//TODO сделать редактирование через модалки?

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
