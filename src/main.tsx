import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { App } from './app/App'
import { persistor, store } from './app/store'
import { StyledLoader } from './common'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={<StyledLoader />} persistor={persistor}>
      <HashRouter>
        <App />
      </HashRouter>
    </PersistGate>
  </Provider>
)
