import React, { useState } from "react"
import logo from "assets/images/logos/logo.png"
import person from "assets/images/person.png"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { useNavigate, useParams } from "react-router-dom"
import { Container, Avatar, Button, Box, IconButton, Divider } from "@mui/material"
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined"
import Tooltip from "@mui/material/Tooltip"
import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"

import { HomeContainer } from "components/Creator/HomeContainer"
import { VideoContainer } from "components/Creator/VideoContainer"
import { PlayListContainer } from "components/Creator/PlayListContainer"
import { CommunityContainer } from "components/Creator/CommunityContainer"
export const CreatorPage = () => {
  const params = useParams()
  const [value, setValue] = React.useState(0)
  const [subscript, setSubscript] = useState(false)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const nickname = params.nickname

  return (
    <div style={{ padding: "50px" }}>
      {/* 앱 헤더 컨테이너 */}
      <div className="creator-app-header-container">
        <div className="creator-app-header">
          <img className="creator-app-header" src={logo} style={{ position: "relative" }} />
        </div>
        <div className="creator-inform-container">
          <img src={person} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Tooltip title={nickname} placement="top">
              <Typography variant="h3" fontWeight={"800"}>
                {nickname}
              </Typography>
            </Tooltip>
            <Typography variant="caption" style={{ margin: "10px 0px" }}>
              주인장 - 구독자 00명 - 동영상 00개
            </Typography>
            <Typography className="creator-inform-click" variant="body2">
              정보
            </Typography>
            <Link href="#">example.com</Link>
            <Button
              onClick={() => setSubscript((prev) => !prev)}
              variant="contained"
              sx={{
                backgroundColor: "lightgray",
                borderRadius: "20px",
                maxHeight: "40px",
                margin: "10px 0px",
              }}
            >
              {subscript && <NotificationsNoneOutlinedIcon />}
              {subscript ? "구독중" : "구독"}
            </Button>
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          indicatorColor="secondary"
        >
          <Tab label="홈" />
          <Tab label="동영상" />
          <Tab label="재생목록" />
          <Tab label="커뮤니티" />
        </Tabs>
        <IconButton>
          <SearchIcon style={{ alignSelf: "center" }} />
        </IconButton>
        <TextField id="standard-basic" label="검색" variant="standard" />
      </div>
      <Divider />

      {/* 홈 컨테이너 */}
      {value === 0 && <HomeContainer />}
      {value === 1 && <VideoContainer />}
      {value === 2 && <PlayListContainer />}
      {value === 3 && <CommunityContainer />}
    </div>
  )
}
