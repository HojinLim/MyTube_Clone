import React, { useEffect, useRef, useState } from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { IconButton, Button } from "@mui/material"

import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"

// Icons
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"

import MoreVertIcon from "@mui/icons-material/MoreVert"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined"
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt"
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded"
import Avatar from "@mui/material/Avatar"
import { timeForToday } from "functions/timeForToday"
import { CustomIconMenu } from "./common/CustomIconMenu"
import { DELETE_COMMENT } from "apollo/mutation"
import { useMutation } from "@apollo/client"

import { UPDATE_COMMENT } from "apollo/mutation"
import { useNavigate } from "react-router-dom"
import { CommentInput } from "./Watch/CommentInput"
import useHandleLike from "hooks/useHandleLike"

import { COLOR_BLUE_700 } from "config/constants"
import { useRecoilValue } from "recoil"
import { accountState } from "atom/accountState"

export const UserFeedBackContainer = ({
  comment,
  commentsLoading,
  refetchComments,
  fixIsParent,
  handleToggle,
  setHandleToggle,
  identify,
}) => {
  const { id, subId, created_user, contents, created_at, like_users, dislike_users, isParent } =
    comment ?? {}
  const { username, profileImage } = created_user ?? {}
  console.log(created_user)
  const navi = useNavigate()
  const [isEdit, setIsEdit] = useState(false)
  const user = useRecoilValue(accountState)
  const [text, setText] = useState(contents ?? "")
  const [deleteComment] = useMutation(DELETE_COMMENT)
  const [updateComment] = useMutation(UPDATE_COMMENT)
  const [openInput, setOpenInput] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [owner, setOwner] = useState(false)

  const { isLikeAdded, isDisLikeAdded, clickLike, clickDislike } = useHandleLike({
    type: "comment",
    like_users,
    dislike_users,
    refetch: refetchComments,
    user: user,
    id: id,
  })

  useEffect(() => {
    if (user.name == username) setOwner(true)
  }, [user, username])

  console.log(isLikeAdded)
  if (!parent) console.log(like_users)

  console.log(comment)
  // console.log(created_user)
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
  }, [])
  const movePage = () => {
    navi(`/@${username}`)
  }
  const thumbUpHandler = () => {
    clickLike()
  }
  const thumbDownHandler = () => {
    clickDislike()
  }
  const handleToggleHandler = () => {
    setHandleToggle((prev) => {
      if (prev.includes(identify)) {
        return prev.filter((value) => value !== identify)
      } else {
        return [...prev, identify] // 새로운 배열을 반환하여 이전 상태를 수정하지 않습니다.
      }
    })
  }

  return (
    <Container
      sx={
        fixIsParent ?? isParent
          ? {
              flexDirection: "row",
              display: "flex",
              marginY: "15px",
            }
          : {
              // flexGrow: 2,
              flexDirection: "row",
              display: "flex",
              marginY: "15px",
              paddingLeft: "5em",
            }
      }
    >
      <Avatar
        className="clickable"
        alt="Remy Sharp"
        src={profileImage}
        onClick={movePage}
        sx={!fixIsParent ?? !isParent ? { width: 28, height: 28 } : {}}
      />
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
                alignItems: "center",
                placeItems: "center",
              }}
            >
              <div
                style={
                  owner ? { borderRadius: "15px", backgroundColor: "#888888", padding: "2px" } : {}
                }
              >
                <Typography
                  className="clickable"
                  variant={fixIsParent ?? isParent ? "body1" : "body2"}
                  sx={!owner ? {} : { color: "white" }}
                  onClick={movePage}
                >
                  {`@${username}`}
                </Typography>
              </div>
              {/* 댓글 시간 */}
              <Typography
                style={{
                  marginLeft: "10px",
                  paddingTop: "5px",
                }}
                variant={fixIsParent ?? isParent ? "body1" : "body2"}
                gutterBottom
                color={"gray"}
              >
                {timeForToday(created_at)}
              </Typography>
            </div>
            {isEdit ? (
              <TextField
                value={text}
                onChange={(e) => {
                  setText(e.target.value)
                }}
                id="standard-basic"
                label="댓글 추가..."
                variant="standard"
                fullWidth
              />
            ) : (
              <Typography variant={fixIsParent ? "h6" : "h7"} gutterBottom>
                {/* <Typography variant={fixIsParent ?? isParent ? "h6" : "h7"} gutterBottom> */}
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
          <Button
            onClick={thumbUpHandler}
            style={{
              borderRadius: "20px",
              gap: "2px",
            }}
          >
            {like_users?.length}
            {isLikeAdded ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />}
          </Button>
          <Button onClick={thumbDownHandler} sx={{ borderRadius: "20px" }}>
            {isDisLikeAdded ? <ThumbDownRoundedIcon /> : <ThumbDownOffAltIcon />}
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
        {/* {comment?.replies?.length > 0 && (fixIsParent ?? isParent) && ( */}
        {/* //{" "} */}
        {comment?.replies?.length > 0 && fixIsParent && (
          // 더보기 버튼 토글
          <Button
            onClick={handleToggleHandler}
            style={{
              width: "100%",
              height: "100%",
              maxWidth: "100px",
              borderRadius: "20px",
              maxHeight: "40px",
              margin: "10px 0px",
              color: COLOR_BLUE_700,
              fontWeight: 700,
            }}
          >
            {handleToggle?.includes(identify) ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}

            {` 답글 ${comment?.replies?.length}개`}
          </Button>
        )}
      </Container>
    </Container>
  )
}
