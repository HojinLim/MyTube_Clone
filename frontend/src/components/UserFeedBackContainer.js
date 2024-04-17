import React, { useEffect, useRef, useState } from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { IconButton, Button } from "@mui/material"

import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"

// Icons
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"

import Avatar from "@mui/material/Avatar"
import { timeForToday } from "functions/timeForToday"
import { CustomIconMenu } from "./common/CustomIconMenu"
import { DELETE_COMMENT } from "apollo/mutation"
import { useMutation } from "@apollo/client"
import { USER_INFO } from "Constants/value"
import { UPDATE_COMMENT } from "apollo/mutation"
import { useNavigate } from "react-router-dom"
import { CommentInput } from "./Watch/CommentInput"
import useHandleLike from "hooks/useHandleLike"

export const UserFeedBackContainer = ({
  commentsLoading,
  comment,
  refetchComments,
  isParent,
  handleToggle,
  setHandleToggle,
  getComments,
}) => {
  const [isEdit, setIsEdit] = useState(false)

  const { id, subId, created_user, contents, created_at, like_users, dislike_users } = comment
  const { username, profileImage } = created_user ?? {}
  // console.log(created_user)
  const navi = useNavigate()
  const user = JSON.parse(localStorage.getItem(USER_INFO))
  const [text, setText] = useState(contents ?? "")
  const [deleteComment] = useMutation(DELETE_COMMENT)
  const [updateComment] = useMutation(UPDATE_COMMENT)
  const [openInput, setOpenInput] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  // if (refetchComments()) {
  //   console.log("dd")
  // }
  // const { isLikeAdded, isDisLikeAdded, clickLike, clickDislike } = useHandleLike({
  //   type: "comment",
  //   like_users,
  //   dislike_users,
  //   refetch: getComments,
  //   user: user,
  //   id,
  // })
  console.log(comment)
  const deleteCommentHandler = async () => {
    try {
      const res = await deleteComment({ variables: { id: id } })

      refetchComments()
      // 성공적으로 삭제되었을 때 처리
    } catch (error) {
      console.error(error)
      // 에러 처리
    }
  }
  useEffect(() => {
    setText(contents)
  }, [refetchComments, contents, comment])
  const movePage = () => {
    navi(`/@${username}`)
  }

  return (
    <Container
      sx={
        isParent
          ? {
              flexGrow: 1,
              flexDirection: "row",
              display: "flex",
              marginY: "15px",
            }
          : {
              flexGrow: 1,
              flexDirection: "row",
              display: "flex",
              marginY: "15px",
              marginLeft: "50px",
            }
      }
      className="user-comments-container"
    >
      <Avatar className="clickable" alt="Remy Sharp" src={profileImage} onClick={movePage} />
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
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
              }}
            >
              <Typography
                className="clickable"
                variant="body2"
                sx={{ marginRight: "5px" }}
                onClick={movePage}
              >
                {`@${username}`}
              </Typography>
              {/* 댓글 시간 */}
              <Typography variant="body2" gutterBottom color={"gray"}>
                {timeForToday(created_at)}
              </Typography>
            </div>
            {/* eslint-disable react/prop-types  */}
            {isEdit ? (
              <TextField
                value={text}
                onChange={(e) => {
                  if (!commentsLoading) setText(e.target.value)
                }}
                id="standard-basic"
                label="댓글 추가..."
                variant="standard"
                fullWidth
              />
            ) : (
              <Typography variant="h6" gutterBottom>
                {contents}
              </Typography>
            )}
          </div>
          {user.name == username && (
            <div>
              <CustomIconMenu
                iconButton={user.name == username && <MoreVertIcon />}
                menuItems={[
                  {
                    icon: <EditOutlinedIcon />,
                    text: "수정",
                    onClick: () => {
                      setIsEdit((prev) => !prev)
                    },
                  },
                  {
                    icon: <DeleteOutlineOutlinedIcon />,
                    text: "삭제",
                    onClick: () => confirm("real 삭제?") && deleteCommentHandler(),
                  },
                ]}
              />
            </div>
          )}
        </div>

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
          <Button
            onClick={() => {
              if (isEdit) {
                updateComment({
                  variables: { id: id, contents: text },
                  onCompleted: () => {
                    setIsEdit(false)
                    refetchComments()
                  },
                })
              } else {
                setOpenInput((prev) => !prev)
              }
            }}
          >
            {isEdit ? "수정" : "답글"}
          </Button>
        </div>
        {/* 답글 위치 */}
        {openInput && (
          <CommentInput
            keyword={"답글"}
            parentData={comment}
            parentId={id}
            subId={subId}
            refetchComments={refetchComments}
            setOpenInput={setOpenInput}
          />
        )}
        {comment?.replies?.length > 0 && isParent && (
          <Button
            onClick={() => {
              setHandleToggle(!handleToggle)
            }}
            style={{
              width: "10vw",
              height: "100%",

              borderRadius: "20px",
              maxHeight: "40px",
              margin: "10px 0px",
              color: "#065fd4",

              fontWeight: 700,
            }}
          >
            {handleToggle ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}

            {` 답글 ${comment?.replies?.length}개`}
          </Button>
        )}
      </Container>
    </Container>
  )
}
