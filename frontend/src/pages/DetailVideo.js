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

import Button from "@mui/material/Button"
import { stringToSeconds } from "functions/stringToSeconds"
//Icons
import PauseCircleIcon from "@mui/icons-material/PauseCircle"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import SkipNextIcon from "@mui/icons-material/SkipNext"
import PauseIcon from "@mui/icons-material/Pause"

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
export const DetailVideo = () => {
  const params = useParams()
  const [startVid, setStartVid] = useState("true")

  const matches = useMediaQuery("(min-width:1024px)")

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

  const handleChange = (event, newValue) => {
    setVolumn(newValue)
  }
  const playerRef = React.useRef()

  const goToThere = (seconds) => {
    playerRef.current.seekTo(seconds, "seconds")
  }

  const handleVideoChange = (event, newValue) => {
    // newValue = 0 ~ 100

    setTimePercent(newValue)
    const time = (newValue / 100) * stringToSeconds(duration)
    goToThere(time)
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

  const videoId = params.id
  const video = dummyData.find((video) => video.id + "" === videoId)
  const { thumb, title, subtitle, sources, duration } = video

  useMemo(() => {
    setTimePercent((playTime / stringToSeconds(duration)) * 100)
    setPlayedTime(secondsToTime(Math.trunc(playTime)))
  }, [playTime])

  const clickSreen = () => {
    setStartVid((prev) => !prev)
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
    }
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

  return (
    <div className="detail_container" style={!isFullscreen ? { paddingTop: "60px" } : {}}>
      <div className="left_container">
        {/* 영상 컨테이너 */}

        <div className="left_item_1" style={isFullscreen || isMoviescreen ? { width: "97vw" } : {}}>
          <div
            style={{
              flexGrow: 1,
              flexDirection: "column",
              display: "flex",
              gap: "10px",
              justifyContent: "end",
              position: "relative",
              alignContent: "end",
            }}
          >
            <ReactPlayer
              ref={playerRef}
              onClick={clickSreen}
              volume={volumn / 100}
              onProgress={(progress) => {
                setPlayTime(progress.playedSeconds)
              }}
              url={sources[0]}
              width="100%"
              height="100%"
              playing={startVid}
              autoPlay={true}
            />
            {startVid ? (
              <PlayCircleIcon
                sx={{ fontSize: "70px" }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  animation: "growAndFade 2s forwards",
                  animationPlayState: "initial",
                }}
              />
            ) : (
              <PauseCircleIcon
                sx={{ fontSize: "70px" }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  animation: "growAndFade 2s forwards",
                  animationPlayState: "initial",
                }}
              />
            )}

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
                      setStartVid((prev) => !prev)
                    }}
                  >
                    {!startVid ? (
                      <PlayArrowIcon fontSize="large" />
                    ) : (
                      <PauseIcon fontSize="large" />
                    )}
                  </Button>
                  {/* 볼륨 조절 */}
                  <Button onClick={muteHandler}>
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
                  <Button>
                    <SkipNextIcon fontSize="large" />
                  </Button>
                  <Slider
                    className="volunn_slider"
                    aria-label="Volume"
                    value={volumn}
                    onChange={handleChange}
                    marks={false}
                    sx={{
                      width: "80px",
                      padding: "3px 0px",
                    }}
                  />
                  {/* 영상 길이 , 남은 시간 */}
                  <Typography variant="caption" gutterBottom style={{ margin: "0px 15px" }}>
                    {`${playedTime} / ${duration}`}
                  </Typography>
                </div>

                {/* 전체 화면, 스크린 화면 조절 */}
                <div>
                  {!isFullscreen && (
                    <Button
                      onClick={() => {
                        setIsMoviescreen((prev) => !prev)
                      }}
                    >
                      <Crop75Icon fontSize={isMoviescreen ? "medium" : "large"} />
                    </Button>
                  )}

                  <Button
                    onClick={() => {
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
        </div>
        {/* 영상 정보 컨테이너 */}
        <div className="left_item_2" style={isFullscreen ? { display: "none" } : {}}>
          <Container
            sx={{
              flexGrow: 1,
              flexDirection: "row",
              display: "flex",
              padding: "15px",
            }}
          >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />

            <Container
              sx={{
                flexGrow: 1,
                flexDirection: "column",
                display: "flex",
              }}
            >
              <Typography variant="h6" gutterBottom>
                {title}
              </Typography>
              <Typography variant="body2" gutterBottom color={"gray"}>
                {subtitle}
              </Typography>
              <Typography variant="body2" gutterBottom color={"gray"}>
                구독자 100만명
              </Typography>
              <Box
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "gray",
                  flexDirection: "column",
                  display: "flex",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <Typography variant="caption" gutterBottom>
                  조회수 100회 10시간 전
                </Typography>
                <Typography variant="caption" gutterBottom>
                  React JS Tutorial for Beginners - Learn React 18 with TypeScript and build awesome
                  frontend app!
                </Typography>
              </Box>
            </Container>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "black",
                color: "white",
                alignSelf: "center",
                borderRadius: "20px",
              }}
            >
              구독
            </Button>
          </Container>
        </div>

        <div className={"videos_bottom_container"}>
          <div>fff</div>
          <div>fff</div>
          <div>fff</div>
          <div>fff</div>
          <div>fff</div>
          <div>fff</div>
          <div>fff</div>
          <div>fff</div>
        </div>

        {/* 댓글 컨테이너 */}
        <div className="left_item_3" style={isFullscreen ? { display: "none" } : {}}>
          <UserFeedBackContainer contents={"nice video!"} date={"2024-03-10"} />
          <UserFeedBackContainer contents={"nice video!"} date={"2024-03-10"} />
          <UserFeedBackContainer contents={"nice video!"} date={"2024-03-10"} />
          <UserFeedBackContainer contents={"nice video!"} date={"2024-03-10"} />
          {/* <UserFeedBackContainer contents={"nice video!"} date={"2024-03-10"} /> */}
        </div>
      </div>
      <div className="videos_side_container">
        <div>fff</div>
        <div>fff</div>
        <div>fff</div>
        <div>fff</div>
        <div>fff</div>
      </div>
      {/* 다른 영상들 컨테이너 */}
    </div>
  )
}
