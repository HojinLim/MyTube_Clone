import React, { useEffect, useMemo, useRef, useState } from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import ReactPlayer from "react-player/lazy"
import Typography from "@mui/material/Typography"
import { useNavigate } from "react-router-dom"
import Avatar from "@mui/material/Avatar"
import { formatTime } from "functions/formatTime"
import { stringToSeconds } from "functions/stringToSeconds"
import { secondsToTime } from "functions/secondsToTime"
import { timeForBetween } from "functions/timeForBetween"
import { CustomIconMenu } from "components/common/CustomIconMenu"
import Alert from "@mui/material/Alert"

// Icons
import CheckIcon from "@mui/icons-material/Check"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay"
import ReplyIcon from "@mui/icons-material/Reply"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import AccessTimeIcon from "@mui/icons-material/AccessTime"

import { USER_INFO } from "Constants/value"
import { useLazyQuery, useMutation } from "@apollo/client"
import { CREATE_LATER } from "apollo/mutation"

import { UPDATE_LATER } from "apollo/mutation"
import { AlertContainer } from "components/common/AlertContainer"
import { useRecoilValue } from "recoil"
import { accountState } from "atom/accountState"
import DoDisturbIcon from "@mui/icons-material/DoDisturb"
export const VideoContainer = ({ data, refetch, loading }) => {
  const {
    // thumb,
    title,
    subtitle,
    sources,
    duration,
    id,
    user: userInfo,
    createdBy,
    description,
    isPublic,
    created_at,
    thumbnail: thumb,
    contents,
    sub_users,
    later_users,
  } = data

  console.log(data)
  const user = useRecoilValue(accountState)
  const [hover, setHover] = useState(false)
  const navigate = useNavigate()

  const [playTime, setPlayTime] = useState(0)
  const [playedTime, setPlayedTime] = useState("0:00")
  const [startVideo, setStartVideo] = useState(false)

  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [later, setLater] = useState(null)
  const [globalArr, setGlobalArr] = useState([])
  useMemo(() => {
    setPlayedTime(secondsToTime(Math.trunc(playTime)))
  }, [playTime])

  const mouseHoverOver = () => {
    setHover(true)
    setStartVideo(true)
  }
  const mouseHoverOut = () => {
    setHover(false)
    setPlayTime(0)
    setStartVideo(false)
  }
  const moveDetailPage = () => {
    navigate(`/watch/${id}`)
  }

  // 나중에 볼 영상 array 적용
  useEffect(() => {
    let glob = []
    later_users?.map((data) => glob.push(data.id))
    setGlobalArr(glob)
    const isStored = later_users?.find((data) => data?.id == user?.uid)
    setLater(isStored ? true : false)
    console.log("later", later)
  }, [later_users, refetch])

  console.log(globalArr)
  console.log(later)
  const updateLaterVideo = () => {
    let arr = [...globalArr, user?.uid] // Add user's ID to the array
    console.log(arr)
    updateLater({
      variables: { id: id, later_users: arr },
      onCompleted: () => {
        setSuccessMessage("재생목록 추가 완료!")
        setErrorMessage(null)
        refetch()
      },
      onError: (error) => {
        setSuccessMessage(null)
        setErrorMessage(error.message)
      },
    })
  }

  const removeUpdateVideo = () => {
    let arr = globalArr.filter((value) => value !== user?.uid) // Remove user's ID from the array
    console.log(arr)
    updateLater({
      variables: { id: id, later_users: arr },
      onCompleted: () => {
        setSuccessMessage(null)
        setErrorMessage("재생목록 삭제 완료")
        refetch()
      },
      onError: (error) => {
        console.error(error)
      },
    })
  }
  console.log("global", globalArr)

  // const user = JSON.parse(localStorage.getItem(USER_INFO)) ?? ""

  const [updateLater] = useMutation(UPDATE_LATER)

  useEffect(() => {
    // getLaterByUid({ variables: user.uid }).then((result) => result.data)
  }, [])

  const addLaterVideoHandler = () => {
    if (later) {
      removeUpdateVideo()
    } else {
      updateLaterVideo()
    }
  }
  return (
    <Container
      sx={{
        flexGrow: 1,
        flexDirection: "column",
        display: "flex",
        gap: "15px",
        justifyContent: "center",
        alignContent: "center",
        maxWidth: "500px",
        width: "500px",
        width: { xl: "380px" },
        margin: "auto",
        padding: "auto",
      }}
    >
      {successMessage && (
        <AlertContainer type="success" message={successMessage} onClose={() => {}} />
      )}
      {errorMessage && <AlertContainer type="error" message={errorMessage} onClose={() => {}} />}
      <Box
        sx={{
          position: "relative",
          flexGrow: 1,
          width: "100%",
          maxWidth: "450px",
          // height: "250px",
          height: { xs: "250px", sm: "250px", md: "250px", lg: "250px", xl: "220px" },
          borderRadius: "20px",
        }}
      >
        {/* 썸네일 또는 영상 */}
        <div
          className="video-container"
          style={{ width: "100%", height: "100%", borderRadius: "20px" }}
          onMouseOver={mouseHoverOver}
          onMouseOut={mouseHoverOut}
          onClick={moveDetailPage}
        >
          {hover ? (
            <ReactPlayer
              url={process.env.REACT_APP_BACKEND_URL_UPLOAD + contents.url}
              width="100%"
              height="100%"
              playing={startVideo}
              autoPlay={true}
              style={{ borderRadius: "20px" }}
              onProgress={(progress) => {
                setPlayTime(progress.playedSeconds)
              }}
            />
          ) : (
            <img
              src={process.env.REACT_APP_BACKEND_URL_UPLOAD + thumb.url}
              alt="Video Thumbnail"
              style={{ width: "100%", height: "100%", borderRadius: "20px" }}
            />
          )}
        </div>
        {/* 영상 길이 */}
        <Typography
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            color: "white",
            backgroundColor: "black",
            padding: "1px",
            margin: "10px",
            borderRadius: "2px",
          }}
          variant="body2"
          gutterBottom
        >
          {hover ? `${playedTime} / ${duration}` : `${duration ?? "00:00"}`}
        </Typography>
      </Box>

      {/* 프로필, 제목, 조회수 */}
      <Container
        sx={{
          flexGrow: 1,
          flexDirection: "row",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {/* <Avatar alt="Remy Sharp" src={profileImage} /> */}
        <Container
          sx={{
            flexGrow: 1,
            flexDirection: "column",
            display: "flex",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography
              variant="h6"
              gutterBottom
              style={{
                overflow: "auto",
                maxHeight: "1.5em",
              }}
            >
              {title}
            </Typography>

            <CustomIconMenu
              iconButton={<MoreVertIcon />}
              menuItems={[
                { icon: <PlaylistPlayIcon />, text: "현재 재생목록에 추가", onClick: () => {} },
                {
                  icon: later ? <DoDisturbIcon /> : <AccessTimeIcon />,
                  text: later ? "나중에 볼 동영상에서 해제" : "나중에 볼 동영상에 저장",
                  onClick: addLaterVideoHandler,
                },
                { icon: <PlaylistAddIcon />, text: "재생목록에 저장", onClick: () => {} },
                { icon: <ReplyIcon />, text: "공유", onClick: () => {} },
              ]}
            />
          </div>
          <Typography variant="body2" gutterBottom color={"gray"}>
            {createdBy}
          </Typography>
          <Typography variant="body2" gutterBottom color={"gray"}>
            조회수 100회 ⦁ {timeForBetween(created_at)}
          </Typography>
        </Container>
      </Container>
    </Container>
  )
}
