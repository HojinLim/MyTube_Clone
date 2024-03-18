import { Common } from "Common"
import { fullScreenState } from "atom/fullScreenState"
import Header from "components/Header"
import SideBar from "components/SideBar"
import { DetailVideo } from "pages/DetailVideo"
import { HistoryPage } from "pages/HistoryPage"
import { HomePage } from "pages/HomePage"
import { LaterPage } from "pages/LaterPage"
import { LikePage } from "pages/LikePage"
import { StudioPage } from "pages/StudioPage"
import { SubscriptionPage } from "pages/SubscriptionPage"
import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useRecoilValue } from "recoil"
const Router = () => {
  const isFull = useRecoilValue(fullScreenState)
  return (
    <BrowserRouter>
      {!isFull && <Header />}
      {/* <SideBar /> */}
      <Common />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/watch/:id" element={<DetailVideo />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/like" element={<LikePage />} />
        <Route path="/later" element={<LaterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
