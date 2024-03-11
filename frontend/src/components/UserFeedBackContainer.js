import React, { useEffect, useRef, useState } from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { IconButton, Button } from "@mui/material"

import Typography from "@mui/material/Typography"
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt"
import Avatar from "@mui/material/Avatar"
import ReactPlayer from "react-player/lazy"
import { timeForToday } from "functions/timeForToday"
{
  /* eslint-disable react/prop-types  */
}
export const UserFeedBackContainer = (props) => {
  return (
    <Container
      sx={{
        flexGrow: 1,
        flexDirection: "row",
        display: "flex",
        marginY: "15px",
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
        <div
          style={{
            display: "flex",
          }}
        >
          <Typography variant="body2" sx={{ marginRight: "5px" }}>
            @Mr. Beast
          </Typography>
          {/* 댓글 시간 */}
          <Typography variant="body2" gutterBottom color={"gray"}>
            {timeForToday(props.date)}
          </Typography>
        </div>
        {/* eslint-disable react/prop-types  */}
        <Typography variant="h6" gutterBottom>
          {props.contents}
        </Typography>
        {/* 유저 피드백 상호 버튼 */}
        <div
          style={{
            display: "flex",
          }}
        >
          <Button sx={{ borderRadius: "20px" }}>
            <ThumbUpOffAltIcon sx={{ width: "20px" }} />
          </Button>
          <Button sx={{ borderRadius: "50px" }}>
            <ThumbDownOffAltIcon sx={{ width: "20px" }} />
          </Button>
          <Button>답글</Button>
        </div>
      </Container>
    </Container>
  )
}
