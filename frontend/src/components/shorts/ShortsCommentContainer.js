import React, { useEffect, useState } from "react"
import { IconButton, Button, Typography, Container, Avatar, Box } from "@mui/material"
import Slider, { SliderThumb } from "@mui/material/Slider"
import TextField from "@mui/material/TextField"

import SortIcon from "@mui/icons-material/Sort"
import CloseIcon from "@mui/icons-material/Close"

import { CommonIconButton } from "components/common/CommonIconButton"

import { CustomIconMenu } from "components/common/CustomIconMenu"
import { UserFeedBackContainer } from "components/UserFeedBackContainer"
import { useRecoilValue } from "recoil"
import { accountState } from "atom/accountState"
import { CommentInput } from "components/Watch/CommentInput"
export const ShortsCommentContainer = (props) => {
  const user = useRecoilValue(accountState)
  const { video, comments, setOpenComment, openInput, setOpenInput, commentRefetch } = props
  const [comment, setComment] = useState(null)
  const [handleToggle, setHandleToggle] = useState(false)
  // const {}= comments ?? {}
  const [text, setText] = useState("")
  useEffect(() => {
    setComment(comments)
  }, [comments])

  console.log(comments)
  return (
    <div
      style={{
        scrollSnapAlign: "start",
        width: "400px",

        height: "700px",

        border: "1px solid #e0e0e0",
        borderRadius: "15px",
        objectFit: "cover",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "5px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <Typography variant="h6" fontWeight={"600"}>
              댓글
            </Typography>
            <Typography fontWeight={"600"} color={"gray"}>
              {comments?.length}
            </Typography>
            {console.log(comments?.length)}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <CustomIconMenu
              iconButton={<SortIcon />}
              menuItems={[
                {
                  text: "인기 댓글순",
                  onClick: () => {},
                },
                {
                  text: "최신순",
                  onClick: () => {},
                },
              ]}
            />
            <CommonIconButton
              onClick={() => setOpenComment(false)}
              background={"#00ff0000"}
              color={"gray"}
              icon={<CloseIcon />}
            />
          </div>
        </div>
        {/* 유저 피드팩 아이템 들어갈 자리 */}
        {comments.map((comment, key) => (
          <div key={key}>
            <UserFeedBackContainer
              comment={comment}
              // isParent={false}
              // commentsLoading={commentsLoading}
              // getComments={getComments}
              refetchComments={commentRefetch}
              setHandleToggle={setHandleToggle}
            />
          </div>
        ))}

        <div
          style={{
            position: "absolute",
            bottom: 0,
            maxWidth: "400px",
            display: "flex",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderTop: "1px solid #eee",
              width: "100%",
              padding: "10px 5px",
            }}
          >
            <CommentInput
              keyword={"댓글"}
              subId={video?.id}
              refetchComments={commentRefetch}
              videoOwner={video?.created_user?.id}
            />
            {/* <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={user?.picture} />
                  <TextField
                    id="standard-basic"
                    label="댓글 추가..."
                    variant="standard"
                    fullWidth
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value)
                    }}
                    onFocus={() => setOpenInput(true)}
                  />
                </div>

                {/* 댓글란 */}
            {/* {openInput && (
                  <div style={{ display: "flex", justifyContent: "right", margin: "3px 0px" }}>
                    <Button
                      onClick={() => {
                        setOpenInput(false)
                        setText("")
                      }}
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "20px",
                        maxHeight: "40px",
                        maxWidth: "70px",
                      }}
                    >
                      취소
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: "#eee",
                        borderRadius: "20px",
                        maxHeight: "40px",
                        maxWidth: "70px",
                      }}
                    >
                      댓글
                    </Button>
                  </div>
                )}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
