import React, { useEffect, useRef } from "react"

import { dummyData } from "dummy"

import { StyledGrid } from "styles/globalStyle"
import { useQuery } from "@apollo/client"
import { GET_ALL_VIDEOS } from "apollo/query"
import VideoContainer from "./VideoContainer"
import { useRecoilValue } from "recoil"
import { menuState } from "atom/menuState"
import { VideoSkeleton } from "components/skeleton/VideoSkeleton"

export default function VideosContainer() {
  const [dummy, setDummy] = React.useState()

  const { loading, error, data: videos, refetch } = useQuery(GET_ALL_VIDEOS)
  console.log(videos)
  const menu = useRecoilValue(menuState)
  useEffect(() => {
    console.log(videos)
  }, [loading, error, videos])

  React.useEffect(() => {
    setDummy(dummyData)
  }, [dummyData])
  console.log(menu)

  return (
    <>
      <StyledGrid>
        {videos?.youtubeMedias
          .filter((data) => data?.isPublic === true)
          .filter((data) => menu === "all" || data?.sort === menu)
          .map((data, key) => (
            <VideoContainer key={key} data={data} refetch={refetch} loading={loading} />
          ))}
        {loading && (
          <>
            {[...Array(8)].map((_, index) => (
              <VideoSkeleton key={index} />
            ))}
          </>
        )}
      </StyledGrid>
    </>
  )
}
