import React, { useEffect, useState } from "react"
import Avatar from "@mui/material/Avatar"
import { Typography } from "@mui/material"

import MenuList from "@mui/material/MenuList"
import MenuItem from "@mui/material/MenuItem"
import ListItemText from "@mui/material/ListItemText"

import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"

// Icons
import ListItemIcon from "@mui/material/ListItemIcon"
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined"
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined"
import DashboardIcon from "@mui/icons-material/Dashboard"
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary"
import SettingsIcon from "@mui/icons-material/Settings"
import LiveHelpIcon from "@mui/icons-material/LiveHelp"

import { useSetRecoilState } from "recoil"
import { studioMenuState } from "atom/studioMenuState"
import { USER_INFO } from "Constants/value"

export const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState("dashboard")
  const setMenu = useSetRecoilState(studioMenuState)

  const handleItemClick = (item) => {
    setSelectedItem(item)
    setMenu(item)
  }
  const user = JSON.parse(localStorage.getItem(USER_INFO))

  return (
    <nav className="menu">
      <div className="avatar_container">
        <IconButton>
          <Avatar src={user.picture} sx={{ width: 130, height: 130 }} />
        </IconButton>
        <Typography variant="body1" fontFamily={"bold"} fontWeight={700}>
          내 채널
        </Typography>
        <Typography variant="body2">주인장</Typography>
      </div>
      <div className="menu_middle_container">
        <MenuList sx={{ width: "200px", maxWidth: "100%" }}>
          <Tooltip title="대시보드">
            <MenuItem
              selected={selectedItem === "dashboard"}
              onClick={() => handleItemClick("dashboard")}
              sx={{
                color: selectedItem === "dashboard" ? "red" : "inherit",
                fontWeight: selectedItem === "dashboard" ? 700 : "inherit",
                backgroundColor: selectedItem === "dashboard" ? "lightgray" : "inherit",
              }}
            >
              <ListItemIcon>
                {selectedItem === "dashboard" ? (
                  <DashboardIcon
                    fontSize="medium"
                    color={selectedItem === "dashboard" ? "error" : "inherit"}
                  />
                ) : (
                  <DashboardOutlinedIcon
                    fontSize="medium"
                    color={selectedItem === "dashboard" ? "error" : "inherit"}
                  />
                )}
              </ListItemIcon>
              <ListItemText> 대시보드</ListItemText>
            </MenuItem>
          </Tooltip>
          <Tooltip title="콘텐츠">
            <MenuItem
              selected={selectedItem === "content"}
              onClick={() => handleItemClick("content")}
              sx={{
                color: selectedItem === "content" ? "#eb4034" : "inherit",
                fontWeight: selectedItem === "content" ? 700 : "inherit",
                backgroundColor: selectedItem === "content" ? "lightgray" : "inherit",
              }}
            >
              <ListItemIcon>
                {selectedItem === "content" ? (
                  <VideoLibraryIcon
                    fontSize="medium"
                    color={selectedItem === "content" ? "error" : "inherit"}
                  />
                ) : (
                  <VideoLibraryOutlinedIcon
                    fontSize="medium"
                    color={selectedItem === "content" ? "error" : "inherit"}
                  />
                )}
              </ListItemIcon>
              <ListItemText>콘텐츠</ListItemText>
            </MenuItem>
          </Tooltip>
        </MenuList>
      </div>
      <div className="menu_bottom_container">
        <MenuList sx={{ width: "200px", maxWidth: "100%" }}>
          <Tooltip title="설정">
            <MenuItem
              selected={selectedItem === "settings"}
              onClick={() => handleItemClick("settings")}
              sx={{
                color: selectedItem === "settings" ? "red" : "inherit",
                fontWeight: selectedItem === "settings" ? 700 : "inherit",
                backgroundColor: selectedItem === "settings" ? "lightgray" : "inherit",
              }}
            >
              <ListItemIcon>
                <SettingsIcon
                  fontSize="medium"
                  color={selectedItem === "settings" ? "error" : "inherit"}
                />
              </ListItemIcon>
              <ListItemText>설정</ListItemText>
            </MenuItem>
          </Tooltip>
          <Tooltip title="의견보내기" placement="top">
            <MenuItem
              selected={selectedItem === "feedback"}
              onClick={() => handleItemClick("feedback")}
              sx={{
                color: selectedItem === "feedback" ? "red" : "inherit",
                fontWeight: selectedItem === "feedback" ? 700 : "inherit",
                backgroundColor: selectedItem === "feedback" ? "lightgray" : "inherit",
              }}
            >
              <ListItemIcon>
                <LiveHelpIcon
                  fontSize="medium"
                  color={selectedItem === "feedback" ? "error" : "inherit"}
                />
              </ListItemIcon>
              <ListItemText>의견보내기</ListItemText>
            </MenuItem>
          </Tooltip>
        </MenuList>
      </div>
      <div className="menu-divider"></div>
    </nav>
  )
}
export default Sidebar
