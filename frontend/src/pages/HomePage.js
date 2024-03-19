import { CategoryButton } from "components/CategoryButton"
import { HomeCategory } from "components/Home/HomeCategory"

import VideosContainer from "components/Video/VideosContainer"
import { MenuSelector } from "components/common/MenuSelector"
import { dummyData } from "dummy"
import React from "react"

export const HomePage = () => {
  return (
    <>
      <HomeCategory />
      <VideosContainer />
    </>
  )
}
