import * as React from "react"

import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
// Icons
import VideoCallIcon from "@mui/icons-material/VideoCall"
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined"
import SlideshowIcon from "@mui/icons-material/Slideshow"
import SensorsIcon from "@mui/icons-material/Sensors"
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline"

export default function AddVideoMenu() {
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
      <Tooltip title="만들기">
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {open ? (
            <VideoCallIcon style={{ color: "black" }} fontSize="large" />
          ) : (
            <VideoCallOutlinedIcon style={{ color: "black" }} fontSize="large" />
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
        <MenuItem style={{ margin: "3px", gap: "8px" }} onClick={handleClose}>
          <SlideshowIcon />
          동영상 업로드
        </MenuItem>
        <MenuItem style={{ margin: "3px", gap: "8px" }} onClick={handleClose}>
          <SensorsIcon />
          라이브 스트리밍 시작
        </MenuItem>
        <MenuItem style={{ margin: "3px", gap: "8px" }} onClick={handleClose}>
          <DriveFileRenameOutlineIcon />
          게시물 작성
        </MenuItem>
      </Menu>
    </div>
  )
}
