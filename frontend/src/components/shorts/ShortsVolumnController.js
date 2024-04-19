import React, { useEffect, useRef, useState } from "react"
import Slider from "@mui/material/Slider"

import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import VolumeDownIcon from "@mui/icons-material/VolumeDown"

import PauseIcon from "@mui/icons-material/Pause"

import { CommonIconButton } from "components/common/CommonIconButton"

export const ShortsVolumnController = (props) => {
  const {
    onPlaying,
    volumn,
    muteHandler,
    handlePause,
    handleChange,
    showVolumeControl,
    setShowVolumeControl,
  } = props

  return (
    <div style={{ display: "flex", margin: "5px" }}>
      <CommonIconButton
        onClick={handlePause}
        background={"#00ff0000"}
        color={"white"}
        icon={onPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      />

      <div
        onMouseEnter={() => setShowVolumeControl(true)}
        onMouseLeave={() => setShowVolumeControl(false)}
      >
        <CommonIconButton
          onClick={muteHandler}
          background={"#00ff0000"}
          color={"white"}
          icon={
            volumn === 0 ? (
              <VolumeOffIcon />
            ) : volumn > 0 && volumn < 60 ? (
              <VolumeDownIcon />
            ) : (
              <VolumeUpIcon />
            )
          }
        />
      </div>
      <div
        onMouseEnter={() => setShowVolumeControl(true)} // PlayIcon에 마우스가 올라갈 때 볼륨 컨트롤을 보여줌
        onMouseLeave={() => setShowVolumeControl(false)}
        style={{
          borderRadius: "20px",
          backgroundColor: showVolumeControl ? "#333333" : "transparent", // 볼륨 컨트롤이 보이는 경우에만 배경색을 #333333으로 변경
          transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out", // opacity와 transform에 대한 transition 설정
          display: "flex",
          alignItems: "center",
          opacity: showVolumeControl ? 1 : 0, // 볼륨 컨트롤이 보이는 경우에만 투명도를 1로 설정하여 표시
          transform: showVolumeControl ? "translateX(0)" : "translateX(10px)", // 조금씩 오른쪽으로 이동하여 나타나도록 설정
        }}
      >
        <Slider
          className="volunn_slider"
          aria-label="Volume"
          value={volumn}
          onChange={handleChange}
          sx={{
            margin: "0px 10px",
            color: "white",
            width: "200px",
            padding: "3px 0px",
          }}
        />
      </div>
    </div>
  )
}
