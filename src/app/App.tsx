import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { AppRouter, ErrorPopup, GlobalStyle, StyledLoader, TabsMenu } from '../common'

import { persistor, store } from './store'

//TODO отрефакторить формы
//TODO пересмотреть логику очистки фильтров и сортировки при переходе между страницами
//TODO вынести комментарии в отдельный слайс в posts

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
