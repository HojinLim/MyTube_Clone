import React from "react"
import ReactDOM from "react-dom"

import App from "App"
import "./styles.css"
import toast, { Toaster } from "react-hot-toast"
import { RecoilRoot } from "recoil"
ReactDOM.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,

  document.getElementById("root")
)
