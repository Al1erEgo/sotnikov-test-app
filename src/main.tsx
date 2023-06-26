import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./app/App"
import { GlobalStyle } from "./common/styles"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
    <GlobalStyle />
  </Provider>,
)
