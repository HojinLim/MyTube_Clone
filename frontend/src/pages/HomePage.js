import { CategoryButton } from "components/CategoryButton"
import Header from "components/Header"
import SideBar from "components/SideBar"
import VideosContainer from "components/Video/VideosContainer"
import React from "react"

export const HomePage = () => {
  return (
    <>
      <Header />
      <SideBar />
      <CategoryButton />
      <VideosContainer />
    </>
  )
}
