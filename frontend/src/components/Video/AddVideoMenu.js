import * as React from "react"
import { useNavigate } from "react-router-dom"
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
import { openUploadState } from "atom/openUploadState"
import { useRecoilState } from "recoil"

export default function AddVideoMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const navigate = useNavigate()
  const [openUpload, setOpenUpload] = useRecoilState(openUploadState)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleUpload = () => {
    handleClose()
    setOpenUpload(true)
    navigate("/studio")
  }

  const commonStyle = { margin: "3px", gap: "8px" }

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
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem style={commonStyle} onClick={handleUpload}>
          <SlideshowIcon />
          동영상 업로드
        </MenuItem>
        <MenuItem style={commonStyle} onClick={handleClose}>
          <SensorsIcon />
          라이브 스트리밍 시작
        </MenuItem>
        <MenuItem style={commonStyle} onClick={handleClose}>
          <DriveFileRenameOutlineIcon />
          게시물 작성
        </MenuItem>
      </Menu>
    </div>
  )
}
