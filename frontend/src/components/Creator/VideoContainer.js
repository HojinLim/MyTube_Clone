import { MenuSelector } from "components/common/MenuSelector"

import React, { useEffect, useState } from "react"

import VideosContainer from "components/Video/VideosContainer"

export const VideoContainer = ({ datas }) => {
  const [state, setState] = useState(null)
  const [videos, setVideos] = useState([])

  useEffect(() => {
    setVideos(datas)
  }, [datas])

  console.log(datas)
  // 최신순 정렬
  const sortHandler = () => {
    setVideos(datas?.slice()?.reverse())
  }
  // // 인기순- 내림차순 정렬
  const popularHandler = () => {
    const sorted = datas?.sort((a, b) => b?.like_users.length - a.like_users.length)
    setVideos(sorted)
  }
  console.log(state)
  useEffect(() => {
    switch (state) {
      case "최신순": {
        sortHandler()
        break
      }
      case "인기순": {
        popularHandler()
        break
      }
    }
  }, [state])

  return (
    <div>
      <MenuSelector categories={["최신순", "인기순", "날짜순"]} setState={setState} />
      {videos?.map((value, key) => (
        <VideosContainer data={value} key={key} />
      ))}
    </div>
  )
}
