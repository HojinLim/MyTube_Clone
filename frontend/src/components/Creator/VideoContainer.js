import { MenuSelector } from "components/common/MenuSelector"

import React, { useState } from "react"
import logo from "assets/images/logos/logo.png"
import person from "assets/images/person.png"
import Typography from "@mui/material/Typography"

import { useNavigate, useParams } from "react-router-dom"
import { Container, Avatar, Button, Box, IconButton, Divider } from "@mui/material"

import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { VideoContainer as Video } from "components/common/VideoContainer"
import { dummyData } from "dummy"

import { styled } from "@mui/material/styles"
import { StyledGrid } from "styles/globalStyle"

export const VideoContainer = () => {
  return (
    <div>
      <MenuSelector categories={["최신순", "인기순", "날짜순"]} />
      <StyledGrid>
        <Video data={dummyData[0]} hasCreator={false} />
        <Video data={dummyData[0]} hasCreator={false} />
        <Video data={dummyData[0]} hasCreator={false} />
        <Video data={dummyData[0]} hasCreator={false} />
        <Video data={dummyData[0]} hasCreator={false} />
        <Video data={dummyData[0]} hasCreator={false} />
      </StyledGrid>
    </div>
  )
}
