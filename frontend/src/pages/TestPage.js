import { dummyData } from "dummy"
import { getAverageRGBFromJpgUrl } from "functions/getAverageRGBFromJpgUrl"
import person from "assets/images/person.png"
import logo from "assets/images/logos/logo.png"
import React, { useEffect, useRef, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import DashboardIcon from "@mui/icons-material/Dashboard"
import emailjs from "@emailjs/browser"
import MenuIcon from "@mui/icons-material/Menu"
import YoutubeLogo from "assets/images/logos/youtube-studio-logo.jpg"
import Avatar from "@mui/material/Avatar"
import { IconButton, Button, InputBase } from "@mui/material"
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined"
import Tooltip from "@mui/material/Tooltip"
import SearchIcon from "@mui/icons-material/Search"
import { StudioHeader } from "components/Studio/StudioHeader"
export const TestPage = () => {
  return (
    <div>
      <StudioHeader />
    </div>
  )
}
