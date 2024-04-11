import React, { useEffect } from "react"

import { dummyData } from "dummy"

import { StyledGrid } from "styles/globalStyle"
import { useQuery } from "@apollo/client"
import { GET_ALL_VIDEOS } from "apollo/query"
import VideoContainer from "./VideoContainer"

export default function VideosContainer() {
  const [dummy, setDummy] = React.useState()
  const [videoDatas, setVideoDatas] = React.useState()

  const { loading, error, data: videos, refetch } = useQuery(GET_ALL_VIDEOS)
  console.log(videos)
  useEffect(() => {
    console.log(videos)
  }, [loading, error, videos])

  React.useEffect(() => {
    setDummy(dummyData)
  }, [dummyData])

  return (
    <>
      <StyledGrid>
        {!error &&
          !loading &&
          videos.youtubeMedias.map((data, key) => (
            <VideoContainer key={key} data={data} refetch={refetch} loading={loading} />
          ))}
      </StyledGrid>
    </>
  )
}
