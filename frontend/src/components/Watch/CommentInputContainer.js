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
import IconButton from "@mui/material/IconButton"
import { stringToSeconds } from "functions/stringToSeconds"
//Icons

import MoodIcon from "@mui/icons-material/Mood"
import SortIcon from "@mui/icons-material/Sort"

import TextField from "@mui/material/TextField"

export const CommentInputContainer = () => {
  return (
    // 영상 댓글 컨테이너
    <Container>
      <div className="comments-container">
        <div style={{ display: "flex", justifyItems: "center" }}>
          <Typography variant="h6" fontWeight={"700"}>
            댓글 00개
          </Typography>

          <IconButton style={{ color: "black" }}>
            <SortIcon />
          </IconButton>
          <Typography>정렬 기준</Typography>
        </div>
        <div style={{ display: "flex" }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <TextField id="standard-basic" label="댓글 추가..." variant="standard" fullWidth />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "15px",
              }}
            >
              <IconButton style={{ color: "black" }}>
                <MoodIcon />
              </IconButton>
              <div style={{ display: "flex" }}>
                <Button
                  sx={{
                    borderRadius: "20px",
                    maxHeight: "40px",
                  }}
                >
                  취소
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "20px",
                    maxHeight: "40px",
                    backgroundColor: "#eee",
                  }}
                >
                  댓글
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
