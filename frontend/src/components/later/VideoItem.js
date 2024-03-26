import React from "react"
import person from "assets/images/person.png"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import Divider from "@mui/material/Divider"
export const VideoItem = ({ datas }) => {
  const { id, thumb, title, subtitle, sources, duration } = datas
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className="later_video_container">
      <Typography variant="body1" style={{ margin: "15px" }}>
        {id}
      </Typography>
      <div
        style={{
          maxWidth: "160px",
          maxHeight: "90px",
          display: "flex",
          position: "relative",
          borderRadius: "10px",
          overflow: "hidden",
          justifyContent: "center",
        }}
      >
        <img
          src={thumb}
          style={{
            backgroundColor: "wheat",
            margin: "auto",
            display: "block",
            width: "100%",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: "black",
            color: "white",
            fontSize: "12px",
            margin: "5px",
          }}
        >
          {duration}
        </div>
      </div>

      <div className="video-item-inform-container">
        <Typography
          variant="body1"
          style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}
        >
          {title}
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "15px",
            height: "18px",
            overflow: "hidden",
          }}
        >
          <Typography variant="caption">{subtitle}</Typography>
          <Typography variant="caption"> • </Typography>
          <Typography variant="caption">조회수 10회</Typography>
          <Typography variant="caption"> • </Typography>
          <Typography variant="caption">1개월 전</Typography>
        </div>
      </div>
      <div className="dot-menu-button">
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>

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
          <MenuItem onClick={handleClose}>현재 재생목록에 추가</MenuItem>
          <MenuItem onClick={handleClose}>재생목록에 저장</MenuItem>
          <MenuItem onClick={handleClose}>나중에 볼 동영상에서 삭제</MenuItem>
          <MenuItem onClick={handleClose}>오프라인 저장</MenuItem>
          <MenuItem onClick={handleClose}>공유</MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>맨 위로 이동</MenuItem>
          <MenuItem onClick={handleClose}>맨 아래로 이동</MenuItem>
        </Menu>
      </div>
    </div>
  )
}
