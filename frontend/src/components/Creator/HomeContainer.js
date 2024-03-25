import React, { useState } from "react"
import logo from "assets/images/logos/logo.png"
import person from "assets/images/person.png"
import Typography from "@mui/material/Typography"

import { useNavigate, useParams } from "react-router-dom"
import { Container, Avatar, Button, Box, IconButton, Divider } from "@mui/material"

import PlayArrowIcon from "@mui/icons-material/PlayArrow"

import { dummyData } from "dummy"
import { VideoContainer } from "components/common/VideoContainer"
import { PlayAllButton } from "./PlayAllButton"

export const HomeContainer = () => {
  return (
    <div>
      <PlayAllButton title={"동영상"} />

      <div className="grid-container">
        <div className="grid-item">
          <VideoContainer data={dummyData[0]} hasCreator={false} />
        </div>
        <div className="grid-item">
          <VideoContainer data={dummyData[1]} hasCreator={false} />
        </div>
        <div className="grid-item">
          <VideoContainer data={dummyData[2]} hasCreator={false} />
        </div>
        <div className="grid-item">
          <VideoContainer data={dummyData[0]} hasCreator={false} />
        </div>
        <div className="grid-item">
          <VideoContainer data={dummyData[0]} hasCreator={false} />
        </div>
        <div className="grid-item">
          <VideoContainer data={dummyData[0]} hasCreator={false} />
        </div>
      </div>
      <Divider />
      <PlayAllButton title={"인기 동영상"} />
      <div className="grid-container">
        <div className="grid-item">
          <VideoContainer data={dummyData[0]} hasCreator={false} />
        </div>
        <div className="grid-item">
          <VideoContainer data={dummyData[1]} hasCreator={false} />
        </div>
        <div className="grid-item">
          <VideoContainer data={dummyData[2]} hasCreator={false} />
        </div>
        <div className="grid-item">
          <VideoContainer data={dummyData[0]} hasCreator={false} />
        </div>
        <div className="grid-item">
          <VideoContainer data={dummyData[0]} hasCreator={false} />
        </div>
        <div className="grid-item">
          <VideoContainer data={dummyData[0]} hasCreator={false} />
        </div>
      </div>
    </div>
  )
}
