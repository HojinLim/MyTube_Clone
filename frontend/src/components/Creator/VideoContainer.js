import { MenuSelector } from "components/common/MenuSelector"

import React, { useState } from "react"
import logo from "assets/images/logos/logo.png"
import person from "assets/images/person.png"
import Typography from "@mui/material/Typography"

import { useNavigate, useParams } from "react-router-dom"
import { Container, Avatar, Button, Box, IconButton, Divider } from "@mui/material"

// import { VideoContainer as Video } from "components/common/VideoContainer"
import { dummyData } from "dummy"

import { StyledGrid } from "styles/globalStyle"
import VideosContainer from "components/Video/VideosContainer"

export const VideoContainer = ({ datas }) => {
  return (
    <div>
      <MenuSelector categories={["최신순", "인기순", "날짜순"]} />
      {datas?.map((value, key) => (
        <VideosContainer data={value} key={key} />
      ))}
    </div>
  )
}
