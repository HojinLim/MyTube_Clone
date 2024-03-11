import React, { useEffect, useRef, useState } from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import ReactPlayer from "react-player/lazy"
import Typography from "@mui/material/Typography"

import Avatar from "@mui/material/Avatar"
import { formatTime } from "functions/formatTime"
export const VideoContainer = (data) => {
  const { thumb, title, subtitle, sources, duration } = data.data
  const [hover, setHover] = useState(false)
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimer((prevCount) => prevCount + 1)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])
  useEffect(() => {}, [timer])
  const mouseHoverOver = () => {
    setHover(true)
  }
  const mouseHoverOut = () => {
    setHover(false)
    setTimer(0)
  }
  return (
    <Container
      sx={{
        flexGrow: 1,
        flexDirection: "column",
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          flexGrow: 1,
          bgcolor: "#ccc",
          width: "100%",
          maxWidth: "450px",
          height: "250px",
          borderRadius: "20px",
        }}
      >
        {/* 썸네일 또는 영상 */}

        <div
          style={{ width: "100%", height: "100%", borderRadius: "20px" }}
          onMouseOver={mouseHoverOver}
          onMouseOut={mouseHoverOut}
        >
          {hover ? (
            <ReactPlayer
              url={sources[0]}
              width="100%"
              height="100%"
              playing={true}
              autoPlay={true}
              style={{ borderRadius: "20px" }}
            />
          ) : (
            <img src={thumb} alt="Video Thumbnail" style={{ width: "100%", height: "100%" }} />
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
          {hover ? `${formatTime(timer)} / ${duration ?? "00:00"}` : `${duration ?? "00:00"}`}
        </Typography>
      </Box>
      {/* 프로필, 제목, 조회수 */}
      <Container
        sx={{
          flexGrow: 1,
          flexDirection: "row",
          display: "flex",
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
            조회수 100회 ⦁ 10시간 전
          </Typography>
        </Container>
      </Container>
    </Container>
  )
}
