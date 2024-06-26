import React, { useEffect, useState } from "react"
import person from "assets/images/person.png"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"

import Divider from "@mui/material/Divider"
import { timeForBetween } from "functions/timeForBetween"
import { useLocation, useNavigate } from "react-router-dom"
import { CustomIconMenu } from "components/common/CustomIconMenu"
import useUpdateLater from "hooks/useUpdateLater"
import { useRecoilValue } from "recoil"
import { accountState } from "atom/accountState"
export const VideoItem = (props) => {
  console.log(props)
  const { setClickedId, refetch } = props
  const { id, thumbnail, title, createdBy, created_at, views, duration, later_users } = props.datas
  console.log(props.datas)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const navigate = useNavigate()
  const loation = useLocation()
  const [isLike, setIsLike] = useState(false)
  const open = Boolean(anchorEl)
  const user = useRecoilValue(accountState)
  const handleClick = (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (e) => {
    e.stopPropagation()
    setAnchorEl(null)
  }

  console.log(Number(props.indentifier) + 1)

  const { isAdded, addLaterVideoHandler } = useUpdateLater({
    later_users: later_users,
    refetch: refetch,
    user: user,
    id: id,
  })
  useEffect(() => {
    if (location.pathname.includes("like")) {
      setIsLike(true)
    } else if (location.pathname.includes("like")) {
      setIsLike(false)
    }
  }, [])
  // console.log()
  return (
    <div
      className="later_video_container"
      onClick={(e) => {
        e.stopPropagation()
        navigate(`/watch/${id}`)

        // window.location.reload()
      }}
    >
      {/* index 변수 대신에 title을 사용하여 키를 지정합니다. */}
      <Typography variant="body1" style={{ margin: "15px" }}>
        {Number(props.indentifier) + 1}
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
          src={process.env.REACT_APP_BACKEND_URL_UPLOAD + thumbnail.url}
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
          <Typography variant="caption">{createdBy}</Typography>
          <Typography variant="caption"> • </Typography>
          <Typography variant="caption">조회수 {views}회</Typography>
          <Typography variant="caption"> • </Typography>
          <Typography variant="caption">{timeForBetween(created_at)}</Typography>
        </div>
      </div>
      <div className="dot-menu-button">
        <IconButton onClick={(e) => handleClick(e)}>
          <MoreVertIcon />
        </IconButton>

        {/* <CustomIconMenu
          style={{ backgroundColor: "#eee", borderRadius: "20px" }}
          iconButton={<MoreVertIcon />}
          menuItems={[
            {
              // icon: isAdded ? <RemoveCircleOutlineIcon /> : <PlaylistAddIcon />,
              icon: <PlaylistAddIcon />,
              text: "나중에 보기 삭제",
              // text: isAdded ? "나중에 보기 삭제" : "나중에 보기 추가",
              onClick: () => handleClick(e),
            },
          ]}
        /> */}

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
          <MenuItem
            onClick={(e) => {
              handleClose(e)
              if (!isLike) addLaterVideoHandler()
              // setClickedId(id)
            }}
          >
            {isLike ? "좋아요" : "나중에"} 볼 동영상에서 삭제
          </MenuItem>
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
