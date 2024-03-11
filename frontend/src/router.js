import Header from "components/Header"
import SideBar from "components/SideBar"
import { DetailVideo } from "pages/DetailVideo"
import { HomePage } from "pages/HomePage"
import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <SideBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/watch" element={<DetailVideo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
