import React, { useEffect, useMemo, useRef, useState } from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import ReactPlayer from "react-player/lazy"
import Typography from "@mui/material/Typography"
import { useNavigate } from "react-router-dom"
import Avatar from "@mui/material/Avatar"
import { formatTime } from "functions/formatTime"
import { stringToSeconds } from "functions/stringToSeconds"
import { secondsToTime } from "functions/secondsToTime"

export const VideoContainer = ({ data }) => {
  // const { thumb, title, subtitle, sources, duration } = data
  const {
    // thumb,
    title,
    subtitle,
    sources,
    duration,
    id,

    createdBy,
    description,
    isPublic,
    created_at,
    thumbnail: thumb,
    contents,
  } = data

  // console.log(data)

  const [hover, setHover] = useState(false)
  // const [timer, setTimer] = useState(0)
  const navigate = useNavigate()

  const [playTime, setPlayTime] = useState(0)
  const [playedTime, setPlayedTime] = useState("0:00")
  const [startVideo, setStartVideo] = useState(false)

  useMemo(() => {
    setPlayedTime(secondsToTime(Math.trunc(playTime)))
  }, [playTime])

  const mouseHoverOver = () => {
    setHover(true)
    setStartVideo(true)
  }
  const mouseHoverOut = () => {
    setHover(false)
    setPlayTime(0)
    setStartVideo(false)
  }
  const moveDetailPage = () => {
    navigate(`/watch/${id}`)
  }
  // console.log(thumb.url)
  return (
    <Container
      sx={{
        flexGrow: 1,
        flexDirection: "column",
        display: "flex",
        gap: "15px",
        justifyContent: "center",
        alignContent: "center",
        maxWidth: "500px",
        width: "500px",
        width: { xl: "380px" },
        margin: "auto",
        padding: "auto",
      }}
    >
      <Box
        sx={{
          position: "relative",
          flexGrow: 1,
          width: "100%",
          maxWidth: "450px",
          // height: "250px",
          height: { xs: "250px", sm: "250px", md: "250px", lg: "250px", xl: "220px" },
          borderRadius: "20px",
        }}
      >
        {/* 썸네일 또는 영상 */}
        <div
          className="video-container"
          style={{ width: "100%", height: "100%", borderRadius: "20px" }}
          onMouseOver={mouseHoverOver}
          onMouseOut={mouseHoverOut}
          onClick={moveDetailPage}
        >
          {hover ? (
            <ReactPlayer
              url={process.env.REACT_APP_BACKEND_URL_UPLOAD + contents.url}
              width="100%"
              height="100%"
              playing={startVideo}
              autoPlay={true}
              style={{ borderRadius: "20px" }}
              onProgress={(progress) => {
                setPlayTime(progress.playedSeconds)
              }}
            />
          ) : (
            <img
              src={process.env.REACT_APP_BACKEND_URL_UPLOAD + thumb.url}
              alt="Video Thumbnail"
              style={{ width: "100%", height: "100%", borderRadius: "20px" }}
            />
          )}
        </div>
        {/* 영상 길이 */}
        <Typography
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            color: "white",
            backgroundColor: "black",
            padding: "1px",
            margin: "10px",
            borderRadius: "2px",
          }}
          variant="body2"
          gutterBottom
        >
          {hover ? `${playedTime} / ${duration}` : `${duration ?? "00:00"}`}
        </Typography>
      </Box>
      {/* 프로필, 제목, 조회수 */}
      <Container
        sx={{
          flexGrow: 1,
          flexDirection: "row",
          display: "flex",
          overflow: "hidden",
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
          <Typography
            variant="h6"
            gutterBottom
            style={{
              overflow: "auto",
              maxHeight: "1.5em",
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" gutterBottom color={"gray"}>
            {createdBy}
          </Typography>
          <Typography variant="body2" gutterBottom color={"gray"}>
            조회수 100회 ⦁ 10시간 전
          </Typography>
        </Container>
      </Container>
    </Container>
  )
}
