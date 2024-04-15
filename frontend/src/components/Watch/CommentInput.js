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
import EmojiPicker from "emoji-picker-react"
//Icons

import MoodIcon from "@mui/icons-material/Mood"
import SortIcon from "@mui/icons-material/Sort"

import TextField from "@mui/material/TextField"
import { useMutation } from "@apollo/client"
import { CREATE_COMMENT } from "apollo/mutation"
import { USER_INFO } from "Constants/value"
export const CommentInput = ({ subId, refetchComments }) => {
  const [visibleText, setVisibleText] = useState("")
  const [realText, setRealText] = useState("")
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
  const toggleEmojiPicker = () => {
    // WARNING: 일단 막아둠..
    return
    setIsEmojiPickerOpen((prev) => !prev) // 이전 상태의 반대 값을 설정하여 토글
  }

  const [createComment, { data, error, loading }] = useMutation(CREATE_COMMENT)

  // 유저 정보 가져오기

  const user = JSON.parse(localStorage.getItem(USER_INFO))

  const onCancelSubmit = () => {
    setVisibleText("")
  }
  console.log(visibleText)
  const onSubmitComment = () => {
    console.log("submit")
    createComment({
      variables: {
        subId: subId,
        username: user.name,
        contents: visibleText,
        profileImage: user.picture,
      },
      onCompleted: () => {
        // console.log(res)
        alert("댓글 작성 완료!")

        refetchComments()
        setVisibleText("")
      },
    })
  }

  return (
    <div style={{ display: "flex" }}>
      <Avatar alt="Remy Sharp" src={user.picture} style={{ marginRight: "10px" }} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <TextField
          value={visibleText}
          onChange={(e) => {
            setVisibleText(e.target.value)
          }}
          id="standard-basic"
          label="댓글 추가..."
          variant="standard"
          fullWidth
          onFocus={() => setIsEmojiPickerOpen(false)}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "18px",
          }}
        >
          <div style={{ position: "relative" }}>
            <IconButton style={{ color: "black" }} onClick={toggleEmojiPicker}>
              <MoodIcon />
            </IconButton>
            {isEmojiPickerOpen && (
              <div style={{ position: "absolute", top: "100%", zIndex: 10 }}>
                <EmojiPicker
                  open={true}
                  previewConfig={{ defaultCaption: true }}
                  height={300}
                  onEmojiClick={(emoji, e) => {
                    console.log(typeof emoji.unified)
                    console.log(emoji.unified)
                    // setVisibleText((prev) => prev + emoji.emoji)
                    // setRealText((prev) => prev + emoji.unified)
                  }}
                />
              </div>
            )}
          </div>
          <div style={{ display: "flex" }}>
            <Button
              onClick={onCancelSubmit}
              sx={{
                borderRadius: "20px",
                maxHeight: "40px",
              }}
            >
              취소
            </Button>
            <Button
              onClick={onSubmitComment}
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
  )
}
