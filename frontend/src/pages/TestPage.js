// 단지 테스트용 페이지입니다.
// 향후 제거될 예정입니다.
// /test
import React, { useEffect } from "react"
import ReactPlayer from "react-player/lazy"
import { dummyData } from "dummy"
import { FIND_USER_BY_EMAIL } from "apollo/query"
import { useLazyQuery, useQuery } from "@apollo/client"

export const TestPage = () => {
  // const url = process.env.REACT_APP_BACKEND_URL_UPLOAD + "/uploads/Sample_Video_3_1f7b0aaf55.mp4"

  return (
    <>
      {/* <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        playing
        autoPlay={true}
        style={{ borderRadius: "20px" }}
      /> */}
    </>
  )
}
