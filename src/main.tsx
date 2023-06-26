import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { App } from "./app/App"
import { GlobalStyle } from "./common/styles"
import { HashRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <HashRouter>
      <App />
      <GlobalStyle />
    </HashRouter>
  </Provider>,
)
