import React, { useState } from "react"
import ReactPlayer from "react-player/lazy"
import { Container, Typography, Avatar, Button, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { timeForBetween } from "functions/timeForBetween"
import { MenuSelector } from "components/common/MenuSelector"

export const SearchItem = ({ data }) => {
  const { id, thumbnail, views, title, createdBy, contents, duration, created_at } = data
  const [hover, setHover] = React.useState(false)
  const [playTime, setPlayTime] = useState(0)
  const navigate = useNavigate()
  console.log(data)
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        margin: "10px 0px",
        overflow: "hidden",
        // padding: "20px 50px",
      }}
      href={`/watch/${id}`}
      className="video-container"
      onClick={() => {
        navigate(`/watch/${id}`)
        window.location.reload()
      }}
    >
      {/* 비디오 파트*/}
      <Box
        sx={{
          position: "relative",
          flexGrow: 1,
          width: { xs: "50%" },
          maxWidth: "450px",
          // height: "250px",
          height: { xs: "150px", sm: "250px", md: "250px", lg: "250px", xl: "220px" },

          borderRadius: "20px",
        }}
        // style={{ width: "100%", height: "100%", borderRadius: "20px" }}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => {
          setPlayTime(0)
          setHover(false)
        }}
      >
        {hover ? (
          <ReactPlayer
            url={process.env.REACT_APP_BACKEND_URL_UPLOAD + contents.url}
            playing={hover}
            width="100%"
            height="100%"
            style={{ borderRadius: "20px", overflow: "hidden" }}
            autoPlay={true}
            onProgress={(progress) => {
              setPlayTime(progress.playedSeconds)
            }}
          />
        ) : (
          <img
            src={process.env.REACT_APP_BACKEND_URL_UPLOAD + thumbnail.url}
            alt="thumbnail"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "20px",
              objectFit: "cover",
            }}
          />
        )}
      </Box>

      {/* 비디오 정보 파트 */}
      <div
        style={{
          width: "50%",
          height: "50%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginLeft: "10px" }}>
          <Typography variant="h6">{title}</Typography>
          <div style={{ display: "flex" }}>
            <Typography variant="body2" gutterBottom color={"gray"}>
              조회수 {views}회
            </Typography>
            <Typography variant="body2" gutterBottom color={"gray"}>
              ⦁
            </Typography>
            <Typography variant="body2" gutterBottom color={"gray"}>
              {timeForBetween(created_at)}
            </Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ width: "28px", height: "28px" }} src={data?.created_user?.profileImage} />
            <div>{createdBy}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
