import React from "react"
import Typography from "@mui/material/Typography"
import BoltIcon from "@mui/icons-material/Bolt"
import { ShortsContainer } from "components/history.js/ShortsContainer"
import Divider from "@mui/material/Divider"
import { VideoItem } from "components/later/VideoItem"
export const HistoryPage = () => {
  return (
    <div
      style={{
        marginTop: "150px",
        border: "1px solid black",
        width: "100vw",
        height: "100vh",
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
        <ShortsContainer />
      </div>
    </div>
  )
}