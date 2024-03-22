import React from "react"
import person from "assets/images/person.png"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"

import MoreVertIcon from "@mui/icons-material/MoreVert"
export const VideoItem = () => {
  return (
    <div className="later_video_container">
      <Typography variant="body1" style={{ margin: "15px" }}>
        1
      </Typography>
      <div
        style={{
          maxWidth: "160px",
          maxHeight: "90px",
          display: "flex",
          position: "relative",
          borderRadius: "10px",
          overflow: "hidden",
          justifyContent: "center",
        }}
      >
        <img
          src={person}
          style={{
            backgroundColor: "wheat",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: "black",
            color: "white",
            fontSize: "12px",
            margin: "5px",
          }}
        >
          00:00
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          marginLeft: "10px",
          alignSelf: "flex-start",
          marginTop: "10px",
          flex: 1,
        }}
      >
        <Typography variant="body1">제목제목제목제목제목제목제목제목제목제목제목제목</Typography>
        <div style={{ display: "flex", flexDirection: "row", marginTop: "15px" }}>
          <Typography variant="caption">주인장 </Typography>
          <Typography variant="caption"> • </Typography>
          <Typography variant="caption">조회수 10회</Typography>
          <Typography variant="caption"> • </Typography>
          <Typography variant="caption">1개월 전</Typography>
        </div>
      </div>
      <div className="dot-menu-button">
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </div>
    </div>
  )
}
