import React, { useEffect, useState } from "react"

import { dummyData } from "dummy"
import ReactPlayer from "react-player"

import { ShortsCommentContainer } from "components/shorts/ShortsCommentContainer"
import { ShortsButtonContainer } from "components/shorts/ShortsButtonContainer"
import { CenterPlayEffect } from "components/common/CenterPlayEffect"
import { ShortsInfoContainer } from "components/shorts/ShortsInfoContainer"
import { ShortsVolumnController } from "components/shorts/ShortsVolumnController"
import { useNavigate, useParams } from "react-router-dom"
import { useLazyQuery } from "@apollo/client"
import { GET_VIDEO_BY_ID } from "apollo/query"
import { GET_COMMENTS_BY_ID } from "apollo/query"

export const ShortsItem = () => {
  console.log(dummyData[0].sources[0])
  const [volumn, setVolumn] = useState(30)
  const [showVolumeControl, setShowVolumeControl] = useState(false)
  const [good, setGood] = useState(false)
  const [bad, setBad] = useState(false)
  const [openComment, setOpenComment] = useState(false)
  const [openInput, setOpenInput] = useState(false)
  const [sub, setSub] = useState(false)
  const params = useParams()
  const [video, setVideo] = useState(null)
  const [comments, setComments] = useState(null)
  const navi = useNavigate()
  const handleChange = (event, newValue) => {
    setVolumn(newValue)
  }
  const [getVideoById, { data, refetch }] = useLazyQuery(GET_VIDEO_BY_ID)
  const [getCommentsById, { data: commentData, refetch: commentRefetch }] =
    useLazyQuery(GET_COMMENTS_BY_ID)

  const { id, contents } = video ?? {}

  useEffect(() => {
    getVideoById({
      variables: { id: params?.id },
      onCompleted: () => {
        console.log("hi")
      },
      onError: (e) => {
        console.log(e)
      },
    })
  }, [params?.id])
  useEffect(() => {
    console.log(data)
    setVideo(data?.youtubeMedia)
    console.log(id)
  }, [data])

  useEffect(() => {
    getCommentsById({ variables: { id: params?.id } })
  }, [openComment])

  useEffect(() => {
    if (commentData) {
      setComments(commentData?.comments)
      console.log(comments)
    }
  }, [commentData])

  const [onPlaying, setOnPlaying] = useState(true)

  const [prevVolumn, setPrevVolumn] = useState(volumn)
  const [get, setGet] = useState(false)
  const muteHandler = () => {
    if (volumn !== 0) {
      setPrevVolumn(volumn)
    }
    setVolumn((prev) => (prev === 0 ? prevVolumn : 0))
  }

  const handlePause = () => {
    setOnPlaying((prev) => !prev)
  }
  return (
    <div style={{ position: "relative", display: "flex" }}>
      {/* 상위 요소를 position: relative로 설정 */}
      <div
        style={{
          scrollSnapAlign: "start",
          width: "400px",
          height: "700px",
          border: "1px solid #e0e0e0",
          borderRadius: "20px",
          objectFit: "cover",
          backgroundColor: "black",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <ShortsVolumnController
              muteHandler={muteHandler}
              volumn={volumn}
              onPlaying={onPlaying}
              handleChange={handleChange}
              showVolumeControl={showVolumeControl}
              setShowVolumeControl={setShowVolumeControl}
              handlePause={handlePause}
            />
          </div>
          {/* 하단 영상 정보 */}
          <ShortsInfoContainer video={video} sub={sub} setSub={setSub} refetch={refetch} />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "65%",
            margin: "80px 0px",
            color: "wheat",
            position: "relative",
          }}
        >
          {/* 영상 */}
          <ReactPlayer
            onClick={handlePause}
            // REACT_APP_BACKEND_URL_UPLOAD
            // url={dummyData[0].sources[0]}
            url={process.env.REACT_APP_BACKEND_URL_UPLOAD + contents?.url}
            width={"100%"}
            height={"100%"}
            playing={onPlaying}
          />

          {/* 중앙 아이콘 애니메이션 */}
          <CenterPlayEffect onPlaying={onPlaying} />
        </div>
      </div>
      {/* 상호작용 버튼 컨테이너 */}
      <ShortsButtonContainer
        id={id}
        video={video}
        comments={comments}
        setGood={setGood}
        good={good}
        bad={bad}
        setBad={setBad}
        setOpenComment={setOpenComment}
        refetch={refetch}
      />

      {/* 댓글 컨테이너 */}
      {openComment && (
        <ShortsCommentContainer
          video={video}
          comments={comments}
          commentRefetch={commentRefetch}
          setOpenComment={setOpenComment}
          setOpenInput={setOpenInput}
          openInput={openInput}
        />
      )}
    </div>
  )
}
