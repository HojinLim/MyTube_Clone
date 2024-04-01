import React, { useEffect } from "react"

import { VideoContainer } from "./VideoContainer"
import { dummyData } from "dummy"
import { styled } from "@mui/material/styles"
import { MenuSelector } from "components/common/MenuSelector"
import { StyledGrid } from "styles/globalStyle"
import { useQuery } from "@apollo/client"
import { GET_ALL_VIDEOS } from "apollo/query"

export default function VideosContainer() {
  const [dummy, setDummy] = React.useState()
  const [videoDatas, setVideoDatas] = React.useState()

  const { loading, error, data: videos } = useQuery(GET_ALL_VIDEOS)

  // useEffect(() => {
  //   setVideoDatas(videos)
  // }, [loading, error, videos])

  React.useEffect(() => {
    setDummy(dummyData)
  }, [dummyData])

  return (
    <>
      <StyledGrid>
        {!error &&
          !loading &&
          videos.youtubeMedias.map((data, key) => <VideoContainer key={key} data={data} />)}
      </StyledGrid>
    </>
  )
}
