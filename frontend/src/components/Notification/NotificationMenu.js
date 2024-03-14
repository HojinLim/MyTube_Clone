import * as React from "react"

import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import { Typography } from "@mui/material"
import Divider from "@mui/material/Divider"

// Icons
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import NotificationsIcon from "@mui/icons-material/Notifications"
import SettingIcon from "@mui/icons-material/Settings"

export default function NotificationMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Tooltip title="알림">
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {open ? (
            <NotificationsIcon style={{ color: "black" }} fontSize="large" />
          ) : (
            <NotificationsNoneIcon style={{ color: "black" }} fontSize="large" />
          )}
        </IconButton>
      </Tooltip>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div
          style={{
            width: "400px",
            height: "600px",
            // justifyContent: "center",

            display: "flex",
            flexDirection: "column",
            padding: "10px",
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography display="block" gutterBottom>
              알림
            </Typography>

            <IconButton aria-label="logo">
              <SettingIcon />
            </IconButton>
          </div>
          <Divider />
          <div style={{ margin: "auto" }}>
            <div>
              <NotificationsNoneIcon
                style={{ fontSize: "150px", color: "gray", margin: "10px 0px" }}
                fontSize="large"
              />
            </div>
            <Typography variant="h6" display="block" gutterBottom>
              여기에 알림이 표시됩니다.
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              즐겨찾는 채널을 구독하여 최신 동영상의 알림을 받아 보세요.
            </Typography>
          </div>
        </div>
      </Menu>
    </div>
  )
}
