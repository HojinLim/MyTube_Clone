import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
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
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"

import Stack from "@mui/material/Stack"
import { timeForBetween } from "functions/timeForBetween"
import { CustomIconMenu } from "components/common/CustomIconMenu"
import { useMutation } from "@apollo/client"

import { useRecoilValue } from "recoil"
import { accountState } from "atom/accountState"
import useUpdateLater from "hooks/useUpdateLater"
import useHandleLike from "hooks/useHandleLike"
import { INCREMENT_VIEWS } from "apollo/mutation"

import { useHandleSub } from "hooks/useHandleSub"
import { GET_IN_SITE } from "Constants/value"

export const VideoInfoContainer = ({ error: err, loading: load, currentVideos, getData }) => {
  const {
    id,
    title,
    views,
    created_at,
    created_user,
    createdBy,
    later_users,
    like_users,
    dislike_users,
  } = currentVideos
  const user = useRecoilValue(accountState)

  const navigate = useNavigate()
  const { isAdded, addLaterVideoHandler } = useUpdateLater({
    later_users: later_users,
    refetch: getData,
    user: user,
    id: id,
  })

  const { isLikeAdded, isDisLikeAdded, clickLike, clickDislike } = useHandleLike({
    type: "video",
    like_users,
    dislike_users,
    refetch: getData,
    user: user,
    id,
  })

  const { subArr, subed, changeSubHandler, isYours, data } = useHandleSub({
    owner_id: created_user?.id,
    my_id: user?.uid,
  })

  const [viewCount, setViewCount] = useState(0)
  const [increaseView] = useMutation(INCREMENT_VIEWS)

  useEffect(() => {
    if (!load && views !== null) {
      setViewCount(views)
    }
  }, [views, load])
  useEffect(() => {
    if (!load && !views && id) increaseView({ variables: { id: id, views: 0 } })
    if (!load && views !== null && id && localStorage.getItem(GET_IN_SITE) == "false") {
      increaseView({
        variables: { id: id, views: views + 1 },
        onCompleted: () => {
          localStorage.setItem(GET_IN_SITE, "true")
        },
      })

      setViewCount((prevViews) => prevViews + 1)
    }
  }, [id, views, load, increaseView])

  const thumbUpHandler = () => {
    clickLike()
  }
  const thumbDownHandler = () => {
    clickDislike()
  }
  const moveCreaterPage = () => {
    navigate(`/@${createdBy}`)
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
          <IconButton sx={{ padding: 0 }} onClick={moveCreaterPage}>
            <Avatar alt="Remy Sharp" src={created_user?.profileImage} />
          </IconButton>
          <div style={{ display: "flex", flexDirection: "column", margin: "0px 12px" }}>
            <div className="clickable" onClick={moveCreaterPage}>
              <Typography variant="body1">{createdBy}</Typography>
            </div>
            <Typography style={{ minWidth: "70px" }} variant="body2" gutterBottom color={"gray"}>
              구독자 {subArr?.length}명
            </Typography>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div style={{ display: "flex" }}>
              <Button
                disabled={isYours ? true : false}
                onClick={changeSubHandler}
                variant="contained"
                sx={
                  subed
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
                      }
                }
              >
                {!isYours && !subed ? <NotificationsNoneOutlinedIcon /> : null}
                {isYours && "당신의 영상입니다"}
                {!isYours && subed && "구독중"}
                {!isYours && !subed && "구독"}
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
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
                  {like_users?.length}
                  {isLikeAdded ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />}
                </div>
                <Divider orientation="vertical" />
                <div onClick={thumbDownHandler}>
                  {isDisLikeAdded ? <ThumbDownRoundedIcon /> : <ThumbDownOffAltIcon />}
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
                menuItems={[
                  {
                    icon: isAdded ? <RemoveCircleOutlineIcon /> : <PlaylistAddIcon />,
                    text: isAdded ? "나중에 보기 삭제" : "나중에 보기 추가",
                    onClick: addLaterVideoHandler,
                  },
                ]}
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
            {`조회수 ${viewCount}회 ${timeForBetween(created_at)}`}
          </Typography>
          <Typography variant="caption" gutterBottom>
            {currentVideos?.description}
          </Typography>
        </Box>
      </Container>
    </Container>
  )
}
