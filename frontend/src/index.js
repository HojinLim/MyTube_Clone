import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "App"

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context"

// Redux setting
import { Provider } from "react-redux"
import { createStore } from "redux"
import reducers from "./reducers"

const store = createStore(reducers)

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <SoftUIControllerProvider>
        <App />
      </SoftUIControllerProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
)
