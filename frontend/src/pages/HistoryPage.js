import React from "react"
import Typography from "@mui/material/Typography"
import BoltIcon from "@mui/icons-material/Bolt"

import Divider from "@mui/material/Divider"
import { VideoItem } from "components/later/VideoItem"
import { dummyData } from "dummy"
import { ShortsContainerr } from "components/shorts/ShortsContainerr"
export const HistoryPage = () => {
  return (
    <div
      style={{
        border: "1px solid black",
        width: "100vw",
        height: "100%",
        padding: "10px",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" fontWeight={"600"}>
        시청 기록
      </Typography>
      <Typography variant="h5" style={{ margin: "15px 0px" }}>
        오늘
      </Typography>
      <div style={{ display: "flex" }}>
        <BoltIcon />
        <Typography variant="h5" fontWeight={"400"}>
          Shorts
        </Typography>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <ShortsContainerr />
      </div>
      <div style={{ marginTop: "200px" }}>
        <Divider style={{ marginBottom: "50px" }} />
        <div className="history-videos-container">
          <div className="history-video-container">
            <VideoItem datas={dummyData[0]} />
            <VideoItem datas={dummyData[1]} />
            <VideoItem datas={dummyData[2]} />
          </div>
        </div>
      </div>
    </div>
  )
}
