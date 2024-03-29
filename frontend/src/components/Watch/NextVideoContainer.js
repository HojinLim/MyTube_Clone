import React, { useState } from "react"
import ReactPlayer from "react-player/lazy"
import Typography from "@mui/material/Typography"
import { useNavigate } from "react-router-dom"

export const NextVideoContainer = ({ data }) => {
  const { id, thumbnail, title, createdBy, contents, duration } = data
  const [hover, setHover] = React.useState(false)
  const [playTime, setPlayTime] = useState(0)
  const navigate = useNavigate()
  return (
    <div
      className="next_video_container"
      onClick={() => {
        navigate(`/watch/${id}`)
        window.scrollTo({ top: 0, behavior: "smooth" })
      }}
    >
      {/* 비디오 파트*/}
      <div
        style={{
          width: "45%",
          overflow: "hidden",
          borderRadius: "15px",
          maxWidth: "168px",
        }}
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
            autoPlay={true}
            onProgress={(progress) => {
              setPlayTime(progress.playedSeconds)
            }}
          />
        ) : (
          <img
            src={process.env.REACT_APP_BACKEND_URL_UPLOAD + thumbnail.url}
            alt="thumbnail"
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>

      {/* 비디오 정보 파트 */}
      <div
        style={{
          width: "55%",
          //   border: "1px solid black",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography marginBottom={"4px"} variant="body1" gutterBottom>
          {title}
        </Typography>

        <div>{createdBy}</div>
        <div style={{ display: "flex" }}>
          <Typography variant="body2" gutterBottom color={"gray"}>
            조회수 10회
          </Typography>
          <Typography variant="body2" gutterBottom color={"gray"}>
            ⦁
          </Typography>
          <Typography variant="body2" gutterBottom color={"gray"}>
            1시간 전
          </Typography>
        </div>
      </div>
    </div>
  )
}
