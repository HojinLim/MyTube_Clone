import React, { useMemo, useState } from "react"
import { Container, Typography, Box, Avatar } from "@mui/material"
import ReactPlayer from "react-player/lazy"
import { useNavigate } from "react-router-dom"
import { CustomIconMenu } from "components/common/CustomIconMenu"
import useUpdateLater from "hooks/useUpdateLater"

import { secondsToTime } from "functions/secondsToTime"
import { timeForBetween } from "functions/timeForBetween"

// Icons
import CheckIcon from "@mui/icons-material/Check"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay"
import ReplyIcon from "@mui/icons-material/Reply"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import AccessTimeIcon from "@mui/icons-material/AccessTime"

import { useLazyQuery, useMutation } from "@apollo/client"
import { CREATE_LATER } from "apollo/mutation"

import { useRecoilValue } from "recoil"
import { accountState } from "atom/accountState"
import DoDisturbIcon from "@mui/icons-material/DoDisturb"
import { stringToSeconds } from "functions/stringToSeconds"
const VideoContainer = ({ data, refetch }) => {
  const {
    title,
    id,
    thumbnail: thumb,
    contents,
    later_users,
    duration,
    createdBy,
    created_at,
    views,
    created_user,
  } = data

  const navigate = useNavigate()
  const user = useRecoilValue(accountState)
  const { isAdded, addLaterVideoHandler } = useUpdateLater({
    later_users: later_users,
    refetch: refetch,
    user: user,
    id: id,
  })

  const [playedTime, setPlayedTime] = useState("0:00")
  const [hover, setHover] = useState(false)
  const [startVideo, setStartVideo] = useState(false)
  const [playTime, setPlayTime] = useState(0)
  const [leftTime, setLeftTime] = useState("0:00")

  useMemo(() => {
    const remainingTime = Math.trunc(stringToSeconds(duration) - playTime)
    setLeftTime(secondsToTime(remainingTime > 0 ? remainingTime : 0))
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
              style={{ borderRadius: "20px", overflow: "hidden" }}
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
            margin: "15px",
            borderRadius: "2px",
          }}
          variant="body2"
          gutterBottom
        >
          {hover ? `${leftTime}` : `${duration ?? "00:00"}`}
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
        <Avatar
          className="clickable"
          alt="Remy Sharp"
          src={created_user?.profileImage}
          onClick={() => {
            navigate(`/@${createdBy}`)
          }}
        />

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
                {
                  icon: <PlaylistPlayIcon />,
                  text: "현재 재생목록에 추가",
                  onClick: () => {},
                  disabled: true,
                },
                {
                  icon: isAdded ? <DoDisturbIcon /> : <AccessTimeIcon />,
                  text: isAdded ? "나중에 볼 동영상에서 해제" : "나중에 볼 동영상에 저장",
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
            조회수 {views}회 ⦁ {timeForBetween(created_at)}
          </Typography>
        </Container>
      </Container>
    </Container>
  )
}

export default VideoContainer
