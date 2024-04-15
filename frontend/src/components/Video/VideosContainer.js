import React, { useEffect } from "react"

import { dummyData } from "dummy"

import { StyledGrid } from "styles/globalStyle"
import { useQuery } from "@apollo/client"
import { GET_ALL_VIDEOS } from "apollo/query"
import VideoContainer from "./VideoContainer"
import { useRecoilValue } from "recoil"
import { menuState } from "atom/menuState"

export default function VideosContainer() {
  const [dummy, setDummy] = React.useState()
  const [videoDatas, setVideoDatas] = React.useState()

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
  history
  return (
    <>
      <StyledGrid>
        {!error &&
          !loading &&
          videos.youtubeMedias
            .filter((data) => data?.isPublic == true)
            .filter((data) => menu === "all" || data?.sort === menu) // menu가 '전체'면 필터링을 하지 않음
            .map((data, key) => (
              <VideoContainer key={key} data={data} refetch={refetch} loading={loading} />
            ))}
      </StyledGrid>
    </>
  )
}
