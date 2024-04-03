import React, { useEffect, useRef, useState } from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { IconButton, Button } from "@mui/material"

import Typography from "@mui/material/Typography"

// Icons
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"

import Avatar from "@mui/material/Avatar"
import { timeForToday } from "functions/timeForToday"
import { CustomIconMenu } from "./common/CustomIconMenu"
import { DELETE_COMMENT } from "apollo/mutation"
import { useMutation } from "@apollo/client"
import { USER_INFO } from "Constants/value"
import { CommentInput } from "./Watch/CommentInput"
// import { EditOutlinedIcon } from "Constants/value"
{
  /* eslint-disable react/prop-types  */
}
export const UserFeedBackContainer = ({ comment }) => {
  const { id, username, contents, profileImage, created_at } = comment
  const user = JSON.parse(localStorage.getItem(USER_INFO))

  const [deleteComment, { loading: deleteLoading, error: deleteError, data: deleteData }] =
    useMutation(DELETE_COMMENT)
  const deleteCommentHandler = async () => {
    try {
      const res = await deleteComment({ variables: { id: id } })
      console.log(res)
      location.href = location.href
      // 성공적으로 삭제되었을 때 처리
    } catch (error) {
      console.error(error)
      // 에러 처리
    }
  }
  return (
    <Container
      sx={{
        flexGrow: 1,
        flexDirection: "row",
        display: "flex",
        marginY: "15px",
      }}
      className="user-comments-container"
    >
      <Avatar alt="Remy Sharp" src={profileImage} />
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
          <div>
            <div
              style={{
                display: "flex",
              }}
            >
              <Typography variant="body2" sx={{ marginRight: "5px" }}>
                {`@${username}`}
              </Typography>
              {/* 댓글 시간 */}
              <Typography variant="body2" gutterBottom color={"gray"}>
                {timeForToday(created_at)}
              </Typography>
            </div>
            {/* eslint-disable react/prop-types  */}
            <Typography variant="h6" gutterBottom>
              {contents}
            </Typography>
          </div>
          {user.name == username && (
            <div>
              <CustomIconMenu
                iconButton={<MoreVertIcon />}
                menuItems={[
                  { icon: <EditOutlinedIcon />, text: "수정", onClick: () => {} },
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
          <Button onClick={() => {}}>답글</Button>
        </div>
        {/* <CommentInput /> */}
      </Container>
    </Container>
  )
}
