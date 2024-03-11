import React from "react"
import ReactDOM from "react-dom"

import App from "App"
import "./styles.css"
// Redux setting

import { RecoilRoot } from "recoil"
ReactDOM.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById("root")
)
