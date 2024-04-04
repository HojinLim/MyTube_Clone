import React, { useEffect } from "react"
import { Container, Typography, Avatar, Button, Box } from "@mui/material"
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined"
import IconButton from "@mui/material/IconButton"
import { useState } from "react"
import Divider from "@mui/material/Divider"

// Icons
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined"
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt"
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import ShareIcon from "@mui/icons-material/Share"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"

import Stack from "@mui/material/Stack"
import { timeForBetween } from "functions/timeForBetween"
import { CustomIconMenu } from "components/common/CustomIconMenu"

export const VideoInfoContainer = ({ currentVideos }) => {
  const { title, subtitle, views, created_at, users_permissions_users } = currentVideos

  const user =
    users_permissions_users && users_permissions_users.length > 0 ? users_permissions_users[0] : {}
  const { id, profileImage, username } = user
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

        <div style={{ display: "flex", marginBottom: "15px" }}>
          <Avatar alt="Remy Sharp" src={profileImage} />
          <div style={{ display: "flex", flexDirection: "column", margin: "0px 12px" }}>
            <Typography variant="body2" gutterBottom color={"gray"}>
              {subtitle}
            </Typography>
            <Typography variant="body2" gutterBottom color={"gray"}>
              구독자 100만명
            </Typography>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div style={{ display: "flex" }}>
              <Button
                onClick={() => setSubscript((prev) => !prev)}
                variant="contained"
                sx={
                  subscript
                    ? {
                        backgroundColor: "black",
                        borderRadius: "20px",
                        maxHeight: "40px",
                        maxWidth: "150px",
                        color: "white",
                      }
                    : {
                        backgroundColor: "lightgray",
                        borderRadius: "20px",
                        maxHeight: "40px",
                        maxWidth: "150px",
                        // color: "white",
                      }
                }
              >
                {subscript && <NotificationsNoneOutlinedIcon />}
                {subscript ? "구독" : "구독중"}
              </Button>
            </div>
            <div
              style={{
                display: "flex",

                alignItems: "center",
                // width: "100%",
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                borderRadius={"20px"}
                padding={"0px 15px"}
                backgroundColor={"lightgray"}
                className="hover"
                height={"40px"}
                alignItems={"center"}
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
              <IconButton
                size="small"
                style={{
                  backgroundColor: "lightgray",
                  borderRadius: "100px",
                  height: "40px",
                  width: "40px",
                  margin: "0px 5px",
                  color: "black",
                }}
              >
                <ShareIcon />
              </IconButton>
              <CustomIconMenu
                style={{ backgroundColor: "lightgray", borderRadius: "20px" }}
                iconButton={<MoreHorizIcon />}
                menuItems={[{ icon: <PlaylistAddIcon />, text: "저장", onclick: () => {} }]}
              />
            </div>
          </div>
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
            {`조회수 ${views}회 ${timeForBetween(created_at)}`}
          </Typography>
          <Typography variant="caption" gutterBottom>
            {currentVideos?.description}
          </Typography>
        </Box>
      </Container>
    </Container>
  )
}
