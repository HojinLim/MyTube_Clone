import React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import person from "assets/images/person.png"
import IconButton from "@mui/material/IconButton"

// Icons
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import ShuffleIcon from "@mui/icons-material/Shuffle"
import MoreVertIcon from "@mui/icons-material/MoreVert"

import { dummyData } from "dummy"

export const PlayListSide = ({ sideTitle, background }) => {
  return (
    <div className="later_outer">
      <div className="later_inner_outer" style={{ backgroundColor: background }}>
        <Box
          component="section"
          sx={{
            p: 2,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={dummyData[0].thumb}
            style={{
              backgroundColor: "wheat",
              width: "100%",
              maxWidth: "336px",
              maxHeight: "200px",

              borderRadius: "20px",
            }}
          />
        </Box>
        <Box
          component="section"
          sx={{
            p: 2,
            width: "100%",
            height: "100%",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            border: "1px solid black",

            overflow: "hidden",
          }}
        >
          <Typography color={"white"} variant="h6" fontWeight={"700"} marginBottom={"15px"}>
            {sideTitle}
          </Typography>
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxHeight: "40px",

                overflow: "auto",
              }}
            >
              <Typography color={"white"} variant="body2">
                주인장
              </Typography>
              <Box display={"flex"} flexDirection={"column"}>
                <div style={{ display: "flex", textOverflow: "ellipsis", overflow: "auto" }}>
                  <Typography color={"lightgray"} variant="caption">
                    동영상 83개
                  </Typography>
                  <Typography color={"lightgray"} margin={"0px 5px"} variant="caption">
                    조회수 없음
                  </Typography>
                  <Typography color={"lightgray"} variant="caption" textOverflow={"ellipsis"}>
                    2일 전에 업데이트됨
                  </Typography>
                </div>
              </Box>
            </div>
            <IconButton
              style={{
                backgroundColor: "lightgray",
                opacity: 0.75,
                maxWidth: "30px",
                maxHeight: "30px",
                marginRight: "10px",
              }}
            >
              <MoreVertIcon style={{ color: "white" }} />
            </IconButton>
          </div>
        </Box>
      </div>

      {/* 모두재생, 셔플 */}
      <Box
        className="later-button-container"
        component="section"
        sx={{
          p: 2,

          width: "95%",
          height: "100%",
          borderRadius: "20px",
          justifyContent: "space-between",
          display: "flex",
          margin: "auto",
        }}
      >
        <Button
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "30px",
            margin: "auto 15px",
            backgroundColor: "white",
            maxWidth: "450px",
            maxHeight: "40px",
          }}
          variant="contained"
          color="primary"
        >
          <PlayArrowIcon />
          모두 재생
        </Button>
        <Button
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "30px",
            margin: "auto 15px",
            color: "white",
            maxWidth: "450px",
            maxHeight: "40px",
          }}
          variant="contained"
          color="primary"
        >
          <ShuffleIcon />
          셔플
        </Button>
      </Box>
    </div>
  )
}
