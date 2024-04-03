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
import { useMutation } from "@apollo/client"
import { CREATE_COMMENT } from "apollo/mutation"
import { USER_INFO } from "Constants/value"
import { CommentInput } from "./CommentInput"

export const CommentInputContainer = ({ subId, numOfComments }) => {
  const [text, setText] = useState()
  const [createComment, { data, error, loading }] = useMutation(CREATE_COMMENT)

  // 유저 정보 가져오기

  const user = JSON.parse(localStorage.getItem(USER_INFO))

  return (
    // 영상 댓글 컨테이너
    <Container>
      <div className="comments-container">
        <div style={{ display: "flex", justifyItems: "center" }}>
          <Typography variant="h6" fontWeight={"700"}>
            댓글 {numOfComments}개
          </Typography>

          <IconButton style={{ color: "black" }}>
            <SortIcon />
          </IconButton>
          <Typography>정렬 기준</Typography>
        </div>

        <CommentInput />
      </div>
    </Container>
  )
}
