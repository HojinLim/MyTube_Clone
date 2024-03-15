import { fullScreenState } from "atom/fullScreenState"
import Header from "components/Header"
import SideBar from "components/SideBar"
import { DetailVideo } from "pages/DetailVideo"
import { HomePage } from "pages/HomePage"
import { StudioPage } from "pages/StudioPage"
import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useRecoilValue } from "recoil"
const Router = () => {
  const isFull = useRecoilValue(fullScreenState)
  return (
    <BrowserRouter>
      {!isFull && <Header />}
      <SideBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/watch/:id" element={<DetailVideo />} />
        <Route path="/studio" element={<StudioPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
