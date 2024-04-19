import React, { useEffect, useState } from "react"
import { IconButton, Button, Typography, Container, Avatar, Box } from "@mui/material"
import Slider, { SliderThumb } from "@mui/material/Slider"

import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import PauseCircleIcon from "@mui/icons-material/PauseCircle"

export const CenterPlayEffect = (props) => {
  const { onPlaying } = props
  return (
    <div
      style={{
        pointerEvents: "none",
        position: "absolute",
        width: "72px",
        height: "72px",
        top: "50%",
        left: "50%",
      }}
    >
      {onPlaying ? (
        <PlayCircleIcon
          //   color="black"
          style={{
            fontSize: "90px",
            color: "black",
            animation: "growAndFade 2s forwards",
            animationPlayState: "initial",
            transform: "translate(-50%, -50%)", // 요소를 수평 및 수직으로 50%씩 이동하여 정중앙에 배치
          }}
        />
      ) : (
        <PauseCircleIcon
          style={{
            fontSize: "90px",
            color: "black",
            animation: "growAndFade 2s forwards",
            animationPlayState: "initial",
            transform: "translate(-50%, -50%)", // 요소를 수평 및 수직으로 50%씩 이동하여 정중앙에 배치
          }}
        />
      )}
    </div>
  )
}
