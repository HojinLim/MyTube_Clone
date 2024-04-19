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
import { GET_IN_SITE } from "Constants/value"
import { IconButton } from "@mui/material"
import { CommentInput } from "components/Watch/CommentInput"
import { CenterPlayEffect } from "components/common/CenterPlayEffect"

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
    playerRef.current.seekTo(seconds, "seconds")
  }

  const handleVideoChange = (event, newValue) => {
    if (currentVideos && currentVideos.duration) {
      setTimePercent(newValue)
      const time = (newValue / 100) * stringToSeconds(currentVideos.duration)
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

  const [currentVideos, setCurrentVideos] = useState()
  const [restVideos, setRestVideos] = useState()

  const videoId = params.id

  const getData = async () => {
    refetch()
    const video = await videos.youtubeMedias.find((video) => video.id === videoId)
    const restVideos = await videos.youtubeMedias.filter((video) => video.id !== videoId)

    setCurrentVideos(video)
    setRestVideos(restVideos)
  }

  const { loading, error, data: videos, refetch } = useQuery(GET_ALL_VIDEOS)

  useEffect(() => {
    if (!loading && !error) {
      getData()
    }
  }, [loading, error])

  useMemo(() => {
    setTimePercent((playTime / stringToSeconds(currentVideos?.duration ?? "1:00")) * 100)
    setPlayedTime(secondsToTime(Math.trunc(playTime)))
  }, [playTime])

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
    }
  }, [])
  const getComments = async () => {
    // refetchComments()
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
    if (!commentsLoading) {
      setGet(false)
    }
  }, [commentsLoading])
  console.log(commentData)
  useEffect(() => {
    getComments()
  }, [])

  const VideoPlaySlider = styled(Slider)({
    color: "#eb4034",
    height: 5,
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      height: 12,
      width: 12,
      backgroundColor: "#eb4034",
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&::before": {
        display: "none",
      },
    },
    "&.MuiSlider-dragging": {
      "& .MuiSlider-thumb": {
        height: 20,
        width: 20,
      },
    },
    "& .MuiSlider-valueLabel": {},
  })

  const [handleToggle, setHandleToggle] = useState(false)

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
          {loading && <div>loadding..</div>}
          {currentVideos && (
            <ReactPlayer
              ref={playerRef}
              onClick={clickSreen}
              volume={volumn / 100}
              onProgress={(progress) => {
                setPlayTime(progress.playedSeconds)
              }}
              url={process.env.REACT_APP_BACKEND_URL_UPLOAD + currentVideos.contents.url}
              width={matches && isMoviescreen && "85%"}
              height={"100%"}
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
            <VideoPlaySlider value={timePercent} onChange={handleVideoChange} />

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
                <Button>
                  <SkipNextIcon fontSize="large" />
                </Button>
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
                  aria-label="Volume"
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
                  {`${playedTime} / ${currentVideos?.duration}`}
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
                loading={loading}
                error={error}
                currentVideos={currentVideos ?? ""}
                getData={getData}
              />
              <Container>
                <div className="comments-container">
                  <div style={{ display: "flex", justifyItems: "center" }}>
                    <Typography variant="h6" fontWeight={"700"}>
                      댓글 {commentData?.comments?.length}개
                    </Typography>
                    <IconButton style={{ color: "black" }}>
                      <SortIcon />
                    </IconButton>
                    <Typography>정렬 기준</Typography>
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
              <MenuSelector
                categories={["모두", "주인장 제공", "최근에 업로드된 동영상", "감상한 동영상"]}
              />
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
              {commentData?.comments
                ?.filter((value, key) => value.isParent)
                .map((data, key) => (
                  <React.Fragment key={key}>
                    <UserFeedBackContainer
                      key={`parent-${key}`}
                      comment={data}
                      fixIsParent={true}
                      commentsLoading={commentsLoading}
                      getComments={getComments}
                      refetchComments={refetchComments}
                      handleToggle={handleToggle}
                      setHandleToggle={setHandleToggle}
                    />

                    {handleToggle &&
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
          <MenuSelector
            categories={["모두", "주인장 제공", "최근에 업로드된 동영상", "감상한 동영상"]}
          />
          {restVideos?.map((video, key) => (
            <NextVideoContainer key={key} data={video} />
          ))}
        </div>
      )}
    </div>
  )
}
