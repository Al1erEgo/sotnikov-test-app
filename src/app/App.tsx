import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { AppRouter, ErrorPopup, GlobalStyle, StyledLoader, TabsMenu } from '../common'

import { persistor, store } from './store'

//TODO убрать селекторы в отдельные файлы
//TODO починить иконку
//TODO отрефакторить формы
//TODO пересмотреть логику очистки фильтров и сортировки при переходе между страницами

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
