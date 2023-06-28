import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { persistor, store } from "./app/store"
import { GlobalStyle } from "./common"
import { HashRouter } from "react-router-dom"
import { App } from "./app/App"
import { PersistGate } from "redux-persist/integration/react"
import { StyledLoader } from "./common/styles/common-styled-components"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={<StyledLoader />} persistor={persistor}>
      <HashRouter>
        <App />
        <GlobalStyle />
      </HashRouter>
    </PersistGate>
  </Provider>,
)
