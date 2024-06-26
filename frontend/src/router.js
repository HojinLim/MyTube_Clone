import { Common } from "Common"
import { fullScreenState } from "atom/fullScreenState"
import Header from "components/common/Header"
import SideBar from "components/SideBar"
import { WatchVideoPage } from "pages/WatchVideoPage"
import { HistoryPage } from "pages/HistoryPage"
import { HomePage } from "pages/HomePage"
import { LaterPage } from "pages/LaterPage"
import { LikePage } from "pages/LikePage"
import { ShortsPage } from "pages/ShortsPage"
import { StudioPage } from "pages/StudioPage"
import { SubscriptionPage } from "pages/SubscriptionPage"
import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { TestPage } from "pages/TestPage"
import { NotFoundPage } from "pages/NotFoundPage"
import { CreatorPage } from "pages/CreatorPage"
import { PostPage } from "pages/PostPage"
import { SearchPage } from "pages/SearchPage"
import { studioPageState } from "atom/studioPageState"
import { StudioHeader } from "components/Studio/StudioHeader"

const Router = () => {
  const isFull = useRecoilValue(fullScreenState)
  const isStudio = useRecoilValue(studioPageState)
  return (
    <BrowserRouter>
      {!isStudio && !isFull ? <Header /> : <StudioHeader />}
      <Common />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/watch/:id" element={<WatchVideoPage />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/like" element={<LikePage />} />
        <Route path="/later" element={<LaterPage />} />
        <Route path="/shorts" element={<ShortsPage />} />
        <Route path="/shorts/:id" element={<ShortsPage />} />
        <Route path="/:nickname" element={<CreatorPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/:keyword" element={<SearchPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
