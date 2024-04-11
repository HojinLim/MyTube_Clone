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
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"

import Stack from "@mui/material/Stack"
import { timeForBetween } from "functions/timeForBetween"
import { CustomIconMenu } from "components/common/CustomIconMenu"
import { USER_INFO } from "Constants/value"
import { useLazyQuery, useMutation } from "@apollo/client"
import { UPDATE_LATER } from "apollo/mutation"
import { UPDATE_SUB } from "apollo/mutation"
import { useRecoilValue } from "recoil"
import { accountState } from "atom/accountState"
import useUpdateLater from "hooks/useUpdateLater"
import useHandleLike from "hooks/useHandleLike"
import { INCREMENT_VIEWS } from "apollo/mutation"
import { FIND_USER_ID_BY_ID } from "apollo/query"

export const VideoInfoContainer = ({ error: err, loading: load, currentVideos, getData }) => {
  const {
    id,
    title,
    subtitle,
    views,
    created_at,
    created_user,
    sub_users,
    later_users,
    like_user,
    dislike_user,
  } = currentVideos
  const user = useRecoilValue(accountState)

  const [thumbUp, setThumbup] = useState(null)
  const [thumbDown, setThumbDown] = useState(null)
  const [likeCount, setLikeCount] = useState()

  const [subed, setSubed] = useState()
  const [globalArr, setGlobalArr] = useState([])
  const [subscript, setSubscript] = useState(false)
  const [updateLater, { loading, error }] = useMutation(UPDATE_LATER)
  const [updateSub, { updateLoading, updateError }] = useMutation(UPDATE_SUB)

  const [isYours, setYours] = useState()

  const { isAdded, addLaterVideoHandler } = useUpdateLater({
    later_users: later_users,
    refetch: getData,
    user: user,
    id: id,
  })

  const { isLikeAdded, isDisLikeAdded, clickLike, clickDislike } = useHandleLike({
    like_users: like_user,
    dislike_users: dislike_user,
    refetch: getData,
    user: user,
    id,
  })

  let arr = []
  const [viewCount, setViewCount] = useState(0)
  const [increaseView] = useMutation(INCREMENT_VIEWS)

  const [getUserById, { data, loaded, called }] = useLazyQuery(FIND_USER_ID_BY_ID)

  useEffect(() => {
    if (!loaded && !called) {
      getUserById({
        variables: { id: "26" },
        onCompleted: () => {
          console.log(data)
        },
      })
    }
  }, [id, getUserById, called, data])

  useEffect(() => {
    if (!load && views !== null) {
      setViewCount(views)
    }
  }, [views, load])
  useEffect(() => {
    if (!load && !views && id) increaseView({ variables: { id: id, views: 0 } })
    if (!load && views !== null && id) {
      increaseView({ variables: { id: id, views: views + 1 } })
      setViewCount((prevViews) => prevViews + 1)
    }
  }, [id, views, load, increaseView])

  useEffect(() => {
    let glob = []
    sub_users?.map((data) => glob.push(data?.id))
    setGlobalArr(glob)

    const isStored = sub_users?.find((data) => data?.id == user?.uid)

    setSubed(isStored?.id ? true : false)
    console.log("isStored", isStored)
    console.log("sub_users", sub_users)
  }, [sub_users, getData, id])

  useEffect(() => {
    if (!load) {
      created_user?.id == user.uid ? setYours(true) : setYours(false)
    }
  }, [load, currentVideos])

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

  const thumbUpHandler = () => {
    clickLike()
  }
  const thumbDownHandler = () => {
    clickDislike()
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
          <Avatar alt="Remy Sharp" src={created_user?.profileImage} />
          <div style={{ display: "flex", flexDirection: "column", margin: "0px 12px" }}>
            <Typography variant="body2" gutterBottom color={"gray"}>
              {subtitle}
            </Typography>
            <Typography style={{ minWidth: "70px" }} variant="body2" gutterBottom color={"gray"}>
              구독자 {sub_users?.length}명
            </Typography>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div style={{ display: "flex" }}>
              <Button
                disabled={isYours ? true : false}
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
