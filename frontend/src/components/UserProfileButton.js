import React, { useEffect, useState } from "react"

import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

// Icons
import Settings from "@mui/icons-material/Settings"
import Logout from "@mui/icons-material/Logout"
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined"
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline"
import YouTubeIcon from "@mui/icons-material/YouTube"

import { accountState } from "atom/accountState"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

import { Link } from "react-router-dom"
import OpinionDrawer from "./opinion/OpinionDrawer"
import { useNavigate } from "react-router-dom"
import { STRAPI_TOKEN } from "config/constants"
import toast from "react-hot-toast"
import { openOpinionState } from "atom/openOpinionState"
import { studioPageState } from "atom/studioPageState"

// onCompleted: setFollow(true)
export const UserProfileButton = () => {
  const navi = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [user, setUser] = useRecoilState(accountState)

  const setOpenOpinion = useSetRecoilState(openOpinionState)

  useEffect(() => {}, [user])
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    setAnchorEl(null)
    localStorage.removeItem("user")
    localStorage.removeItem(STRAPI_TOKEN)
    setUser(null)
    navi("/")
    window.location.reload()
    toast.success("로그아웃 되었습니다.")
  }
  const handleFeedbackClick = () => {
    setOpenOpinion(true)
  }
  const isStudio = useRecoilValue(studioPageState)

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={
                isStudio && open
                  ? { width: 32, height: 32, border: "1px solid blue" }
                  : { width: 32, height: 32 }
              }
              src={user?.picture}
            >
              {user?.picture ? "" : user?.email.slice(0, 2).toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
            width: 200,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div style={{ display: "flex", margin: "auto", flexDirection: "column", gap: "8px" }}>
          <MenuItem onClick={handleClose}>
            <Avatar src={user?.picture} /> {user?.name}
          </MenuItem>
          <MenuItem
            onClick={() => {
              navi(`/@${user.name}`)
            }}
          >
            <Link className="channel-link">내 채널보기</Link>
          </MenuItem>
        </div>
        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          로그아웃
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            isStudio ? navi("/") : navi("/studio")
          }}
        >
          <ListItemIcon>
            {!isStudio ? (
              <PlayCircleOutlineIcon fontSize="small" />
            ) : (
              <YouTubeIcon fontSize="small" />
            )}
          </ListItemIcon>
          {!isStudio ? "YouTube스튜디오" : "YouTube"}
        </MenuItem>
        <Divider />
        <MenuItem disabled onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          설정
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleFeedbackClick}>
          <ListItemIcon>
            <FeedbackOutlinedIcon />
          </ListItemIcon>
          의견 보내기
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
