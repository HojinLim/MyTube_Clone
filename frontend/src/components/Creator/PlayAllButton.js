import React, { useState } from "react"
import logo from "assets/images/logos/logo.png"
import person from "assets/images/person.png"
import Typography from "@mui/material/Typography"

import { useNavigate, useParams } from "react-router-dom"
import { Container, Avatar, Button, Box, IconButton, Divider } from "@mui/material"

import PlayArrowIcon from "@mui/icons-material/PlayArrow"

export const PlayAllButton = ({ title }) => {
  return (
    <div style={{ display: "flex" }}>
      <Typography variant="h6" fontWeight={"800"}>
        {title}
      </Typography>
      <Button>
        <PlayArrowIcon />
        모두 재생
      </Button>
    </div>
  )
}
