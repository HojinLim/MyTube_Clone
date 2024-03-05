import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "App"

// Redux setting
import { Provider } from "react-redux"
import { createStore } from "redux"
import reducers from "./reducers"

const store = createStore(reducers)

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
)
