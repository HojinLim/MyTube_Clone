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
import { USER_INFO } from "Constants/value"
import { useMutation } from "@apollo/client"
import { UPDATE_LATER } from "apollo/mutation"
import { UPDATE_SUB } from "apollo/mutation"
import { useRecoilValue } from "recoil"
import { accountState } from "atom/accountState"

export const VideoInfoContainer = ({
  error: err,
  loading: load,
  currentVideos,
  getData,
  refetch,
}) => {
  const { id, title, subtitle, views, created_at, created, sub_users, later_users, like_user } =
    currentVideos
  // const user = JSON.parse(localStorage.getItem(USER_INFO)) ?? ""
  const user = useRecoilValue(accountState)

  const { profileImage, username } = !created ? {} : created

  const [thumbUp, setThumbup] = useState(null)
  const [thumbDown, setThumbDown] = useState(null)
  const [likeCount, setLikeCount] = useState()

  const [subed, setSubed] = useState()
  const [globalArr, setGlobalArr] = useState([])
  const [subscript, setSubscript] = useState(false)
  const [updateLater, { loading, error }] = useMutation(UPDATE_LATER)
  const [updateSub, { updateLoading, updateError }] = useMutation(UPDATE_SUB)

  let arr = []

  useEffect(() => {
    let glob = []
    sub_users?.map((data) => glob.push(data.id))
    setGlobalArr(glob)
    console.log("sub_users", sub_users)

    const isStored = sub_users?.find((data) => data?.id == user?.uid)
    console.log("store", isStored)
    setSubed(isStored.id ? true : false)
    console.log("sub", subed)
  }, [sub_users, refetch])

  useEffect(() => {
    if (!err && !load) {
      setLikeCount(like_user.length)

      if (arr.includes(user.uid)) {
        setSubed(true)
      } else {
        setSubed(false)
      }
    }
  }, [currentVideos, sub_users])

  if (later_users && later_users.length > 0 && later_users[0]?.id == user.uid) {
  }
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

  const handleUpdateSub = async () => {
    // 비동기 작업을 수행하고 업데이트한 후에 상태를 업데이트합니다.
    if (subed) {
      const newArr = arr.filter((idx) => idx !== user.uid)
      await updateSub({
        variables: { id: id, sub_users: newArr },
        onCompleted: () => {
          console.log("hello")
          getData()
        },
      })
    } else {
      arr.push(user.uid)
      await updateSub({
        variables: { id: id, sub_users: arr },
      }).then(() => {
        console.log("hello")
        getData()
      })
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
                onClick={handleUpdateSub}
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
                {!subed && <NotificationsNoneOutlinedIcon />}
                {subed ? "구독중" : "구독"}
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
