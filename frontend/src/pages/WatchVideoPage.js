import React, { useEffect, useMemo, useRef, useState } from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import ReactPlayer from "react-player/lazy"
import Typography from "@mui/material/Typography"
import Crop75Icon from "@mui/icons-material/Crop75"
import { useNavigate, useParams } from "react-router-dom"
import Avatar from "@mui/material/Avatar"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import { dummyData } from "dummy"
import { UserFeedBackContainer } from "components/UserFeedBackContainer"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import { stringToSeconds } from "functions/stringToSeconds"
import Divider from "@mui/material/Divider"
//Icons
import PauseCircleIcon from "@mui/icons-material/PauseCircle"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import SkipNextIcon from "@mui/icons-material/SkipNext"
import PauseIcon from "@mui/icons-material/Pause"
import MoodIcon from "@mui/icons-material/Mood"
import SortIcon from "@mui/icons-material/Sort"

import screenfull from "screenfull"
import { useRecoilState } from "recoil"
import { fullScreenState } from "atom/fullScreenState"

// Slider
import Slider, { SliderThumb } from "@mui/material/Slider"
import { styled } from "@mui/material/styles"

// Volumn
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import VolumeDownIcon from "@mui/icons-material/VolumeDown"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import Tooltip from "@mui/material/Tooltip"
import { secondsToTime } from "functions/secondsToTime"
import useMediaQuery from "@mui/material/useMediaQuery"
import { VideoInfoContainer } from "components/Watch/VideoInfoContainer"
import { MenuSelector } from "components/common/MenuSelector"
import { NextVideoContainer } from "components/Watch/NextVideoContainer"
import { useLazyQuery, useQuery } from "@apollo/client"
import { GET_ALL_VIDEOS } from "apollo/query"

import { GET_COMMENTS_BY_ID } from "apollo/query"

import { CommentInput } from "components/Watch/CommentInput"
import { CenterPlayEffect } from "components/common/CenterPlayEffect"
import { GET_VIDEO_BY_ID } from "apollo/query"
import { CustomIconMenu } from "components/common/CustomIconMenu"

import { GET_IN_SITE } from "config/constants"
import { VideoPlaySlider } from "styles/globalStyle"
import { playListState } from "atom/playListState"

