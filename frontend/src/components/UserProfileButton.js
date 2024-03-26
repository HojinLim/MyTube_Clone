import React, { useEffect } from "react"

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

import { accountState } from "atom/accountState"
import { useRecoilState } from "recoil"

import { Link } from "react-router-dom"
import OpinionDrawer from "./opinion/OpinionDrawer"
import { useNavigate } from "react-router-dom"

export const UserProfileButton = () => {
  const navi = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const [user, setUser] = useRecoilState(accountState)

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
    setUser(null)
    window.location.reload()
    alert("로그아웃 되었습니다.")
  }
  const handleFeedbackClick = () => {
    setAnchorEl(null) // 메뉴를 닫습니다.
    OpinionDrawer.toggleDrawer("right", true) // OpinionDrawer를 엽니다.
  }

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
            <Avatar sx={{ width: 48, height: 48 }} src={user?.picture}>
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
            <Avatar /> 닉네임
          </MenuItem>
          <MenuItem>
            <Link className="channel-link" to="/studio">
              내 채널보기
            </Link>
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
            navi("/studio")
          }}
        >
          <ListItemIcon>
            <PlayCircleOutlineIcon fontSize="small" />
          </ListItemIcon>
          YouTube스튜디오
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          설정
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <FeedbackOutlinedIcon />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
