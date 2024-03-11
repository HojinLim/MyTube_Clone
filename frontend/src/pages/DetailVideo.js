import React, { useEffect, useMemo, useRef, useState } from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import ReactPlayer from "react-player/lazy"
import Typography from "@mui/material/Typography"
import { useNavigate, useParams } from "react-router-dom"
import Avatar from "@mui/material/Avatar"

import { dummyData } from "dummy"
import { UserFeedBackContainer } from "components/UserFeedBackContainer"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import SkipNextIcon from "@mui/icons-material/SkipNext"
import PauseIcon from "@mui/icons-material/Pause"
import Button from "@mui/material/Button"
import { stringToSeconds } from "functions/stringToSeconds"
export const DetailVideo = () => {
  const params = useParams()
  const [startVid, setStartVid] = useState("true")
  const [playTime, setPlayTime] = useState(0)
  const [percent, setPercent] = useState(0)
  const videoId = params.id
  const video = dummyData.find((video) => video.id + "" === videoId)
  const { thumb, title, subtitle, sources, duration } = video

  useMemo(() => {
    setPercent((playTime / stringToSeconds(duration)) * 100)
  }, [playTime])

  return (
    <div className="detail_container" style={{ paddingTop: "100px" }}>
      <div className="left_container">
        {/* 영상 컨테이너 */}
        <div className="left_item_1">
          <div
            style={{
              flexGrow: 1,
              flexDirection: "column",
              display: "flex",
              gap: "10px",
              justifyContent: "end",
              position: "relative",
              alignContent: "end",
            }}
          >
            <ReactPlayer
              onProgress={(progress) => {
                setPlayTime(progress.playedSeconds)
              }}
              url={sources[0]}
              width="100%"
              height="100%"
              playing={startVid}
              autoPlay={true}
            />
            {/* 영상 상태바 */}
            <div
              style={{
                position: "absolute",
                bottom: "5px",
                color: "white",
                width: "100%",
                marginBottom: "5px",
              }}
            >
              <div className="progressbar">
                <div className="progressbarfill" style={{ width: `${percent}%` }}></div>
              </div>
              <Button
                onClick={() => {
                  setStartVid((prev) => !prev)
                }}
              >
                {!startVid ? <PlayArrowIcon /> : <PauseIcon />}
              </Button>
              <Button>
                <SkipNextIcon />
              </Button>
            </div>
          </div>
        </div>
        {/* 영상 정보 컨테이너 */}
        <div className="left_item_2">
          <Container
            sx={{
              flexGrow: 1,
              flexDirection: "row",
              display: "flex",
              padding: "15px",
            }}
          >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
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
              <Typography variant="body2" gutterBottom color={"gray"}>
                {subtitle}
              </Typography>
              <Typography variant="body2" gutterBottom color={"gray"}>
                구독자 100만명
              </Typography>
            </Container>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "black",
                color: "white",
                alignSelf: "center",
                borderRadius: "20px",
              }}
            >
              구독
            </Button>
          </Container>
        </div>
        {/* 댓글 컨테이너 */}
        <div className="left_item_3">
          <UserFeedBackContainer contents={"nice video!"} date={"2024-03-10"} />
          <UserFeedBackContainer contents={"nice video!"} date={"2024-03-10"} />
          <UserFeedBackContainer contents={"nice video!"} date={"2024-03-10"} />
          <UserFeedBackContainer contents={"nice video!"} date={"2024-03-10"} />
          <UserFeedBackContainer contents={"nice video!"} date={"2024-03-10"} />
        </div>
      </div>
      {/* 다른 영상들 컨테이너 */}
      <div className="right_container"></div>
    </div>
  )
}
