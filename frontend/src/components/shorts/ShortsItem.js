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

export const ShortsItem = (props) => {
  const { identify, shorts, refetch } = props
  const { id, contents } = shorts ?? {}
  console.log(id)
  console.log(dummyData[0].sources[0])
  const [volumn, setVolumn] = useState(30)
  const [showVolumeControl, setShowVolumeControl] = useState(false)

  const [openComment, setOpenComment] = useState(false)
  const [openInput, setOpenInput] = useState(false)

  const params = useParams()
  const [video, setVideo] = useState(null)
  const [comments, setComments] = useState(null)
  const [desMode, setDesMode] = useState(false)

  const handleChange = (event, newValue) => {
    setVolumn(newValue)
  }
  // const [getVideoById, { data, refetch }] = useLazyQuery(GET_VIDEO_BY_ID)
  const [getCommentsById, { data: commentData, refetch: commentRefetch }] =
    useLazyQuery(GET_COMMENTS_BY_ID)

  // const { id, contents } = video ?? {}
  console.log(identify)
  useEffect(() => {
    console.log(identify)
  }, [])

  // useEffect(() => {
  //   getVideoById({
  //     variables: { id: params?.id },
  //     onCompleted: () => {
  //       console.log("hi")
  //     },
  //     onError: (e) => {
  //       console.log(e)
  //     },
  //   })
  // }, [params?.id])
  // useEffect(() => {
  //   console.log(data)
  //   setVideo(data?.youtubeMedia)
  //   console.log(id)
  // }, [data])

  useEffect(() => {
    getCommentsById({ variables: { id: id } })
  }, [openComment])

  useEffect(() => {
    if (commentData) {
      setComments(commentData?.comments)
      console.log(comments)
    }
  }, [commentData])

  const [onPlaying, setOnPlaying] = useState(true)

  const [prevVolumn, setPrevVolumn] = useState(volumn)

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
    <section className="new-slider-section">
      <div style={{ display: "flex" }}>
        <div
          style={{
            margin: "auto",
            width: "400px",
            height: "700px",
            borderRadius: "20px",
            objectFit: "cover",
            backgroundColor: "black",
            overflow: "auto",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* 볼륨 */}
            <div style={{ display: "flex", justifyContent: "space-between", height: "10%" }}>
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
            {/* 영상 */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                color: "wheat",
                minHeight: "70%",
                overflow: "hidden",
              }}
            >
              <ReactPlayer
                onClick={handlePause}
                url={process.env.REACT_APP_BACKEND_URL_UPLOAD + contents?.url}
                width="100%"
                height="100%"
                playing={onPlaying}
                // style={{ overflow: "hidden" }}
              />
            </div>
            {/* ERROR: 위치-  재생 버튼 이펙트  */}
            {/* <CenterPlayEffect onPlaying={onPlaying} /> */}

            {/* 영상 주인 정보 */}

            <ShortsInfoContainer video={shorts} refetch={refetch} />
          </div>
        </div>

        {/* 상호작용 버튼 컨테이너 */}
        <ShortsButtonContainer
          id={id}
          video={shorts}
          comments={comments}
          openComment={openComment}
          setOpenComment={setOpenComment}
          refetch={refetch}
          desMode={desMode}
          setDesMode={setDesMode}
        />
        {/* 댓글 컨테이너 */}
        {openComment && (
          <ShortsCommentContainer
            video={shorts}
            comments={comments}
            commentRefetch={commentRefetch}
            setOpenComment={setOpenComment}
            setOpenInput={setOpenInput}
            openInput={openInput}
            setDesMode={setDesMode}
            desMode={desMode}
          />
        )}
      </div>
    </section>
  )
}
