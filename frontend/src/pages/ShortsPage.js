import React, { useEffect, useState } from "react"

import { ShortsItem } from "components/shorts/ShortsItem"
import ReactPlayer from "react-player"
import { dummyData } from "dummy"

export const ShortsPage = () => {
  return (
    <>
      <ShortsItem />
      <ShortsItem />
    </>
  )
}
