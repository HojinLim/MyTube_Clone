import React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

// Icons
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import ShuffleIcon from "@mui/icons-material/Shuffle"
import { VideoItem } from "components/later/VideoItem"
export const LaterPage = () => {
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="later_outer">
        <div className="later_inner_outer">
          <Box
            component="section"
            sx={{
              p: 2,
              border: "1px dashed grey",
              width: "100vw",
              height: "100vh",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src="https://source.unsplash.com/random"
              style={{
                backgroundColor: "wheat",
                width: "60vw",
                maxWidth: "400px",
                minHeight: "150px",
                height: "20vh",
                borderRadius: "20px",
              }}
            />
          </Box>
          <Box
            component="section"
            sx={{
              p: 2,
              border: "1px dashed grey",
              width: "100%",
              height: "100%",
              borderRadius: "20px",
            }}
          >
            <Typography color={"white"} variant="h6" fontWeight={"600"}>
              좋아요 표시한 동영상
            </Typography>
            <Typography color={"white"}>주인장</Typography>
            <Box display={"flex"} flexDirection={"column"}>
              <div style={{ display: "flex" }}>
                <Typography color={"gray"} marginRight={"5px"} variant="caption">
                  동영상 83개
                </Typography>
                <Typography color={"gray"} variant="caption">
                  조회수 없음
                </Typography>
                <Typography color={"gray"} variant="caption">
                  2일 전에 업데이트됨
                </Typography>
              </div>
            </Box>
          </Box>
        </div>

        {/* 모두재생, 셔플 */}
        <Box
          component="section"
          sx={{
            p: 2,
            border: "1px dashed grey",
            width: "100%",
            height: "100%",
            borderRadius: "20px",
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          <Button
            style={{
              height: "80%",
              width: "80%",
              borderRadius: "30px",
              margin: "auto 15px",
              backgroundColor: "white",
            }}
            variant="contained"
            color="primary"
          >
            <PlayArrowIcon />
            모두 재생
          </Button>
          <Button
            style={{
              height: "80%",
              width: "80%",
              borderRadius: "30px",
              margin: "auto 15px",
              color: "white",
            }}
            variant="contained"
            color="primary"
          >
            <ShuffleIcon />
            셔플
          </Button>
        </Box>
      </div>
      <div className="video_container">
        <VideoItem />
        <VideoItem />
        <VideoItem />
      </div>
    </div>
  )
}