export const WatchVideoPage = () => {
  const params = useParams()
  const [onPlaying, setOnplaying] = useState("true")

  const matches = useMediaQuery("(min-width:1440px)")

  // Time
  const [playTime, setPlayTime] = useState(0)
  const [playedTime, setPlayedTime] = useState("0:00")
  const [timePercent, setTimePercent] = useState(0)

  // Screen
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMoviescreen, setIsMoviescreen] = useState(false)
  const [recoFull, setRecoFull] = useRecoilState(fullScreenState)

  // Volumn
  const [volumn, setVolumn] = React.useState(30)
  const [prevVolumn, setPrevVolumn] = React.useState(volumn)
  const [get, setGet] = useState(false)
  const handleChange = (event, newValue) => {
    setVolumn(newValue)
  }

  const [hoverVolumn, setHoverVolumn] = React.useState("none")

  const playerRef = React.useRef()

  const goToThere = (seconds) => {
    playerRef?.current.seekTo(seconds, "seconds")
  }

  const handleVideoChange = (event, newValue) => {
    if (video && video?.duration) {
      setTimePercent(newValue)
      const time = (newValue / 100) * stringToSeconds(video?.duration)
      goToThere(time)
    }
  }

  const muteHandler = () => {
    if (volumn !== 0) {
      setPrevVolumn(volumn)
    }
    setVolumn((prev) => (prev === 0 ? prevVolumn : 0))
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "m") {
        muteHandler()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [volumn])
  useEffect(() => {
    return () => {
      console.log("언마운트")
    }
  }, [])

  const [currentVideos, setCurrentVideos] = useState()
  const [restVideos, setRestVideos] = useState()
  const [video, setVideo] = useState(null)
  const videoId = params?.id

  // 쿼리
  const [getVideoById, { data, refetch: refetchVideo }] = useLazyQuery(GET_VIDEO_BY_ID)
  const [getAllVideos, { loading, error, data: videos, refetch }] = useLazyQuery(GET_ALL_VIDEOS)

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

    getAllVideos({
      variables: {},
      onCompleted: () => {},
      onError: (e) => {
        console.log(e)
      },
    })
  }, [params?.id])
  const [playList, setPlayList] = useRecoilState(playListState)
  useEffect(() => {
    // refetch()
    setVideo(data?.youtubeMedia)
    console.log(videos?.youtubeMedias)
    const restVideos = videos?.youtubeMedias?.filter((video) => video?.id !== videoId)
    setRestVideos(restVideos)
    restVideos?.map((video) => setPlayList((prev) => [...prev, video.id]))
    // console.log(restVideos)
  }, [data, videos])

  const getComments = async () => {
    setGet(false)
    await getCommentsById({
      variables: { id: videoId },
      onCompleted: () => {
        setGet(true)
      },
    })
  }

  const [
    getCommentsById,
    { loading: commentsLoading, error: commentError, data: commentData, refetch: refetchComments },
  ] = useLazyQuery(GET_COMMENTS_BY_ID)
  useEffect(() => {
    if (commentData && commentData.comments) {
      setComments(commentData.comments)
    }
  }, [commentData])
  console.log(commentData)

  useEffect(() => {
    getComments()
    setComments(commentData)
  }, [])

  useEffect(() => {
    setTimePercent((playTime / stringToSeconds(video?.duration ?? "1:00")) * 100)
    setPlayedTime(secondsToTime(Math.trunc(playTime)))
  }, [playTime])
  console.log(video)

  const clickSreen = () => {
    setOnplaying((prev) => !prev)
  }

  useEffect(() => {
    screenfull.on("change", () => {
      if (screenfull.isFullscreen) {
        setIsFullscreen(true)
        setRecoFull(true)
      } else {
        setIsFullscreen(false)
        setRecoFull(false)
      }
    })

    return () => {
      screenfull.off("change")
      localStorage.setItem(GET_IN_SITE, "false")
      setPlayList([])
    }
  }, [])

  const [handleToggle, setHandleToggle] = useState([])
  const sliderRef = useRef(null)

  // comments, 정렬 관련
  const [comments, setComments] = useState([])

  // 최신순 정렬
  const sortHandler = () => {
    setComments(commentData?.comments?.slice()?.reverse())
  }
  // 인기순- 내림차순 정렬
  const popularHandler = () => {
    const sorted = commentData?.comments?.sort((a, b) => b?.like_users.length - a.like_users.length)
    setComments(sorted)
  }
  const nextVideoHandler = () => {}
  return (
    <div className="detail_page_container">
      <div className="left_container">
        {/* 영상 컨테이너 */}
        <div
          className="screen-container"
          style={
            isFullscreen
              ? { height: "100vh" }
              : isMoviescreen
              ? { maxHeight: "80vh", backgroundColor: "#111111" }
              : { borderRadius: "20px" }
          }
        >
          {/* {loading && <div style={{ height: "70vh" }}>loadding..</div>} */}
          {!loading && video && (
            <ReactPlayer
              ref={playerRef}
              onClick={clickSreen}
              volume={volumn / 100}
              onProgress={(progress) => {
                setPlayTime(progress.playedSeconds)
              }}
              url={process.env.REACT_APP_BACKEND_URL_UPLOAD + video?.contents?.url}
              width={matches && isMoviescreen && "85%"}
              height="100%"
              playing={onPlaying}
              autoPlay={true}
              style={{ margin: "-10px 0px" }}
            />
          )}
          {/* 중앙 플레이 이펙트 */}
          <CenterPlayEffect onPlaying={onPlaying} />

          {/* 영상 상태바 */}
          <div
            style={{
              position: "absolute",
              bottom: "5px",
              color: "white",
              width: "100%",
              marginBottom: "5px",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <VideoPlaySlider ref={sliderRef} value={timePercent} onChange={handleVideoChange} />

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Button
                  onClick={() => {
                    setOnplaying((prev) => !prev)
                  }}
                >
                  {!onPlaying ? <PlayArrowIcon fontSize="large" /> : <PauseIcon fontSize="large" />}
                </Button>
                {/* <Button onClick={nextVideoHandler}>
                  <SkipNextIcon fontSize="large" />
                </Button> */}
                {/* 볼륨 조절 */}
                <Button
                  onClick={muteHandler}
                  onMouseOut={() => setHoverVolumn("none")}
                  onMouseOver={() => setHoverVolumn("")}
                >
                  {volumn === 0 ? (
                    <Tooltip title="음소거 해제(m)" placement="top">
                      <VolumeOffIcon fontSize="large" />
                    </Tooltip>
                  ) : volumn < 60 ? (
                    <Tooltip title="음소거(m)" placement="top">
                      <VolumeDownIcon fontSize="large" />
                    </Tooltip>
                  ) : (
                    <VolumeUpIcon fontSize="large" />
                  )}
                </Button>

                <Slider
                  onMouseOut={() => setHoverVolumn("none")}
                  onMouseOver={() => setHoverVolumn("")}
                  className="volunn_slider"
                  value={volumn}
                  onChange={handleChange}
                  marks={false}
                  sx={{
                    width: "80px",
                    padding: "3px 0px",
                    display: hoverVolumn,
                  }}
                />
                {/* 영상 길이 , 남은 시간 */}
                <Typography variant="caption" gutterBottom style={{ margin: "0px 15px" }}>
                  {`${playedTime} / ${video?.duration}`}
                </Typography>
              </div>

              {/* 전체 화면, 스크린 화면 조절 */}
              <div>
                {!isFullscreen && (
                  // 무비스크린 버튼
                  <Button
                    onClick={() => {
                      setIsMoviescreen((prev) => !prev)
                    }}
                  >
                    <Crop75Icon fontSize={isMoviescreen ? "medium" : "large"} />
                  </Button>
                )}
                {/* 전체 스크린 버튼 */}
                <Button
                  onClick={() => {
                    setIsMoviescreen(false)
                    if (screenfull.isEnabled) {
                      screenfull.toggle()
                    }
                  }}
                >
                  {isFullscreen ? (
                    <FullscreenExitIcon fontSize="large" />
                  ) : (
                    <FullscreenIcon fontSize="large" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: "100%", height: "100%", display: "flex" }}>
          {/* part1 */}
          <div className="screen_bottom_left_container">
            {/* 영상 정보 컨테이너 */}

            <div className="screen_info_container" style={isFullscreen ? { display: "none" } : {}}>
              <VideoInfoContainer
                id={id}
                loading={loading}
                error={error}
                video={video ?? {}}
                refetch={refetchVideo}
              />
              <Container>
                <div className="comments-container">
                  <div style={{ display: "flex", placeItems: "center" }}>
                    <Typography variant="h6" fontWeight="700">
                      댓글 {commentData?.comments?.length}개
                    </Typography>

                    <div style={{ display: "flex", placeItems: "center" }} onClick={() => {}}>
                      <CustomIconMenu
                        iconButton={<SortIcon />}
                        menuItems={[
                          {
                            text: "인기 댓글순",
                            onClick: popularHandler,
                          },
                          {
                            text: "최신순",
                            onClick: sortHandler,
                          },
                        ]}
                      />
                      <Typography variant="body1">정렬 기준</Typography>
                    </div>
                  </div>

                  <CommentInput
                    keyword={"댓글"}
                    subId={videoId}
                    refetchComments={refetchComments}
                    videoOwner={currentVideos?.created_user?.id}
                  />
                </div>
              </Container>

              {/* 댓글 작성 컨테이터 */}
            </div>

            {/* 나머지 데이터 */}
            <div className={"videos_bottom_container"}>
              <MenuSelector categories={["모두", "최근에 업로드된 동영상"]} />
              {restVideos?.map((video, key) => (
                <NextVideoContainer key={key} data={video} />
              ))}
            </div>

            <Divider />

            {/* 댓글 컨테이너 */}
            <div
              className="screen_comment_container"
              style={isFullscreen ? { display: "none" } : {}}
            >
              {/* {console.log(comments)} */}
              {!loading &&
                commentData &&
                comments &&
                comments?.map((data, key) => (
                  <React.Fragment key={key}>
                    <UserFeedBackContainer
                      identify={key}
                      comment={data}
                      fixIsParent
                      commentsLoading={commentsLoading}
                      getComments={getComments}
                      refetchComments={refetchComments}
                      handleToggle={handleToggle}
                      setHandleToggle={setHandleToggle}
                    />
                    {handleToggle?.includes(key) &&
                      data?.replies.map((value, subKey) => (
                        <UserFeedBackContainer
                          key={`child-${subKey}`}
                          comment={value}
                          fixIsParent={false}
                          commentsLoading={commentsLoading}
                          getComments={getComments}
                          refetchComments={refetchComments}
                        />
                      ))}
                  </React.Fragment>
                ))}
            </div>
          </div>
          {/* part2 */}

          {isMoviescreen && (
            <div className="videos_side_container">
              {restVideos?.map((video, key) => (
                <NextVideoContainer key={key} data={video} />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* 우측 사이드 부분 */}
      {!isMoviescreen && !isFullscreen && (
        <div className="videos_side_container">
          {/* 다음 영상 틀 */}
          <MenuSelector categories={["모두", "주인장 제공", "최근에 업로드된 동영상"]} />
          <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
            {restVideos?.map((video, key) => (
              <NextVideoContainer key={key} data={video} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
