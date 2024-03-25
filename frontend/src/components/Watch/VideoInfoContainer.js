import React, { useEffect } from "react"
import { Container, Typography, Avatar, Button, Box } from "@mui/material"
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined"
import Grid from "@mui/material/Grid"
import Tooltip from "@mui/material/Tooltip"
import { useState } from "react"
import Divider from "@mui/material/Divider"

// Icons
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined"
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt"
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded"
import Stack from "@mui/material/Stack"

export const VideoInfoContainer = ({ title, subtitle }) => {
  const [thumbUp, setThumbup] = useState(null)
  const [thumbDown, setThumbDown] = useState(null)
  const [likeCount, setLikeCount] = useState(0)

  const [subscript, setSubscript] = useState(false)

  const thumbUpHandler = () => {
    setThumbup((prev) => !prev)
    if (thumbDown) {
      setThumbDown(false)
    }
    if (!thumbUp) {
      setLikeCount((prev) => prev + 1)
    } else {
      setLikeCount((prev) => prev - 1)
    }
  }
  const thumbDownHandler = () => {
    setThumbDown((prev) => !prev)
    if (thumbUp) {
      setThumbup(false)
      setLikeCount((prev) => prev - 1)
    }
  }

  return (
    <Container
      sx={{
        flexGrow: 1,
        flexDirection: "row",
        display: "flex",
        padding: "15px",
      }}
    >
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
        <div style={{ display: "flex" }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <div style={{ display: "flex", flexDirection: "column", margin: "0px 12px" }}>
            <Typography variant="body2" gutterBottom color={"gray"}>
              {subtitle}
            </Typography>
            <Typography variant="body2" gutterBottom color={"gray"}>
              구독자 100만명
            </Typography>
          </div>
          <Button
            onClick={() => setSubscript((prev) => !prev)}
            variant="contained"
            sx={{
              backgroundColor: "black",
              borderRadius: "20px",
              maxHeight: "40px",
              color: "white",
            }}
          >
            {subscript && <NotificationsNoneOutlinedIcon />}
            {subscript ? "구독" : "구독중"}
          </Button>

          <Stack
            direction="row"
            spacing={1}
            borderRadius={"20px"}
            padding={"0px 15px"}
            backgroundColor={"lightgray"}
            className="hover"
            justifyContent={"center"}
            alignItems={"center"}
            maxHeight="40px"
            margin={"0px 10px"}
          >
            <div
              onClick={thumbUpHandler}
              style={{ justifyContent: "center", alignItems: "center", display: "flex" }}
            >
              {likeCount}
              {thumbUp ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />}
            </div>
            <Divider orientation="vertical" />
            <div onClick={thumbDownHandler}>
              {thumbDown ? <ThumbDownRoundedIcon /> : <ThumbDownOffAltIcon />}
            </div>
          </Stack>
        </div>
        <Box
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#eee",
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
    </Container>
  )
}
