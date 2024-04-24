import React, { useState } from "react"
import ReactPlayer from "react-player/lazy"
import { Container, Typography, Avatar, Button, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { timeForBetween } from "functions/timeForBetween"
import { MenuSelector } from "components/common/MenuSelector"

export const NextVideoContainer = ({ data }) => {
  const { id, thumbnail, views, title, createdBy, contents, duration, created_at } = data
  const [hover, setHover] = React.useState(false)
  const [playTime, setPlayTime] = useState(0)
  const navigate = useNavigate()
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        margin: "10px 0px",
        overflow: "hidden",
      }}
      href={`/watch/${id}`}
      className="video-container"
      onClick={() => {
        navigate(`/watch/${id}`)
        window.location.reload()
      }}
    >
      {/* 비디오 파트*/}
      <div
        style={{
          borderRadius: "15px",

          height: "100px",
          width: "30%",
          maxWidth: "170px",
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
              // maxHeight: "80px",
              // minWidth: "120px",
            }}
          />
        )}
      </div>

      {/* 비디오 정보 파트 */}
      <div
        style={{
          width: "70%",
          //   border: "1px solid black",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginLeft: "10px" }}>
          <Typography marginBottom={"4px"} variant="body1" gutterBottom>
            {title}
          </Typography>

          <div>{createdBy}</div>
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
        </div>
      </div>
    </div>
  )
}
