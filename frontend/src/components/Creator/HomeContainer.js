import React from "react"

import { Divider } from "@mui/material"

import { PlayAllButton } from "./PlayAllButton"
import VideoContainer from "components/Video/VideoContainer"
import { StyledGrid } from "styles/globalStyle"
import VideosContainer from "components/Video/VideosContainer"

export const HomeContainer = ({ datas }) => {
  return (
    <div>
      <PlayAllButton title={"동영상"} />

      {/* <StyledGrid>
        {datas?.map((value, key) => (
          <VideoContainer data={value} key={key} />
        ))}
      </StyledGrid> */}
      <VideosContainer />
      <Divider />
      <PlayAllButton title={"인기 동영상"} />
    </div>
  )
}
