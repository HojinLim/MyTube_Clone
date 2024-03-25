import React, { useState } from "react"
import ReactPlayer from "react-player/lazy"
import Typography from "@mui/material/Typography"
import { useNavigate } from "react-router-dom"

export const VideoContainer = ({ data, hasCreator }) => {
  const { id, thumb, title, subtitle, sources, duration } = data
  const [hover, setHover] = React.useState(false)
  const [isCreator, setCreator] = React.useState(hasCreator)
  const [playTime, setPlayTime] = useState(0)
  const navigate = useNavigate()
  return (
    <div>
      <div>
        {/* 비디오 파트*/}
        <div
          style={{
            width: "100%",
            overflow: "hidden",
            borderRadius: "15px",
            maxWidth: "320px",
            maxHeight: "200px",
          }}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => {
            setPlayTime(0)
            setHover(false)
          }}
        >
          {hover ? (
            <ReactPlayer
              url={sources[0]}
              playing={hover}
              width="100%"
              height="100%"
              autoPlay={true}
              onProgress={(progress) => {
                setPlayTime(progress.playedSeconds)
              }}
            />
          ) : (
            <div
              style={{
                display: "flex",
                position: "relative",
              }}
            >
              <img src={thumb} alt="thumbnail" style={{ width: "100%", height: "100%" }} />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "12px",
                  margin: "5px",
                  width: "50px",
                }}
              >
                {/* {duration} */}
              </div>
            </div>
          )}
        </div>

        {/* 비디오 정보 파트 */}
        <div
          style={{
            width: "100%",
            //   border: "1px solid black",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography marginBottom={"4px"} variant="body1" gutterBottom>
            {title}
          </Typography>

          {isCreator && <div>{subtitle}</div>}
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
    </div>
  )
}
