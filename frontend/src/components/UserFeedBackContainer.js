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
import ReactPlayer from "react-player/lazy"
import { timeForToday } from "functions/timeForToday"
import { CustomIconMenu } from "./common/CustomIconMenu"
// import { EditOutlinedIcon } from "Constants/value"
{
  /* eslint-disable react/prop-types  */
}
export const UserFeedBackContainer = ({ comment }) => {
  const { username, contents, profileImage, created_at } = comment
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
          <div>
            <CustomIconMenu
              iconButton={<MoreVertIcon />}
              menuItems={[
                { icon: <EditOutlinedIcon />, text: "수정", onclick: () => {} },
                { icon: <DeleteOutlineOutlinedIcon />, text: "삭제", onclick: () => {} },
              ]}
            />
          </div>
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
          <Button>답글</Button>
        </div>
      </Container>
    </Container>
  )
}
